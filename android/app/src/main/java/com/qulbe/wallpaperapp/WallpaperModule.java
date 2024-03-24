// WallpaperModule.java

package com.qulbe.wallpaperapp;

import android.app.WallpaperManager;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Build;
import android.util.Base64;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

public class WallpaperModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public WallpaperModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "WallpaperModule";
    }

    @ReactMethod
    public void setWallpaper(String imageUrl, String screenName, Promise promise) {
        new SetWallpaperTask(screenName, promise).execute(imageUrl);
    }

    private class SetWallpaperTask extends AsyncTask<String, Void, Boolean> {
        private final String screenName;
        private final Promise promise;

        public SetWallpaperTask(String screenName, Promise promise) {
            this.screenName = screenName;
            this.promise = promise;
        }

        @RequiresApi(api = Build.VERSION_CODES.N)
        @Override
        protected Boolean doInBackground(String... params) {
            String imageUrl = params[0];
            try {
                // Fetch image from URL
                InputStream inputStream = new URL(imageUrl).openStream();
                Bitmap bitmap = BitmapFactory.decodeStream(inputStream);

                WallpaperManager wallpaperManager = WallpaperManager.getInstance(reactContext);

                // Determine which screen(s) to set wallpaper for
                int flags = 0;
                if (screenName.equals("home")) {
                    flags |= WallpaperManager.FLAG_SYSTEM;
                } else if (screenName.equals("lock")) {
                    flags |= WallpaperManager.FLAG_LOCK;
                } else if (screenName.equals("both")) {
                    flags |= WallpaperManager.FLAG_SYSTEM | WallpaperManager.FLAG_LOCK;
                }

                // Set wallpaper
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                    wallpaperManager.setBitmap(bitmap, null, true, flags);
                }

                return true;
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
        }

        @Override
        protected void onPostExecute(Boolean success) {
            if (success) {
                promise.resolve("Wallpaper set successfully");
            } else {
                promise.reject("Wallpaper setting failed");
            }
        }
    }
}
