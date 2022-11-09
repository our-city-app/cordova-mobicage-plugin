package com.mobicage.rogerthat.cordova

import android.provider.Settings
import android.view.WindowManager
import com.mobicage.rogerthat.ServiceBoundActivity
import org.apache.cordova.CallbackContext
import org.json.JSONObject
import kotlin.math.min

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

    fun restoreSystemBrightness(callbackContext: CallbackContext?) {
        val lp = activity.window.attributes
        lp.screenBrightness = WindowManager.LayoutParams.BRIGHTNESS_OVERRIDE_NONE
        activity.window.attributes = lp // must be done on UI thread
        callbackContext?.success(JSONObject())
    }

}
