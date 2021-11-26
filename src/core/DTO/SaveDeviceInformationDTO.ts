export interface SaveDeviceInformationDTO {
    userId: string;
    timezone: string;
    email: string;
    allowMailing: boolean;
    notificationToken?: string | null;
}
