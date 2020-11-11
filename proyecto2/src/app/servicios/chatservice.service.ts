import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  
  public chats: Mensaje[] = [];
  public identificadorusuario: any = ''; 
  constructor(private afs: AngularFirestore) {
      this.identificadorusuario = sessionStorage.getItem('correo');
   }


   // metodos
   cargarMensajes(idSalaRecibes: string){
    // this.itemsCollection = this.afs.collection<Mensaje>('chats', ref=> ref.orderBy('fecha', 'asc').limitToLast(10));
    const nuevoID = idSalaRecibes.toString();
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref=> ref.where('idSala', '==', nuevoID));
    console.log('CARGANDO MENSAJES DE SALA: ', nuevoID);
    return this.itemsCollection.valueChanges()
                            .pipe (
                                    map ((mensajes: Mensaje[])=> {
                                      console.log('Mensajes de este chat:');
                                      console.log (mensajes);
                                      this.chats = mensajes;
                                      })
                                  ); 


   }

   // falta el UID del usuario y el ID SALA 
   agregarMensaje(texto: string, idSalaT: string){

      const nuevoIdSala = idSalaT.toString();
      let mensajeObj = {
        nombre: sessionStorage.getItem('correo'),
        mensaje: texto,
        fecha: new Date().getTime(),
        idSala: nuevoIdSala
      }
      
      return this.itemsCollection.add(mensajeObj);
   }
}
