package com.mobicage.rogerthat.cordova

import android.provider.Settings
import android.view.WindowManager
import com.mobicage.rogerthat.ServiceBoundActivity
import org.apache.cordova.CallbackContext
import org.json.JSONObject
import kotlin.math.min
import kotlin.math.roundToInt

// Adapted from https://github.com/expo/expo/blob/main/packages/expo-brightness/android/src/main/java/expo/modules/brightness/BrightnessModule.kt

class Brightness(private val activity: ServiceBoundActivity) {

    fun setBrightness(brightnessValue: Float, callbackContext: CallbackContext) {
        val attrs = activity.window.attributes
        attrs.screenBrightness = min(brightnessValue, 1.0f)
        activity.window.attributes = attrs // must be done on UI thread
        callbackContext.success(JSONObject())
    }

    fun getBrightness(callbackContext: CallbackContext) {
        val lp = activity.window.attributes
        val brightness =
            if (lp.screenBrightness == WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE) {
                getSystemBrightness()
            } else {
                lp.screenBrightness
            }
        callbackContext.success(JSONObject().put("brightness", brightness))
    }

    private fun getSystemBrightness(): Float {
        val brightnessMode = Settings.System.getInt(
            activity.contentResolver,
            Settings.System.SCREEN_BRIGHTNESS_MODE
        )
        return if (brightnessMode == Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC) {
            val brightness = Settings.System.getFloat(
                activity.contentResolver, // https://stackoverflow.com/questions/29349153/change-adaptive-brightness-level-programatically
                // this setting cannot be changed starting in targetSdkVersion 23, but it can still be read
                "screen_auto_brightness_adj"
            )
            (brightness + 1.0f) / 2
        } else {
            val brightness = Settings.System.getString(
                activity.contentResolver,
                Settings.System.SCREEN_BRIGHTNESS
            )
            brightness.toInt() / 255f
        }
    }

    fun setSystemBrightness(brightnessValue: Float) {
        // we have to just check this every time
        // if we try to store a value for this permission, there is no way to know if the user has changed it
        if (!Settings.System.canWrite(activity)) {
            throw Error("ERR_BRIGHTNESS_PERMISSIONS_DENIED")
        }
        // manual mode must be set in order to change system brightness (sets the automatic mode off)
        Settings.System.putInt(
            activity.contentResolver,
            Settings.System.SCREEN_BRIGHTNESS_MODE,
            Settings.System.SCREEN_BRIGHTNESS_MODE_MANUAL
        )
        Settings.System.putInt(
            activity.contentResolver,
            Settings.System.SCREEN_BRIGHTNESS,
            (brightnessValue * 255).roundToInt()
        )
    }

    fun restoreSystemBrightness(callbackContext: CallbackContext?) {
        val lp = activity.window.attributes
        lp.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE
        activity.window.attributes = lp // must be done on UI thread
        callbackContext?.success(JSONObject())
    }

    fun isUsingSystemBrightness(): Boolean {
        val lp = activity.window.attributes
        return lp.screenBrightness == WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE
    }

    fun getSystemBrightnessMode(): Int {
        val brightnessMode = Settings.System.getInt(
            activity.contentResolver,
            Settings.System.SCREEN_BRIGHTNESS_MODE
        )
        return brightnessModeNativeToJS(brightnessMode)
    }

    fun setSystemBrightnessMode(brightnessMode: Int) {
        // we have to just check this every time
        // if we try to store a value for this permission, there is no way to know if the user has changed it
        if (!Settings.System.canWrite(activity)) {
            throw Error("ERR_BRIGHTNESS_PERMISSIONS_DENIED")
        }
        Settings.System.putInt(
            activity.contentResolver,
            Settings.System.SCREEN_BRIGHTNESS_MODE,
            brightnessModeJSToNative(brightnessMode)
        )
    }

    private fun brightnessModeNativeToJS(nativeValue: Int): Int {
        return when (nativeValue) {
            Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC -> 1
            Settings.System.SCREEN_BRIGHTNESS_MODE_MANUAL -> 2
            else -> 0
        }
    }

    private fun brightnessModeJSToNative(jsValue: Int): Int {
        return when (jsValue) {
            1 -> Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC
            2 -> Settings.System.SCREEN_BRIGHTNESS_MODE_MANUAL
            else -> throw Error("Unsupported brightness mode $jsValue")
        }
    }
}
