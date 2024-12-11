package com.testapp

import android.content.Intent
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = NativeNavigationModule.NAME)
class NativeNavigationModule(reactContext: ReactApplicationContext) : 
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "NativeNavigationModule"
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun getInitialScreen(promise: Promise) {
        try {
            // You can implement your logic here to determine the initial screen
            // For now, returning a default value
            promise.resolve("List")
        } catch (e: Exception) {
            promise.reject("ERROR", e.message, e)
        }
    }
} 