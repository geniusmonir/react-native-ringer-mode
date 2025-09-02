"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRingerMode = void 0;

var _react = require("react");

var _native = require("./native");

const useRingerMode = () => {
  const [mode, setCurrentMode] = (0, _react.useState)();
  const [error, setError] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    (async () => {
      try {
        const currentMode = await (0, _native.getRingerMode)();
        setCurrentMode(currentMode);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  const setMode = async newMode => {
    setError(null);

    try {
      const currentMode = await (0, _native.setRingerMode)(newMode);
      setCurrentMode(currentMode);
    } catch (err) {
      setError(err);
    }
  };

  return {
    mode,
    error,
    setMode
  };
};

exports.useRingerMode = useRingerMode;
//# sourceMappingURL=hooks.js.map