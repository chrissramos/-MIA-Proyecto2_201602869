import { Component, OnInit } from '@angular/core';
import { EjemploService } from '../../servicios/ejemplo.service';
import { FileItem } from '../../models/file-items';
import { CargaImagenesFireService} from '../../servicios/carga-imagenes-fire.service';

import {Router} from '@angular/router';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  
  usuarios: any[] = [];
  usuarioActivo: any[] = [];
  archivoUno: FileItem[] = [];

  constructor(private _ejemploservicio:EjemploService, 
    public _cargaImagenesFireService:CargaImagenesFireService ,
    private router:Router){ 
    
    this._ejemploservicio.verUsuarios()
    .subscribe(( resp: any[] ) => {
      this.usuarios = resp;
      console.log('Constructor');
      console.log(resp);
    });
    
  }
  
  ngOnInit(): void {
    
  }
  //metodos
  
  subirFotoSeleccionada(event: HtmlInputEvent): void{
      if(event.target.files && event.target.files[0] ){
          //aqui es un objeto
          this.extraerDeObjeto(event.target.files);
      }
  }

  extraerDeObjeto(archivosLista: FileList ){
    
    // tslint:disable-next-line:forin
    for( const propiedad in Object.getOwnPropertyNames( archivosLista ) ){
          const archivoTemporal = archivosLista[propiedad];
          // tslint:disable-next-line:no-trailing-whitespace
          
          const nuevoArchivo = new FileItem( archivoTemporal );
          this.archivoUno.push(nuevoArchivo);
    }
    
  }
  iniciarSesion(correo:string, pass:string){
    console.log('vamos a iniciar sesion');
    console.log(correo, ' , ' , pass);
    const usuarioLogin = {
      Correo: correo,
      Pass: pass
    };
    this._ejemploservicio.iniciarSesion(usuarioLogin).subscribe(( resp: any[] ) => {
      // this.usuarios = resp;
       // console.log('METODOOOOOOO');
       if(resp.length < 1){
          alert('usuario invalido');
       }else{
        console.log(resp[0]);
        var nombre = resp[0].Usuario_nombre;

        alert('Buenvenido: '+ nombre);
        // tslint:disable-next-line:forin
        
        sessionStorage.setItem('idUsuario', resp[0].Usuario_id);
        sessionStorage.setItem('nombre', resp[0].Usuario_nombre);
        sessionStorage.setItem('apellido', resp[0].Usuario_apellido);
        sessionStorage.setItem('fecha', resp[0].Usuario_fecha);
        sessionStorage.setItem('correo', resp[0].Usuario_correo);
        sessionStorage.setItem('imagen', resp[0].Usuario_imagen);
        sessionStorage.setItem('pais', resp[0].Usuario_pais);
        sessionStorage.setItem('credito', resp[0].Usuario_credito);
        sessionStorage.setItem('conectado', '1');
        // redireccionar 
        
        if(resp[0].Usuario_correo == 'admin@gmail.com'){
          this.router.navigate(['/panela']);
        }else{
          this.router.navigate(['/panelu']);
        }
        
       }
      
    });

  }
  // tslint:disable-next-line:typedef
  registrarUsuario(nombre:string, apellido:string, pais:string, fecha:string, correo:string, pass:string, passC:string){
   
      this._cargaImagenesFireService.cargarImagenesFirebase(this.archivoUno);
      
      setTimeout(() => {
        // aqui hacer el post ya que en otro lado pela cables, saber que pex
        // console.log('estamos en TIMEOUT ' , localStorage.getItem('urlImagen'));
        const usuarioObj = {
          Nombre: nombre,
          Apellido: apellido,
          Fecha: fecha,
          Correo: correo,
          Pass: pass,
          Imagen: localStorage.getItem('urlImagen'),
          Pais: pais
        };
       // http://192.168.1.40:4200/confirmar 
        this._ejemploservicio.agregarUsuario(usuarioObj).subscribe(( resp: any[] ) => {
         // this.usuarios = resp;
           // console.log('METODOOOOOOO');
          // console.log(resp);
        });
        // enviando correo para confirmar

        const htmlEnviar = '<h1> Debe confirmar su cuenta en el siguiente enlace: </h1> <br> <br>' + 'http://192.168.1.40:4200/confirmar ' ;
        console.log(htmlEnviar);
        const usrCorreo = {
          Correo: correo,
          Mensaje: 'Confirme su cuenta',
          Html: htmlEnviar,
          Sub: 'Confirmacion de cuenta GT SALES'
        } 
        this._ejemploservicio.enviarCorreoTest(usrCorreo).subscribe(( resp: any[] ) => {
          // this.usuarios = resp;
            console.log('Respuesta Correo: ');
            console.log(resp);
         });

        
        window.location.reload();
       }, 2000);
    
     this.archivoUno = [];
     localStorage.clear();
    //  this.addusuario();
  }
  recuperacionPass(correo: string){
    const htmlEnviar = '<h1> Ingrese en el siguiente enlace para ingresar una nueva password: </h1> <br> <br>' + 'http://192.168.1.40:4200/recuperacion ' ;
    console.log(htmlEnviar);
    const usrCorreo = {
      Correo: correo,
      Mensaje: 'Ingrese al enlace para reiniciar su Password',
      Html: htmlEnviar,
      Sub: 'Reinicio de Password'
    } 
    console.log('vamos a enviar correo a:', correo);
    
    this._ejemploservicio.enviarCorreoTest(usrCorreo).subscribe(( resp: any[] ) => {
      // this.usuarios = resp;
        console.log('Respuesta Correo: ');
        console.log(resp);
        alert('Correo de recuperacion enviado!');
     });

    
  }

}
