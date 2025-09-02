package com.reactnativeringermode;

import androidx.annotation.NonNull;

import java.util.Map;
import java.util.HashMap;

import android.os.Build;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Activity;
import android.media.AudioManager;
import android.content.Context;
import android.content.Intent;
import androidx.core.app.NotificationCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = RingerModeModule.NAME)
public class RingerModeModule extends ReactContextBaseJavaModule {
    public static final String NAME = "RingerMode";

    private AudioManager am;
    private final ReactApplicationContext reactContext;

    public RingerModeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        am = (AudioManager) reactContext.getApplicationContext().getSystemService(Context.AUDIO_SERVICE);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void getRingerMode(Promise promise) {
      int mode = am.getRingerMode();
      promise.resolve(mode);
    }

    private boolean hasDndAccess() {
      NotificationManager nm = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);
      return (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) || nm.isNotificationPolicyAccessGranted();
    }

    @ReactMethod
    public void checkDndAccess(Promise promise) {
      promise.resolve(hasDndAccess());
    }

    @ReactMethod
    public void requestDndAccess(Promise promise) {
      if (!hasDndAccess() && reactContext.hasCurrentActivity()) {
          Intent intent = new Intent(
                              android.provider.Settings
                              .ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS);
          intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

          Context context = reactContext.getCurrentActivity().getApplicationContext();
          context.startActivity(intent);
          promise.resolve(true);
      }

      promise.resolve(false);
    }

    @ReactMethod
    public void setRingerMode(int mode, Promise promise) {
      try {
        am.setRingerMode(mode);

        promise.resolve(mode);
      } catch (Exception err) {
        promise.reject(err);
      }
    }

    @ReactMethod
    public void sendHighPriorityNotification(ReadableMap config, Promise promise) {
        try {
            String channelId = config.hasKey("channelId") ? config.getString("channelId") : "priotiry_channel_id";
            String channelName = config.hasKey("channelName") ? config.getString("channelName") : "Priority Notification Channel";
            String title = config.hasKey("title") ? config.getString("title") : "High Priority Notification";
            String message = config.hasKey("message") ? config.getString("message") : "This is a high priority Notification";
            boolean bypassDnd = config.hasKey("bypassDnd") && config.getBoolean("bypassDnd");
            boolean autoCancel = !config.hasKey("autoCancel") || config.getBoolean("autoCancel");
            String category = config.hasKey("category") ? config.getString("category") : NotificationCompat.CATEGORY_ALARM;
            String groupId = config.hasKey("groupId") ? config.getString("groupId") : null;

            NotificationManager manager = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                NotificationChannel channel = new NotificationChannel(
                        channelId,
                        channelName,
                        NotificationManager.IMPORTANCE_HIGH
                );
                channel.setDescription("High priority notifications");
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    channel.setBypassDnd(bypassDnd);
                }
                manager.createNotificationChannel(channel);
            }

            NotificationCompat.Builder builder = new NotificationCompat.Builder(reactContext, channelId)
                    .setContentTitle(title)
                    .setContentText(message)
                    .setPriority(NotificationCompat.PRIORITY_MAX)
                    .setCategory(category)
                    .setAutoCancel(autoCancel);

            // Handle notification icon
            if (config.hasKey("notificationIcon")) {
                String iconName = config.getString("notificationIcon");
                int iconResId = reactContext.getResources().getIdentifier(
                        iconName,
                        "drawable",
                        reactContext.getPackageName()
                );
                if (iconResId != 0) {
                    builder.setSmallIcon(iconResId);
                } else {
                    builder.setSmallIcon(android.R.drawable.ic_dialog_alert);
                }
            } else {
                builder.setSmallIcon(android.R.drawable.ic_dialog_alert);
            }

            // Handle vibration
            if (config.hasKey("vibrationPattern")) {
                ReadableArray patternArray = config.getArray("vibrationPattern");
                long[] pattern = new long[patternArray.size()];
                for (int i = 0; i < patternArray.size(); i++) {
                    pattern[i] = (long) patternArray.getDouble(i);
                }
                builder.setVibrate(pattern);
            } else if (config.hasKey("playVibration") && config.getBoolean("playVibration")) {
                builder.setDefaults(Notification.DEFAULT_VIBRATE);
            }

            // Handle sound
            if (config.hasKey("playSound") && config.getBoolean("playSound")) {
                builder.setDefaults(Notification.DEFAULT_SOUND);
            }

            // Handle group
            if (groupId != null) {
                builder.setGroup(groupId);
            }

            manager.notify(1001, builder.build());
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERR_NOTIFICATION", e);
        }
    }

}
