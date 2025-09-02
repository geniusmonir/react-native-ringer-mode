"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RINGER_MODE = void 0;
exports.checkDndAccess = checkDndAccess;
exports.getRingerMode = getRingerMode;
exports.requestDndAccess = requestDndAccess;
exports.sendHighPriorityNotification = sendHighPriorityNotification;
exports.setRingerMode = setRingerMode;

var _reactNative = require("react-native");

const LINKING_ERROR = `The package 'react-native-ringer-mode' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const RingerMode = _reactNative.NativeModules.RingerMode ? _reactNative.NativeModules.RingerMode : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});
const isAndroid = _reactNative.Platform.OS === 'android'; // Accepted Ringer Mode values

const RINGER_MODE = {
  silent: 0,
  vibrate: 1,
  normal: 2
}; // Ringer Mode type definition

exports.RINGER_MODE = RINGER_MODE;

async function getRingerMode() {
  if (!isAndroid) {
    return;
  }

  return RingerMode.getRingerMode();
}

async function setRingerMode(mode) {
  if (!isAndroid) {
    return;
  }

  return RingerMode.setRingerMode(mode);
}

async function checkDndAccess() {
  if (!isAndroid) {
    return;
  }

  return RingerMode.checkDndAccess();
}

async function requestDndAccess() {
  if (!isAndroid) {
    return;
  }

  return RingerMode.requestDndAccess();
}

async function sendHighPriorityNotification(config) {
  if (!isAndroid) return;
  return RingerMode.sendHighPriorityNotification(config);
}
//# sourceMappingURL=native.js.map