import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGridMailing from '@sendgrid/mail';
import { ConfigEnvEnum } from 'common/enums/config-env.enum';

import { UserEntity } from 'db/entities/user.entity';
import { ContactUsDto } from 'mailing/dto/contact-us.dto';
import { TemplatesService } from 'templates/services/templates.service';

@Injectable()
export class MailingService {
  constructor(
    private configService: ConfigService,
    private templatesService: TemplatesService,
  ) {
    SendGridMailing.setApiKey(
      this.configService.get<string>(ConfigEnvEnum.APP_SENDGRID_API_KEY),
    );
  }

  async sendLetter(email: string, title: string, body: string) {
    await SendGridMailing.send({
      to: email,
      from: this.configService.get<string>(
        ConfigEnvEnum.APP_SENDGRID_NOREPLY_EMAIL,
      ),
      subject: title,
      html: body,
    });
  }

  async sendEmailConfirmationRequestLetter(
    user: UserEntity,
    confirmationToken: string,
  ) {
    const { title, body } =
      await this.templatesService.generateEmailConfirmationRequestLetter(
        confirmationToken,
      );
    return this.sendLetter(user.email, title, body);
  }

  async sendResetPasswordEmail(user: UserEntity, confirmationToken: string) {
    const { title, body } =
      await this.templatesService.generateResetPasswordTemplate(
        user.firstName || user.email.replace(/@.*$/, ''),
        confirmationToken,
      );
    return this.sendLetter(user.email, title, body);
  }

  async sendBannedUserLetter(user: UserEntity) {
    const { title, body } =
      await this.templatesService.generateBannedUserLetter(
        user.firstName || user.email.replace(/@.*$/, ''),
      );
    return this.sendLetter(user.email, title, body);
  }

  async sendVerifierStatusLetter(user: UserEntity) {
    const { title, body } =
      await this.templatesService.generateVerifierStatusLetter(user.firstName);
    return this.sendLetter(user.email, title, body);
  }

  async sendContactUsLetter({ email, fullName, message }: ContactUsDto) {
    const { title, body } = this.templatesService.generateContactUsEmail(
      fullName,
      message,
      email,
    );

    await SendGridMailing.send({
      to: this.configService.get<string>(
        ConfigEnvEnum.APP_SENDGRID_SUPPORT_EMAIL,
      ),
      from: this.configService.get<string>(
        ConfigEnvEnum.APP_SENDGRID_NOREPLY_EMAIL,
      ),
      subject: title,
      html: body,
    });
  }

  async sendEvaluationRequestReferralUsageNotice(
    email: string,
    usagesCount: number,
  ): Promise<void> {
    const { body, title } =
      this.templatesService.generateEvaluationRequestReferralUsageNotice(
        usagesCount,
      );
    return await this.sendLetter(email, title, body);
  }
}
