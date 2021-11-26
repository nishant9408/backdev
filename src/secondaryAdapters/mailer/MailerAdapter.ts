import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import config from '../../configuration/config/Config';

import { MailerProvider } from '../../core/ports/MailerProvider';

@Injectable()
export class MailerAdapter implements MailerProvider {

    public async sendEmail(toEmail: string, text: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: 'mail.privateemail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: config.mailer.user,
                pass: config.mailer.pass,
            },
        });

        try {
            await transporter.sendMail({
                from: 'team@healthypicks.nl',
                to: toEmail,
                subject: 'Reset password',
                text,
            });
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
