import { Notification } from '../data/Notification';

export interface NotificationService {
    send(notification: Notification): Promise<void>;
}

const NotificationServiceType = Symbol.for('NotificationService');
export { NotificationServiceType };
