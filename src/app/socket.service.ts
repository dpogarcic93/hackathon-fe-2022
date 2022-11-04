import { tap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  sendMessage(type = 'ENERGY', msg?: any) {
    this.socket.emit(type, msg);
  }

  close() {
    this.socket.disconnect();
  }

  getMessage() {
    return this.socket.fromEvent('ENERGY').pipe(tap((data) => data));
  }

  public userPing(userName: string): void {
    this.sendMessage(userName);
  }
}
