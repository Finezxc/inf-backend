import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigEnvEnum } from 'common/enums/config-env.enum';
import { TemplateResponse } from 'common/types/email-templates.type';

@Injectable()
export class TemplatesService {
  constructor(private configService: ConfigService) {}

  async generateResetPasswordTemplate(
    firstName: string,
    confirmationToken: string,
  ): Promise<TemplateResponse> {
    const title = 'Password reset request';
    const body = `Hello, ${firstName}! 
      To reset your password please click <a href="${this.configService.get<string>(
        ConfigEnvEnum.APP_FRONTEND_URL,
      )}/reset-password/${confirmationToken}">here</a>.</b> Please do not reply to this letter and ignore this message if it wasn't you. `;
    return { title, body };
  }

  async generateEmailConfirmationRequestLetter(
    confirmationToken: string,
  ): Promise<TemplateResponse> {
    const title = 'Please confirm your email';
    const body = `To finish your registration on Infomatix please click on <a href="${this.configService.get<string>(
      ConfigEnvEnum.APP_FRONTEND_URL,
    )}/confirm-email/${confirmationToken}">this link</a>.`;
    return { title, body };
  }

  async generateBannedUserLetter(firstName: string): Promise<TemplateResponse> {
    const title = 'Update on your status';
    const body = `Hello, ${firstName}! You were banned on our website`;
    return { title, body };
  }

  async generateVerifierStatusLetter(
    firstName: string,
  ): Promise<TemplateResponse> {
    const title = 'Update on your status';
    const body = `Hello, ${firstName}! You were granted verifier status`;
    return { title, body };
  }

  generateEvaluationRequestReferralUsageNotice(
    usagesCount: number,
  ): TemplateResponse {
    const title = 'Your referral link have been used';
    const body = `Hello from Infomatix! Your referral link have been used. Total usages of your referral link: ${usagesCount}.`;
    return { title, body };
  }

  generateContactUsEmail(
    firstName: string,
    message: string,
    fromEmail: string,
  ): TemplateResponse {
    return {
      title: `"Contact Us" Message From ${firstName}`,
      body: `${firstName}, ${fromEmail} sent the following message: ${message}`,
    };
  }
}
