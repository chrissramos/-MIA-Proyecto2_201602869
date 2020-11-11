import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  socket: any;
  readonly uri: string = "ws://192.168.1.40:4200/";

  constructor() { 
   // this.socket = io(this.uri);
  }

  /*
  listen(eventName: string){
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  } 

  emit(eventName: string, data: any){
    this.socket.emit(eventName, data);

  }
*/
}
