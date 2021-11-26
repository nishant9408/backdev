import { Module } from '@nestjs/common';
import { MailerProviderType } from '../../core/ports/MailerProvider';
import { MailerAdapter } from './MailerAdapter';

@Module({
    providers: [
        {
            provide: MailerProviderType,
            useClass: MailerAdapter,
        },
    ],
    exports: [
        MailerProviderType,
    ],
})
export class MailerModule {
}
