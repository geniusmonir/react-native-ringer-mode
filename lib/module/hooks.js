import { useState, useEffect } from 'react';
import { getRingerMode, setRingerMode } from './native';
export const useRingerMode = () => {
  const [mode, setCurrentMode] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const currentMode = await getRingerMode();
        setCurrentMode(currentMode);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);

  const setMode = async newMode => {
    setError(null);

    try {
      const currentMode = await setRingerMode(newMode);
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
//# sourceMappingURL=hooks.js.map