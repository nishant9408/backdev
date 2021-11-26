interface NotificationBuilder {
    token: string;
    body?: string;
    title?: string;
    data?: { [k: string]: any } | null;
    apnsPriority?: string | null;
}

export enum NotificationPriority {
    NORMAL = 'normal',
    HIGH = 'high',
}

export class Notification {
    token: string;
    apnsPriority: string | null;
    body: string | null;
    title: string | null;
    data: { [k: string]: any } | null;
    
    public static fromObject(builder: NotificationBuilder): Notification {
        const notification = new Notification();
        notification.token = builder.token;
        notification.apnsPriority = builder.apnsPriority || null;
        notification.body = builder.body || null;
        notification.title = builder.title || null;
        notification.data = builder.data || null;
        return notification;
    }
}
