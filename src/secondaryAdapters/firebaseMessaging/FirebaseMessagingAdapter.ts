import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fcm from 'firebase-admin';
import { firebase } from '../../configuration/FirebaseMessaging';
import logger from '../../configuration/Logger';
import { Notification } from '../../core/data/Notification';
import { NotificationService } from '../../core/ports/NotificationService';

@Injectable()
export class FirebaseMessagingAdapter implements NotificationService {
    private readonly firebase: fcm.app.App;
    constructor() {
        this.firebase = firebase;
    }

    public async send(pushData: Notification): Promise<void> {
        const { token, body, data, title, apnsPriority } = pushData;

        const notification: fcm.messaging.NotificationMessagePayload = { };

        if (body) notification.body = body;
        if (title) notification.title = title;

        const options: fcm.messaging.MessagingOptions = {
            contentAvailable: true,
        };

        options.priority = apnsPriority ? apnsPriority : 'high';

        const payload: fcm.messaging.MessagingPayload = {
            notification,
            ...data ? { data } : { },
        };

        try {
            logger.info({ payload, token }, 'notification before sent');
            await this.firebase.messaging().sendToDevice(token, payload, options);
            logger.info({ payload, token }, 'notification after sent');
        } catch (e) {
            throw new InternalServerErrorException(e);
        }

    }
}
