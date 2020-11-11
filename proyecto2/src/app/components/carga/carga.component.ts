import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-items';
import { CargaImagenesFireService} from '../../servicios/carga-imagenes-fire.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {


  file: FileItem[] = [];

  photoSelected: ArrayBuffer;

  estaSobreElemento = false;
  archivos: FileItem[] = [];
  archivoUno: FileItem[] = [];
  constructor( public _cargaImagenesFireService:CargaImagenesFireService) { }
 
  ngOnInit(): void {
  }
  cargarImagenes(){
    console.log(this.archivos);
    
    //this._cargaImagenesFireService.cargarImagenesFirebase(this.archivos);
  }
  
  cargarImagenUno(){
      // enviar imagen a firebase Storage
    console.log(this.archivoUno);
    //this._cargaImagenesFireService.cargarImagenesFirebase(this.archivoUno);
  }


  pruebaSobreElemento(event){
    console.log(event);
  }
  limpiarLista(){
    this.archivos = [];
    
  }
  startUpload(){

  }
  onUploadOutput(event){
    console.log(event);
  }

  onInputFoto(event: HtmlInputEvent): void{
    if (event.target.files && event.target.files[0]){
        console.log(event.target.files); // aqui es un objeto, hay que pasarlo a arreglo
        this.extraerDeObjeto(event.target.files);
    }

  }

  // tslint:disable-next-line:typedef
  extraerDeObjeto(archivosLista: FileList ){   //metodo para pasar de objeto a arreglo //la foto es 1 objeto
      
      // tslint:disable-next-line:forin
      for( const propiedad in Object.getOwnPropertyNames( archivosLista ) ){
          const archivoTemporal = archivosLista[propiedad];
          
          const nuevoArchivo = new FileItem( archivoTemporal );
          this.archivoUno.push(nuevoArchivo);  // foto cargada en archivoUno
      }

  }



}
