export interface RescheduleDailyPushesDTO {
    userId: string;
    notificationToken?: string | null;
    timezone: string;
    updatedAt?: Date | null;
    createdAt?: Date | null;
}
