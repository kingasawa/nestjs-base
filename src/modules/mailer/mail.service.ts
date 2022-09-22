import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from './config';
const SibApiV3Sdk = require('sib-api-v3-sdk');
const v3APIKey = config.SENDINBLUE_API_V3_KEY;

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public send(mailTo: string): void {
    this.mailerService.sendMail({
      to: mailTo,
      from: config.MAIL_SENDER,
      subject: 'Testing NestJs Mailer Module',
      template: 'test',
    });
  }

  public sendVerificationMail(mailTo: string, code: string): any {
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = v3APIKey;
    const linkTo = `http://localhost:3000/user/verify?email=${mailTo}&code=${code}`;
    new SibApiV3Sdk.TransactionalEmailsApi()
      .sendTransacEmail({
        sender: { email: 'no-reply@icd-vietnam.com', name: 'Verification Mail' },
        subject: 'This is verification mail',
        htmlContent: `<!DOCTYPE html><html>please click <a href="${linkTo}">this link</a> to verify</html>`,
        messageVersions: [
          {
            to: [
              {
                email: mailTo,
              },
            ],
          },
        ],
      })
      .then(
        function (data) {
          return data;
        },
        function (error) {
          console.error(error);
          return error;
        },
      );
  }
}
