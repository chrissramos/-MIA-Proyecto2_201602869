import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-items';
@Injectable({
  providedIn: 'root'
})
export class CargaImagenesFireService {

  private CARPETA_IMAGENES = 'img';
  public urlEnviarDos: string = 'a';
  constructor( private db: AngularFirestore) { }

  cargarImagenesFirebase( imagenes: FileItem[]){  // perfiles
    //console.log(imagenes);
    const storageRef = firebase.storage().ref();
    let urlEnviar: string  = 'a';
    
    for( const item of imagenes ){
        item.estaSubiendo = true;
        if( item.progreso >= 100 ){
            continue;
        }
        
        const uploadTask: firebase.storage.UploadTask = 
                storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`)
                  .put( item.archivo );

        uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED, 
                  ( snapshot: firebase.storage.UploadTaskSnapshot ) =>
                   item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes )*100, 
                  ( error ) => console.error('Error al subir ', error),
                  () => {
                      console.log('imagen cargada correctamente');
                      uploadTask.snapshot.ref.getDownloadURL().then(res => {
                      item.url = res;
                      item.estaSubiendo = false;
                      this.urlEnviarDos = item.url;
                      localStorage.setItem('urlImagen', res);
                      //console.log('url de imagen res es: ');
                      //console.log(localStorage.getItem('urlImagen'));
                      this.urlEnviarDos = item.url;

                      // guardar en firestore
                      this.guardarImagen({
                        nombre: item.nombreArchivo,
                        url: item.url
                      });
                      

                     });
                  });

    }
    
   
  }


  private guardarImagen( imagen: { nombre: string, url: string } ){
    this.db.collection(`/${ this.CARPETA_IMAGENES }`)
      .add( imagen );
  }
  
}


