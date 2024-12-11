package com.testapp

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme

class NativeTodoActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setContent {
            MaterialTheme {
                NativeTodoScreen(
                    onOpenRNClick = {
                        startActivity(Intent(this, ReactNativeActivity::class.java))
                    }
                )
            }
        }
    }
}