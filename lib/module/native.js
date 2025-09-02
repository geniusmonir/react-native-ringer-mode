import { NativeModules, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-ringer-mode' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const RingerMode = NativeModules.RingerMode ? NativeModules.RingerMode : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});
const isAndroid = Platform.OS === 'android'; // Accepted Ringer Mode values

export const RINGER_MODE = {
  silent: 0,
  vibrate: 1,
  normal: 2
}; // Ringer Mode type definition

export async function getRingerMode() {
  if (!isAndroid) {
    return;
  }

  return RingerMode.getRingerMode();
}
export async function setRingerMode(mode) {
  if (!isAndroid) {
    return;
  }

  return RingerMode.setRingerMode(mode);
}
export async function checkDndAccess() {
  if (!isAndroid) {
    return;
  }

  return RingerMode.checkDndAccess();
}
export async function requestDndAccess() {
  if (!isAndroid) {
    return;
  }

  return RingerMode.requestDndAccess();
}
export async function sendHighPriorityNotification(config) {
  if (!isAndroid) return;
  return RingerMode.sendHighPriorityNotification(config);
}
//# sourceMappingURL=native.js.map