import { Component, OnInit, Input } from '@angular/core';
import { ChatserviceService } from '../../servicios/chatservice.service';
import { Mensaje } from '../../interface/mensaje.interface';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() idSalaRecibe: string; // aqui viene el idsala
  @Input() idSalaChatArr: any ={} // aqui viene el idsala

  mensaje: string = "";
  elemento: any;
  mensajesChat: any[] = [];
  iniciarSalaBandera = false;
  public chatsP: Mensaje[] = [];
  
  usuarioIdentificador: any = '';


  constructor(public _chatService:ChatserviceService) {
    // console.log(this.idSalaChatArr);
    this.usuarioIdentificador = sessionStorage.getItem('correo');
   /* this._chatService.cargarMensajes().subscribe( () =>{
              setTimeout( ()=> {
                
                this.elemento.scrollTop = this.elemento.scrollHeight;
              },20);
            } );  */
   }

  ngOnInit(): void {
    
    /*this._chatService.cargarMensajes(this.idSalaRecibe).subscribe( () =>{
      setTimeout( ()=> {
        
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20);
    } );
    this.elemento = document.getElementById('app-mensajes');
    console.log('COMPONENTE CHAT donde lo recibo ');
    console.log('id De esta sala = ', this.idSalaRecibe);*/
  }

  enviarMensaje(){ // enviar mensaje al servicio chatService 
    console.log(this.mensaje);
    
    if(this.mensaje.length === 0){
      return;
    }
    this._chatService.agregarMensaje(this.mensaje, this.idSalaRecibe)
            .then(() => this.mensaje = "")
            .catch((err)=>console.error('Error al enviar el mensaje', err));
    
  }

  cargarEsteChat(){
    this._chatService.cargarMensajes(this.idSalaRecibe).subscribe( () =>{
      setTimeout( ()=> {
        
        this.elemento.scrollTop = this.elemento.scrollHeight;
        this.iniciarSalaBandera = true;
      },20);
    } );
    this.elemento = document.getElementById('app-mensajes');
    console.log('COMPONENTE CHAT donde lo recibo ');
    console.log('id De esta sala = ', this.idSalaRecibe);
  }

}
