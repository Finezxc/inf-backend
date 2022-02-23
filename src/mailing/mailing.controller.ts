import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ContactUsDto } from 'mailing/dto/contact-us.dto';
import { MailingService } from 'mailing/services/mailing.service';

@ApiTags(`mailing`)
@Controller('mailing')
export class MailingController {
  constructor(private mailingService: MailingService) {}

  @Post('contact-us-email')
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  sendContactUsEmail(@Body() contactUsInputDto: ContactUsDto) {
    return this.mailingService.sendContactUsLetter(contactUsInputDto);
  }
}
