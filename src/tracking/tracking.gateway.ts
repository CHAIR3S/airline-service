import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' }
})
export class TrackingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('✅ WebSocket Gateway iniciado');
  }

  handleConnection(client: Socket) {
    console.log(`<<<< Cliente conectado: ${client.id} >>>>`);
  }

  handleDisconnect(client: Socket) {
    console.log(`!!!!! Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('update-position')
  handleUpdatePosition(@MessageBody() data: { flightId: string; lat: number; lng: number }) {
    console.log(`📍 Vuelo ${data.flightId}:`, data);
    this.server.emit(`flight-${data.flightId}`, data);
  }
}