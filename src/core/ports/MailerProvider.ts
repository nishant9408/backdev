export interface MailerProvider {
    sendEmail(toEmail: string, text: string): Promise<void>;
}

const MailerProviderType = Symbol.for('MailerProvider');
export { MailerProviderType };
