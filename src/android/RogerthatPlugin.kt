/*
 * Copyright 2019 Green Valley Belgium NV
 * NOTICE: THIS FILE HAS BEEN MODIFIED BY GREEN VALLEY BELGIUM NV IN ACCORDANCE WITH THE APACHE LICENSE VERSION 2.0
 * Copyright 2018 GIG Technology NV
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @@license_version:1.6@@
 */
package com.mobicage.rogerthat.cordova

import android.Manifest
import android.app.Activity
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.net.Uri
import androidx.browser.customtabs.CustomTabsIntent
import androidx.lifecycle.LiveData
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.mobicage.api.news.Rpc.getNewsStreamItems
import com.mobicage.rogerth.at.R
import com.mobicage.rogerthat.App
import com.mobicage.rogerthat.BarcodeScanningActivity
import com.mobicage.rogerthat.BottomNavigationActivity
import com.mobicage.rogerthat.IdentityStore
import com.mobicage.rogerthat.analytics.logUrl
import com.mobicage.rogerthat.home.HomeFragment
import com.mobicage.rogerthat.home.HomeScreenContentResult
import com.mobicage.rogerthat.home.HomeScreenViewModel
import com.mobicage.rogerthat.home.UnsupportedHomeScreenVersion
import com.mobicage.rogerthat.plugins.friends.FriendsPlugin
import com.mobicage.rogerthat.plugins.friends.Poker
import com.mobicage.rogerthat.plugins.friends.ServiceApiCallbackResult
import com.mobicage.rogerthat.plugins.friends.ServiceMenuItemInfo
import com.mobicage.rogerthat.plugins.messaging.MessagingPlugin
import com.mobicage.rogerthat.plugins.news.NewsPlugin
import com.mobicage.rogerthat.plugins.scan.ScanCommunication
import com.mobicage.rogerthat.plugins.system.SystemPlugin
import com.mobicage.rogerthat.util.ActionScreenUtils
import com.mobicage.rogerthat.util.JsonUtils
import com.mobicage.rogerthat.util.RequestStore
import com.mobicage.rogerthat.util.logging.L
import com.mobicage.rpc.IJSONable
import com.mobicage.rpc.IntentResponseHandler
import com.mobicage.rpc.config.AppConstants
import com.mobicage.to.news.GetNewsGroupRequestTO
import com.mobicage.to.news.GetNewsStreamItemsRequestTO
import com.mobicage.to.news.GetNewsStreamItemsResponseTO
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.apache.cordova.PluginResult
import org.json.JSONArray
import org.json.JSONObject
import org.json.simple.JSONValue
import java.util.*

@Suppress("UNCHECKED_CAST")
class RogerthatPlugin : CordovaPlugin() {
    private var mQRCodeScannerOpen = false
    private var mCallbackContext: CallbackContext? = null
    private var mApiResultHandlerSet = false
    private lateinit var fragment: CordovaFragment
    private lateinit var rogerthatInterface: CordovaRogerthatInterface
    private lateinit var mActionScreenUtils: ActionScreenUtils
    private var mScanCommunication: ScanCommunication? = null
    private var mPoker: Poker? = null
    private val mBroadcastReceiver = getBroadcastReceiver()
    private val callbackMap: MutableMap<String, CallbackContext> = HashMap()
    private val mIntentCallback: ActionScreenUtils.IntentCallback =
        object : ActionScreenUtils.IntentCallback {
            override fun apiResult(result: ServiceApiCallbackResult): Boolean {
                return deliverApiResult(result)
            }

            override fun userDataUpdated(userData: String?) {
                val jsonMap =
                    if (userData == null) HashMap() else (JSONValue.parse(userData) as Map<String, Any?>)
                sendCallbackUpdate("userDataUpdated", JSONObject(jsonMap))
            }

            override fun serviceDataUpdated(serviceData: String?) {
                val jsonMap =
                    if (serviceData == null) HashMap() else (JSONValue.parse(serviceData) as Map<String, Any?>)
                sendCallbackUpdate("serviceDataUpdated", JSONObject(jsonMap))
            }

            override fun qrCodeScanned(result: Map<String, Any?>) {
                sendCallbackUpdate("qrCodeScanned", JSONObject(result))
            }
        }
    private var homeScreenKey: String? = null
    private var homeScreenLiveData: LiveData<HomeScreenContentResult>? = null
    private var homeScreenObserver: Observer<HomeScreenContentResult>? = null
    private val userProfileCallbacks = mutableListOf<CallbackContext>()

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext,
    ): Boolean {
        if ("log" != action) {
            L.i("RogerthatPlugin.execute '$action'")
        }
        cordova.activity.runOnUiThread {
            try {
                processAction(action, callbackContext, args.optJSONObject(0))
            } catch (e: Exception) {
                L.bug(e)
                callbackContext.error(e.message)
            }
        }
        return true
    }

    private fun processAction(
        action: String,
        callbackContext: CallbackContext,
        arguments: JSONObject?,
    ) {
        val args = arguments ?: JSONObject()
        when (action) {
            "start" -> {
                if (mCallbackContext != null) {
                    callbackContext.error("RogerthatPlugin already running.")
                    return
                }
                mCallbackContext = callbackContext
                mActionScreenUtils.start(mIntentCallback)
                val pluginResult = PluginResult(PluginResult.Status.NO_RESULT)
                pluginResult.keepCallback = true
                callbackContext.sendPluginResult(pluginResult)
                setInfo()
            }
            "log" -> {
                log(args)
                callbackContext.success(JSONObject())
            }
            "api_call" -> sendApiCall(callbackContext, args)
            "api_resultHandlerConfigured" -> {
                mApiResultHandlerSet = true
                mActionScreenUtils.deliverAllApiResults()
                callbackContext.success(JSONObject())
            }
            "app_exit" -> exitApp(callbackContext)
            "camera_startScanningQrCode" -> startScanningQrCode(callbackContext)
            "camera_stopScanningQrCode" -> stopScanningQrCode(callbackContext)
            "context" -> getContext(callbackContext)
            "badges_list" -> getBadges(callbackContext)
            "message_open" -> openMessage(callbackContext, args)
            "news_getNewsGroup" -> getNewsGroup(
                callbackContext, GetNewsGroupRequestTO.fromJSONMap(
                    JsonUtils.toMap(args)
                )
            )
            "news_getNewsGroups" -> getNewsGroups(callbackContext)
            "news_getNewsStreamItems" -> getNewsStreamItems(
                callbackContext, GetNewsStreamItemsRequestTO.fromJSONMap(
                    JsonUtils.toMap(args)
                )
            )
            "ui_hideKeyboard" -> hideKeyboard(callbackContext)
            "user_put" -> putUserData(callbackContext, args)
            "user_getProfile" -> getUserProfile(callbackContext)
            "user_getUserInformation" -> getUserInformation(callbackContext)
            "user_isLoggedIn" -> isLoggedIn(callbackContext)
            "util_isConnectedToInternet" -> isConnectedToInternet(callbackContext)
            "util_open" -> openActivity(callbackContext, args)
            "util_playAudio" -> playAudio(callbackContext, args)
            "homescreen_getHomeScreenContent" -> getHomeScreen(callbackContext)
            else -> {
                L.e("RogerthatPlugin.execute did not match '$action'")
                callbackContext.error("RogerthatPlugin doesn't know how to execute this action.")
            }
        }
    }

    private fun getNewsGroup(callbackContext: CallbackContext, request: GetNewsGroupRequestTO) {
        callbackMap[getNewsPlugin().getNewsGroup(request)] = callbackContext
    }

    private fun getNewsGroups(callbackContext: CallbackContext) {
        callbackMap[getNewsPlugin().getNewsGroups()] = callbackContext
    }

    private fun getNewsStreamItems(
        callbackContext: CallbackContext,
        request: GetNewsStreamItemsRequestTO,
    ) {
        val requestId = UUID.randomUUID().toString()
        val handler = IntentResponseHandler<GetNewsStreamItemsResponseTO>(
            NewsPlugin.GET_NEWS_STREAM_ITEMS_SUCCESS,
            NewsPlugin.GET_NEWS_STREAM_ITEMS_FAILED,
            requestId
        )
        callbackMap[requestId] = callbackContext
        getNewsStreamItems(handler, request, true)
    }

    override fun shouldAllowRequest(url: String): Boolean {
        val lowerCaseUrl = url.lowercase()
        return if (lowerCaseUrl.startsWith("http://") || lowerCaseUrl.startsWith("https://")) {
            true
        } else super.shouldAllowRequest(url)
    }

    override fun onOverrideUrlLoading(url: String): Boolean {
        L.i("Branding is loading url: $url")
        val uri = Uri.parse(url)
        val lowerCaseUrl = url.lowercase()
        if (lowerCaseUrl.startsWith(POKE)) {
            val tag = url.substring(POKE.length)
            poke(tag)
            return true
        } else if (lowerCaseUrl.startsWith("http://") || lowerCaseUrl.startsWith("https://")
            || lowerCaseUrl.startsWith("tel") || lowerCaseUrl.startsWith("sms") || lowerCaseUrl.startsWith(
                "mailto"
            )
        ) {
            val customTabsBuilder = CustomTabsIntent.Builder()
            val customTabsIntent = customTabsBuilder.build()
            customTabsIntent.launchUrl(cordova.activity, uri)
            logUrl(App.firebaseAnalytics, url, rogerthatInterface.getServiceEmail())
            return true
        }
        return super.onOverrideUrlLoading(url)
    }

    override fun onDestroy() {
        mActionScreenUtils.stop()
        getActivity().unregisterReceiver(mBroadcastReceiver)
        mPoker?.stop()
    }

    private fun returnArgsMissing(callbackContext: CallbackContext) {
        callbackContext.error("User did not specify data to encode")
    }

    private fun setInfo() {
        val label = rogerthatInterface.getItemLabel()
        val hash = rogerthatInterface.getItemTagHash()
        val menuItem: ServiceMenuItemInfo? = if (hash == null && label == null) {
            null
        } else {
            ServiceMenuItemInfo(label, hash)
        }
        val info = getFriendsPlugin().getRogerthatUserAndServiceInfo(
            rogerthatInterface.getServiceEmail(),
            rogerthatInterface.getServiceFriend(),
            menuItem
        )
        sendCallbackUpdate("setInfo", JSONObject(info))
    }

    private fun log(args: JSONObject) {
        val errorMessage = JsonUtils.optString(args, "e", null)
        val message = JsonUtils.optString(args, "m", null)
        if (errorMessage != null) {
            mActionScreenUtils.logError(
                rogerthatInterface.getServiceEmail() ?: "",
                rogerthatInterface.getItemLabel() ?: "",
                errorMessage
            )
        } else {
            L.i("[BRANDING] $message")
        }
    }

    private fun sendApiCall(callbackContext: CallbackContext, args: JSONObject?) {
        if (args == null) {
            returnArgsMissing(callbackContext)
            return
        }
        val method = JsonUtils.optString(args, "method", null)
        val params = JsonUtils.optString(args, "params", null)
        val tag = JsonUtils.optString(args, "tag", null)
        if (method == null) {
            callbackContext.error("'method' is a mandatory parameter")
            return
        }
        if (tag == null) {
            callbackContext.error("'tag' is a mandatory parameter")
            return
        }
        val synchronous = args.optBoolean("synchronous", true)
        getFriendsPlugin().sendApiCall(
            rogerthatInterface.getServiceEmail()!!,
            rogerthatInterface.getItemTagHash(),
            method,
            params,
            tag,
            synchronous,
            callbackContext
        )
        // Callback will be called with the response in case of synchronous calls
        if (!synchronous) {
            callbackContext.success(JSONObject())
        }
    }

    private fun deliverApiResult(r: ServiceApiCallbackResult): Boolean {
        if (!mApiResultHandlerSet) {
            L.i("apiCallResultHandler not set, thus not delivering any api call responses.")
            return false
        }
        val obj = JSONObject()
        obj.put("method", r.method)
        obj.put("result", r.result)
        obj.put("error", r.error)
        obj.put("tag", r.tag)
        sendCallbackUpdate("apiResult", obj)
        return true
    }

    private fun exitApp(callbackContext: CallbackContext) {
        callbackContext.success(JSONObject())
        getActivity().onBackPressed()
    }

    private fun startScanningQrCode(callbackContext: CallbackContext) {
        val activity = getActivity()
        if (mQRCodeScannerOpen) {
            error(
                callbackContext,
                "camera_was_already_open",
                activity.getString(R.string.camera_was_already_open)
            )
            return
        }
        val continueRunnable = Runnable {
            mQRCodeScannerOpen = true
            val intent = Intent(getActivity(), BarcodeScanningActivity::class.java)
            cordova.startActivityForResult(this, intent, BarcodeScanningActivity.QR_SCAN_RESULT)
            callbackContext.success(JSONObject())
        }
        val cancelRunnable = Runnable {
            error(
                callbackContext,
                "camera_permission_was_not_granted",
                activity.getString(R.string.camera_permission_was_not_granted)
            )
        }
        getActivity().askPermissionIfNeeded(
            arrayOf(Manifest.permission.CAMERA), PERMISSION_REQUEST_CAMERA,
            continueRunnable, cancelRunnable
        )
    }

    private fun stopScanningQrCode(callbackContext: CallbackContext) {
        mQRCodeScannerOpen = false
        val intent = Intent(BarcodeScanningActivity.FINISH_INTENT)
        cordova.activity.sendBroadcast(intent)
        callbackContext.success(JSONObject())
    }

    private fun getContext(callbackContext: CallbackContext) {
        val obj = JSONObject()
        val context = rogerthatInterface.getOpenContext()
        obj.put("context", if (context == null) JSONObject() else JSONObject(context))
        callbackContext.success(obj)
    }

    private fun getBadges(callbackContext: CallbackContext) {
        fragment.mainService.badgesStore.observe(fragment) { badges: Map<String, Int> ->
            // Convert map to array
            val badgesArray = JSONArray()
            for ((key, value) in badges) {
                val obj = JSONObject()
                obj.put("key", key)
                obj.put("count", value)
                badgesArray.put(obj)
            }
            callbackContext.success(badgesArray)
        }
    }

    private fun openMessage(callbackContext: CallbackContext, args: JSONObject?) {
        if (args == null) {
            return returnArgsMissing(callbackContext)
        }
        val messageKey = JsonUtils.optString(args, "message_key", null)
            ?: return returnArgsMissing(callbackContext)
        val message = getMessagingPlugin().getStore().getMessageByKey(messageKey, true)
        if (message == null) {
            val obj = JSONObject()
            obj.put("type", "MessageNotFound")
            return callbackContext.error(obj)
        }
        getMessagingPlugin().showMessage(getActivity(), message, false, null, false)
        callbackContext.success(JSONObject())
    }

    private fun error(callbackContext: CallbackContext?, code: String, errorMessage: String) {
        val obj = JSONObject()
        obj.put("code", code)
        obj.put("message", errorMessage)
        callbackContext?.error(obj)
    }

    private fun hideKeyboard(callbackContext: CallbackContext) {
        mActionScreenUtils.hideKeyboard(getActivity().currentFocus!!.windowToken)
        callbackContext.success(JSONObject())
    }

    private fun putUserData(callbackContext: CallbackContext, args: JSONObject?) {
        if (args == null) {
            returnArgsMissing(callbackContext)
            return
        }
        val data = JsonUtils.optString(args, "u", null)
        val smart = args.optBoolean("smart", false)
        val serviceEmail = rogerthatInterface.getServiceEmail()
        if (serviceEmail == null) {
            callbackContext.error("User data cannot be saved from a service-independent context")
            return
        }
        getFriendsPlugin().putUserData(serviceEmail, data, smart)
        callbackContext.success(JSONObject())
    }

    private fun getUserProfile(callbackContext: CallbackContext) {
        userProfileCallbacks.add(callbackContext)
        sendPluginResult(callbackContext, JSONObject(getFriendsPlugin().userInfo))
    }

    private fun getUserInformation(callbackContext: CallbackContext) {
        if (!rogerthatInterface.isEmbeddedApp()) {
            callbackContext.error("getUserInformation can only be called from embedded apps")
            return
        }
        getSystemPlugin().getUserInformation().observe(fragment) {
            if (it.info == null) {
                error(callbackContext, "unknown", it.error ?: "")
            } else {
                sendPluginResult(callbackContext, JSONObject(it.info.toJSONMap()))
            }
        }
    }

    private fun sendPluginResult(callbackContext: CallbackContext?, result: JSONObject) {
        val pluginResult = PluginResult(PluginResult.Status.OK, result)
        pluginResult.keepCallback = true
        callbackContext!!.sendPluginResult(pluginResult)
    }

    private fun notifyProfileChanges() {
        val userInfo = JSONObject(getFriendsPlugin().userInfo)
        for (context in userProfileCallbacks) {
            sendPluginResult(context, userInfo)
        }
    }

    private fun isConnectedToInternet(callbackContext: CallbackContext) {
        val manager = fragment.mainService.networkConnectivityManager
        val wifiConnected = manager.isWifiConnected
        val obj = JSONObject()
        obj.put("connectedToWifi", wifiConnected)
        obj.put("connected", wifiConnected || manager.isMobileDataConnected)
        callbackContext.success(obj)
    }

    private fun openActivity(callbackContext: CallbackContext, args: JSONObject?) {
        if (args == null) {
            returnArgsMissing(callbackContext)
            return
        }
        val actionType = JsonUtils.optString(args, "action_type", null)
        val action = JsonUtils.optString(args, "action", "")!!
        val title = JsonUtils.optString(args, "title", null)
        val service = JsonUtils.optString(args, "service", null)
        val activityParams = args.optJSONObject("params")
        val errorMessage = mActionScreenUtils.openActivity(
            actionType, action, title, service,
            if (activityParams == null) null else JsonUtils.toMap(activityParams)
        )
        if (errorMessage != null) {
            error(callbackContext, "unknown_error_occurred", errorMessage)
            return
        }
        callbackContext.success(JSONObject())
    }

    private fun playAudio(callbackContext: CallbackContext, args: JSONObject?) {
        if (args == null) {
            returnArgsMissing(callbackContext)
            return
        }
        val url = JsonUtils.optString(args, "url", null)
        val fileOnDisk = "file://" + rogerthatInterface.getFilePath() + "/" + url
        mActionScreenUtils.playAudio(fileOnDisk)
        callbackContext.success(JSONObject())
    }

    private fun sendCallbackUpdate(callback: String, args: JSONObject) {
        val obj = JSONObject()
        obj.put("callback", callback)
        obj.put("args", args)
        sendPluginResult(mCallbackContext, obj)
    }

    private fun poke(tag: String) {
        if (mPoker == null) {
            mPoker = Poker(getActivity(), rogerthatInterface.getServiceEmail()!!)
        }
        mPoker!!.poke(tag, null)
    }

    private fun getHomeScreen(callbackContext: CallbackContext) {
        if (homeScreenObserver != null) {
            callbackContext.error("You can only call getHomeScreen once")
            return
        }
        homeScreenObserver = Observer { (homeScreenData, error) ->
            if (error == null) {
                sendPluginResult(callbackContext, JSONObject(homeScreenData as MutableMap<*, *>))
            } else {
                if (error is UnsupportedHomeScreenVersion) {
                    val msg =
                        getActivity().getString(R.string.homescreen_update_required)
                    callbackContext.error(msg)
                } else {
                    callbackContext.error(error.message)
                }
            }
        }
        reloadHomeScreen()
    }

    private fun doGetHomeScreen(
        communityId: Long,
        homeScreenId: String,
    ): LiveData<HomeScreenContentResult> {
        val model = ViewModelProvider(getActivity()).get(
            HomeScreenViewModel::class.java
        )
        return model.getHomeScreenContent(communityId, homeScreenId)
    }

    private fun reloadHomeScreen() {
        if (homeScreenObserver == null) {
            L.d("Not loading homeScreen: no observer set")
            return
        }
        val identity = fragment.mainService.identityStore!!.getIdentity()
        val key = String.format("%s/%s", identity.communityId, identity.homeScreenId)
        if (key == homeScreenKey) {
            // Home screen community and id haven't changed, don't do anything
            return
        }
        homeScreenKey = key
        if (homeScreenLiveData != null) {
            homeScreenLiveData!!.removeObserver(homeScreenObserver!!)
        }
        val liveData = doGetHomeScreen(identity.communityId, identity.homeScreenId)
        liveData.observe(fragment, homeScreenObserver!!)
        homeScreenLiveData = liveData
    }

    private fun isLoggedIn(callbackContext: CallbackContext) {
        if (AppConstants.AUTH_SESSION_ACM) {
            App.sessionMgr.isLoggedIn.observe(fragment) {
                val result = JSONObject()
                result.put("isLoggedIn", it)
                sendPluginResult(callbackContext, result)
            }
        } else {
            val result = JSONObject()
            result.put("isLoggedIn", true)
            callbackContext.success(result)
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, intent: Intent?) {
        L.i("RogerthatPlugin.onActivityResult requestCode -> $requestCode")
        if (requestCode == BarcodeScanningActivity.QR_SCAN_RESULT) {
            mQRCodeScannerOpen = false
            if (resultCode == Activity.RESULT_OK) {
                val rawScanResult = intent!!.getStringExtra(BarcodeScanningActivity.RAW_VALUE)
                if (rawScanResult != null) {
                    L.i("Scanned QR code: $rawScanResult")
                    val result = JSONObject()
                    result.put("content", rawScanResult)
                    if (rawScanResult.lowercase(Locale.US).startsWith("http://")
                        || rawScanResult.lowercase(Locale.US).startsWith("https://")
                    ) {
                        if (mScanCommunication == null) {
                            mScanCommunication = ScanCommunication(fragment.mainService)
                        }
                        mScanCommunication!!.resolveUrl(rawScanResult)
                        result.put("status", "resolving")
                    } else {
                        result.put("status", "resolved")
                    }
                    sendCallbackUpdate("qrCodeScanned", result)
                } else {
                    val obj = JSONObject()
                    obj.put("status", "error")
                    obj.put("content", "An unknown error has occurred")
                    sendCallbackUpdate("qrCodeScanned", obj)
                }
            }
        }
        super.onActivityResult(requestCode, resultCode, intent)
    }

    override fun pluginInitialize() {
        setRogerthatInterface()
        this.fragment = when (val fragment = getActivity().getTopFragment()) {
            is CordovaFragment -> fragment
            is HomeFragment -> fragment.getCordovaFragment()
            else -> throw RuntimeException("Expected fragment to be either CordovaFragment or HomeFragment: $fragment")
        }
        getActivity().registerReceiver(mBroadcastReceiver, getIntentFilter())
    }

    private fun getActivity(): BottomNavigationActivity {
        val activity = cordova.activity
        if (activity is BottomNavigationActivity) {
            return activity
        }
        val msg = String.format(
            "Expected activity using RogerthatPlugin to be BottomNavigationActivity: %s",
            activity.toString()
        )
        L.bug(msg)
        throw RuntimeException(msg)
    }

    private fun getIntentFilter(): IntentFilter {
        val filter = IntentFilter()
        filter.addAction(NewsPlugin.GET_NEWS_GROUP_SUCCESS)
        filter.addAction(NewsPlugin.GET_NEWS_GROUP_FAILED)
        filter.addAction(NewsPlugin.GET_NEWS_GROUPS_SUCCESS)
        filter.addAction(NewsPlugin.GET_NEWS_GROUPS_FAILED)
        filter.addAction(NewsPlugin.GET_NEWS_STREAM_ITEMS_SUCCESS)
        filter.addAction(NewsPlugin.GET_NEWS_STREAM_ITEMS_FAILED)
        filter.addAction(IdentityStore.IDENTITY_CHANGED_INTENT)
        filter.addAction(CordovaFragment.INTENT_BROADCAST)
        return filter
    }

    private fun getBroadcastReceiver(): BroadcastReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
            val action = intent.action ?: return
            val requestId = intent.getStringExtra(IntentResponseHandler.REQUEST_ID)
            var callbackContext: CallbackContext? = null
            var response: IJSONable? = null
            if (requestId != null) {
                callbackContext = callbackMap[requestId]
                if (callbackContext == null) {
                    // Some other activity may have executed this, ignore
                    return
                }
                response = RequestStore.getResponse(requestId)
                if (response == null) {
                    return
                }
            }

            when (action) {
                NewsPlugin.GET_NEWS_GROUP_SUCCESS,
                NewsPlugin.GET_NEWS_GROUPS_SUCCESS,
                NewsPlugin.GET_NEWS_STREAM_ITEMS_SUCCESS,
                -> callbackContext!!.success(
                    JSONObject(response!!.toJSONMap())
                )
                NewsPlugin.GET_NEWS_GROUP_FAILED,
                NewsPlugin.GET_NEWS_GROUPS_FAILED,
                NewsPlugin.GET_NEWS_STREAM_ITEMS_FAILED,
                -> {
                    val err = intent.getSerializableExtra(IntentResponseHandler.ERROR) as Exception
                    L.e(err)
                    error(
                        callbackContext,
                        "unknown",
                        getActivity().getString(R.string.unknown_error_occurred)
                    )
                }
                IdentityStore.IDENTITY_CHANGED_INTENT -> {
                    reloadHomeScreen()
                    notifyProfileChanges()
                }
                CordovaFragment.INTENT_BROADCAST -> {
                    if (!rogerthatInterface.isEmbeddedApp())
                        return
                    val url = intent.getStringExtra(CordovaFragment.INTENT_BROADCAST_URL)!!
                    val embeddedApp =
                        intent.getStringExtra(CordovaFragment.INTENT_BROADCAST_EMBEDDED_APP)!!
                    if (embeddedApp != rogerthatInterface.getEmbeddedApp())
                        return
                    val params = mapOf(
                        "url" to url,
                        "embeddedApp" to embeddedApp,
                    )
                    sendCallbackUpdate("urlOpened", JSONObject(params))
                }
            }
        }
    }

    private fun setRogerthatInterface() {
        rogerthatInterface = getActivity().getRogerthatCordovaInterface()
        mActionScreenUtils = ActionScreenUtils(
            getActivity(),
            rogerthatInterface.getServiceEmail(),
            rogerthatInterface.getItemTagHash()
        )
    }

    private fun getNewsPlugin() =
        fragment.mainService.getPlugin(NewsPlugin::class.java)

    private fun getFriendsPlugin() =
        fragment.mainService.getPlugin(FriendsPlugin::class.java)

    private fun getMessagingPlugin() =
        fragment.mainService.getPlugin(MessagingPlugin::class.java)

    private fun getSystemPlugin() =
        fragment.mainService.getPlugin(SystemPlugin::class.java)

    companion object {
        private const val POKE = "poke://"
        private const val PERMISSION_REQUEST_CAMERA = 1
    }
}
