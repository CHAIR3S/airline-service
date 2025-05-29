import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

export interface CountResult {
  count: string;
}

export interface TopDestination {
  city: string;
  total_reservations: number;
}

export interface OccupancyRate {
  destination: string;
  occupancyRate: number;
}

export interface AverageBaggage {
  flight_id: number;
  avg_weight: number;
}

type Period = 'week' | 'month' | 'year';

@Injectable()
export class ReportService {
  constructor(private readonly dataSource: DataSource) {}

  // Total de clientes registrados
  async getTotalClients(): Promise<number> {
    const result = await this.dataSource.query<CountResult[]>(`
      SELECT COUNT(*) AS count FROM "user"
    `);
    return parseInt(result[0].count, 10);
  }

  // Total de reservaciones
  async getTotalReservations(): Promise<number> {
    const result = await this.dataSource.query<CountResult[]>(`
      SELECT COUNT(*) AS count FROM reservation
    `);
    return parseInt(result[0].count, 10);
  }

  // Total de vuelos
  async getTotalFlights(): Promise<number> {
    const result = await this.dataSource.query<CountResult[]>(`
      SELECT COUNT(*) AS count FROM flight
    `);
    return parseInt(result[0].count, 10);
  }

  // Ventas totales por periodo
  async getSalesSummary(period: Period): Promise<number> {
    const dateTrunc = ['week', 'month', 'year'].includes(period) ? period : 'month';

    const result = await this.dataSource.query<CountResult[]>(`
      SELECT COALESCE(SUM(amount), 0) AS count 
      FROM payment
      WHERE DATE_TRUNC('${dateTrunc}', payment_date) = DATE_TRUNC('${dateTrunc}', CURRENT_DATE)
      AND status = 'PAID'
    `);

    return parseInt(result[0].count, 10);
  }

  // Top 5 destinos más reservados (por periodo)
  async getTopDestinations(period: Period): Promise<TopDestination[]> {
    const dateTrunc = ['week', 'month', 'year'].includes(period) ? period : 'month';

    return this.dataSource.query<TopDestination[]>(`
      SELECT p.city, COUNT(*) AS total_reservations
      FROM reservation r
      JOIN flight f ON r.flight_id = f.flight_id
      JOIN place p ON f.destination_id = p.place_id
      WHERE DATE_TRUNC('${dateTrunc}', f.departure_time) = DATE_TRUNC('${dateTrunc}', CURRENT_DATE)
      GROUP BY p.city
      ORDER BY total_reservations DESC
      LIMIT 5
    `);
  }

  // Tasa de ocupación por destino (por periodo)
  async getOccupancyRate(period: Period): Promise<OccupancyRate[]> {
    const dateTrunc = ['week', 'month', 'year'].includes(period) ? period : 'month';

    return this.dataSource.query<OccupancyRate[]>(`
      SELECT 
        p.name AS destination,
        ROUND(
          SUM(CASE WHEN s.available = false THEN 1 ELSE 0 END)::decimal * 100 / 
          NULLIF(SUM(a.capacity), 0),
          2
        ) AS "occupancyRate"
      FROM flight f
      JOIN seat s ON f.flight_id = s.flight_id
      JOIN aircraft a ON f.aircraft_id = a.aircraft_id
      JOIN place p ON f.destination_id = p.place_id
      WHERE DATE_TRUNC('${dateTrunc}', f.departure_time) = DATE_TRUNC('${dateTrunc}', CURRENT_DATE)
      GROUP BY p.name
      ORDER BY "occupancyRate" DESC
    `);
  }

  // Carga promedio de equipaje por vuelo (por periodo)
  async getAverageBaggageWeight(period: Period): Promise<AverageBaggage[]> {
    const dateTrunc = ['week', 'month', 'year'].includes(period) ? period : 'month';

    return this.dataSource.query<AverageBaggage[]>(`
      SELECT 
        f.flight_id, 
        COALESCE(AVG(b.weight), 0) AS avg_weight
      FROM baggage b
      JOIN reservation r ON r.reservation_id = b.reservation_id
      JOIN flight f ON f.flight_id = r.flight_id
      WHERE DATE_TRUNC('${dateTrunc}', f.departure_time) = DATE_TRUNC('${dateTrunc}', CURRENT_DATE)
      GROUP BY f.flight_id
    `);
  }
}
