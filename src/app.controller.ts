import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { UjSzabalyDto } from './UjSzabaly.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async getHello() {
    return {
      title: 'Tűzfal tiltólista',
      rules: await this.appService.GetDatabase()
    }
  }

  @Post()
  @Render('index')
  async postHello(@Body() body: UjSzabalyDto) {
    
    const result = await this.appService.UjSzabaly(body.priority, body.mac, body.enabled);
    return {
      error: result?.error || null,
      title: 'Tűzfal tiltólista',
      rules: await this.appService.GetDatabase()
    }
  }
}
