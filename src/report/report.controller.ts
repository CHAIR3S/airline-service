import { Controller, Get, Query } from '@nestjs/common';
import {
  AverageBaggage,
  OccupancyRate,
  ReportService,
  TopDestination
} from './report.service';

type Period = 'week' | 'month' | 'year';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('clients/total')
  getTotalClients() {
    return this.reportService.getTotalClients();
  }

  @Get('reservations/total')
  getTotalReservations() {
    return this.reportService.getTotalReservations();
  }

  @Get('flights/total')
  getTotalFlights() {
    return this.reportService.getTotalFlights();
  }

  @Get('sales/summary')
  getSalesSummary(@Query('period') period: Period) {
    return this.reportService.getSalesSummary(period);
  }

  @Get('destinations/top')
  getTopDestinations(@Query('period') period: Period): Promise<TopDestination[]> {
    return this.reportService.getTopDestinations(period);
  }

  @Get('occupancy-rate')
  getOccupancyRate(@Query('period') period: Period): Promise<OccupancyRate[]> {
    return this.reportService.getOccupancyRate(period);
  }

  @Get('baggage/average')
  getAverageBaggageWeight(@Query('period') period: Period): Promise<AverageBaggage[]> {
    return this.reportService.getAverageBaggageWeight(period);
  }
}
