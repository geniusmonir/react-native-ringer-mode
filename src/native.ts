import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-ringer-mode' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const RingerMode = NativeModules.RingerMode
  ? NativeModules.RingerMode
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const isAndroid = Platform.OS === 'android';

// Accepted Ringer Mode values
export const RINGER_MODE = {
  silent: 0,
  vibrate: 1,
  normal: 2,
} as const;

// Ringer Mode type definition
type ValueOf<T> = T[keyof T];
export type RingerModeType = ValueOf<typeof RINGER_MODE>;

export interface HighPriorityNotificationConfig {
  title: string; // notification title default: High Priority Notification
  message: string; // notification body text default: This is a high priority Notification
  notificationIcon: string; // drawable name like "notification_icon"
  playSound?: boolean; // play default sound
  playVibration?: boolean; // play default vibration
  vibrationPattern?: number[]; // custom vibration pattern [wait, vibrate, pause, vibrate...]
  bypassDnd?: boolean; // allow bypass of DND if granted default: false if not given
  autoCancel?: boolean; // remove on tap default: false if not given
  channelId?: string; // default: "priotiry_channel_id"
  channelName?: string; // default: "Priority Notification Channel"
  groupId?: string; // optional group
  category?: 'alarm' | 'call' | 'message' | 'event' | 'reminder' | 'service'; // default "alarm"
}

export async function getRingerMode(): Promise<RingerModeType | undefined> {
  if (!isAndroid) {
    return;
  }

  return RingerMode.getRingerMode();
}

export async function setRingerMode(
  mode: RingerModeType
): Promise<RingerModeType | undefined> {
  if (!isAndroid) {
    return;
  }

  return RingerMode.setRingerMode(mode);
}

export async function checkDndAccess(): Promise<boolean | undefined> {
  if (!isAndroid) {
    return;
  }

  return RingerMode.checkDndAccess();
}

export async function requestDndAccess(): Promise<boolean | undefined> {
  if (!isAndroid) {
    return;
  }

  return RingerMode.requestDndAccess();
}

export async function sendHighPriorityNotification(
  config: HighPriorityNotificationConfig
): Promise<void> {
  if (!isAndroid) return;
  return RingerMode.sendHighPriorityNotification(config);
}
