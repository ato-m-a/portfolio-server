import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

/* service */
import { ContactService } from './contact.service';

/* dto */
import { ContactDto } from './contact.dto';

@ApiTags('Contact')
@Controller()
export class ContactController {
  constructor(private ContactService: ContactService) {}

  @Post()
  public async ContactMe(@Res() res: Response, @Body() dataset: ContactDto) {
    await this.ContactService.submitContact(dataset);
    
    res.status(201).json({ result: true });
  }
}