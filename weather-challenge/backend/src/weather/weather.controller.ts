import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { Response } from 'express';

@Controller('api/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post('logs')
  @UseGuards(JwtAuthGuard)
  async createLog(@Body() body: any) {
    return this.weatherService.create(body);
  }

  @Get('logs')
  async getLogs() {
    return this.weatherService.findAll();
  }

  // Insights de IA (sem proteção para permitir dashboard pública)
  @Get('insights')
  async getInsights() {
    return this.weatherService.generateInsights();
  }

  // Exportar CSV (protegido)
  @Get('export/csv')
  @UseGuards(JwtAuthGuard)
  async exportCsv(@Res() res: Response) {
    const csv = await this.weatherService.getCsvData();
    res.header('Content-Type', 'text/csv');
    res.attachment('weather_history.csv');
    return res.send(csv);
  }
  
  // Exportar XLSX (protegido)
  @Get('export/xlsx')
  @UseGuards(JwtAuthGuard)
  async exportXlsx(@Res() res: Response) {
    const csv = await this.weatherService.getCsvData();
    res.header('Content-Type', 'text/csv'); 
    res.attachment('weather_history.xls');
    return res.send(csv);
  }
}