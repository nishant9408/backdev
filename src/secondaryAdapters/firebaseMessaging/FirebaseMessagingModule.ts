import { Module } from '@nestjs/common';
import { NotificationServiceType } from '../../core/ports/NotificationService';
import { FirebaseMessagingAdapter } from './FirebaseMessagingAdapter';

@Module({
    providers: [
        {
            provide: NotificationServiceType,
            useClass: FirebaseMessagingAdapter,
        },
    ],
    exports: [
        NotificationServiceType,
    ],
})
export class FirebaseMessagingModule { }
