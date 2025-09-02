export declare const RINGER_MODE: {
    readonly silent: 0;
    readonly vibrate: 1;
    readonly normal: 2;
};
declare type ValueOf<T> = T[keyof T];
export declare type RingerModeType = ValueOf<typeof RINGER_MODE>;
export interface HighPriorityNotificationConfig {
    title: string;
    message: string;
    notificationIcon: string;
    playSound?: boolean;
    playVibration?: boolean;
    vibrationPattern?: number[];
    bypassDnd?: boolean;
    autoCancel?: boolean;
    channelId?: string;
    channelName?: string;
    groupId?: string;
    category?: 'alarm' | 'call' | 'message' | 'event' | 'reminder' | 'service';
}
export declare function getRingerMode(): Promise<RingerModeType | undefined>;
export declare function setRingerMode(mode: RingerModeType): Promise<RingerModeType | undefined>;
export declare function checkDndAccess(): Promise<boolean | undefined>;
export declare function requestDndAccess(): Promise<boolean | undefined>;
export declare function sendHighPriorityNotification(config: HighPriorityNotificationConfig): Promise<void>;
export {};
