import { RingerModeType } from './native';
export declare const useRingerMode: () => {
    mode: RingerModeType | undefined;
    error: any;
    setMode: (newMode: RingerModeType) => Promise<void>;
};
