import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { EjemploService } from '../../servicios/ejemplo.service';
import { FileItem } from '../../models/file-items';
import { CargaImagenesFireService} from '../../servicios/carga-imagenes-fire.service';
import {Router} from '@angular/router';


interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-panelu',
  templateUrl: './panelu.component.html'
})
export class PaneluComponent implements OnInit {
  usuarioID = '';
  usuarioNombre = '';
  usuarioFoto = '';
  usuarioApellido = '';
  usuarioFecha = '';
  usuarioCorreo = '';
  usuarioPais = '';
  usuarioCredito = '';

  productos: any[] = [];
  productoUno: FileItem[] = [];
  categorias: any[] = [];
  usuarioActual: any[] = [];

  fotoNueva: FileItem[] = [];

  constructor(private _ejemploservicio: EjemploService, private router: Router,
              public _cargaImagenesFireService: CargaImagenesFireService) {

    this.usuarioID = sessionStorage.getItem('idUsuario');
    // alert(sessionStorage.getItem('idUsuario'));
    /*this.usuarioNombre = sessionStorage.getItem('nombre');
    this.usuarioFoto = sessionStorage.getItem('imagen');
    this.usuarioApellido = sessionStorage.getItem('apellido');
    this.usuarioFecha = sessionStorage.getItem('fecha');
    this.usuarioCorreo = sessionStorage.getItem('correo');
    this.usuarioPais = sessionStorage.getItem('pais');
    this.usuarioCredito = sessionStorage.getItem('credito');*/

    // traer todo el usuario

    const usuarioObj = {
      IdUsuario: this.usuarioID
    };

    this._ejemploservicio.obtenerUsuarioTotal(usuarioObj)
    .subscribe(( resp: any[] ) => {
      this.usuarioActual = resp;
      console.log(this.usuarioActual);
      // llenar de nuevo sessionStorage

      sessionStorage.setItem('nombre', resp[0].Nombre + ' ');
      sessionStorage.setItem('apellido', resp[0].Apellido);
      sessionStorage.setItem('fecha', resp[0].Fecha);
      sessionStorage.setItem('correo', resp[0].Correo);
      sessionStorage.setItem('imagen', resp[0].Imagen);
      sessionStorage.setItem('pais', resp[0].Pais);
      sessionStorage.setItem('credito', resp[0].Credito);
     // sessionStorage.setItem('conectado', '1');
      this.usuarioNombre = sessionStorage.getItem('nombre');
      this.usuarioFoto = sessionStorage.getItem('imagen');
      this.usuarioApellido = sessionStorage.getItem('apellido');
      this.usuarioFecha = sessionStorage.getItem('fecha');
      this.usuarioCorreo = sessionStorage.getItem('correo');
      this.usuarioPais = sessionStorage.getItem('pais');
      this.usuarioCredito = sessionStorage.getItem('credito');


      //

    });

    // traer productos
    this._ejemploservicio.obtenerProductoID(this.usuarioID)
    .subscribe(( resp: any[] ) => {
      this.productos = resp;
      // console.log('Productos');
      // console.log(resp);
    });

    this._ejemploservicio.obtenerCategorias().subscribe(( resp: any[] ) => {
      this.categorias = resp;
      // console.log(this.categorias);
    });

  }

  ngOnInit(): void {

  }
  cerrarSesion(){
    // alert('Vamos a cerrar sesion');
    sessionStorage.clear();
    sessionStorage.setItem('conectado', '0');
    this.router.navigate(['/home']);
  }
  subirFotoSeleccionada(event: HtmlInputEvent): void{
    if (event.target.files && event.target.files[0] ){
        // aqui es un objeto
        this.extraerDeObjeto(event.target.files);
    }
  }
  subirFotoSeleccionadaDos(event: HtmlInputEvent): void{
    if (event.target.files && event.target.files[0] ){
        // aqui es un objeto
        this.extraerDeObjetoDos(event.target.files);
    }
  }
  extraerDeObjetoDos(archivosLista: FileList ){

    // tslint:disable-next-line:forin
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista ) ){
          const archivoTemporal = archivosLista[propiedad];
          // tslint:disable-next-line:no-trailing-whitespace
          
          const nuevoArchivo = new FileItem( archivoTemporal );
          this.fotoNueva.push(nuevoArchivo);
    }

  }
  extraerDeObjeto(archivosLista: FileList ){

    // tslint:disable-next-line:forin
    for ( const propiedad in Object.getOwnPropertyNames( archivosLista ) ){
          const archivoTemporal = archivosLista[propiedad];
          // tslint:disable-next-line:no-trailing-whitespace
          
          const nuevoArchivo = new FileItem( archivoTemporal );
          this.productoUno.push(nuevoArchivo);
    }

  }

  verProducto(prod: any){
    // console.log(prod);
    localStorage.setItem('productoSel', JSON.stringify(prod));
    this.router.navigate(['/productodetail']);
  }

  enviarCorreoTest(){

    /*const htmlEnviar = '<h1>Bienvenido: </h1>' + this.usuarioNombre + '<br> <br> <img src = \" ' + this.usuarioFoto + ' \">' ;
    console.log(htmlEnviar);
    const usuarioObj = {
      Correo: this.usuarioCorreo,
      Mensaje: 'Bienvenido a GT SALES',
      Html: htmlEnviar,
      Sub: 'Bienvenido A GT SALEEES'
    }
    this._ejemploservicio.enviarCorreoTest(usuarioObj).subscribe(( resp: any[] ) => {
      // this.usuarios = resp;
        console.log('Respuesta Correo: ');
        console.log(resp);
     });*/
     window.location.reload();
  }
  registrarProducto(nombreP: string, descripcionP: string, precioP: string, palabrasP: string, categ: string){

    localStorage.clear();
    this._cargaImagenesFireService.cargarImagenesFirebase(this.productoUno);
    setTimeout(() => {
      const productoObj = {
        IdUsuario: this.usuarioID,
        NombreProducto: nombreP,
        DescripcionProducto: descripcionP,
        PrecioProducto: precioP,
        Imagen: localStorage.getItem('urlImagen'),
        PalabrasProducto: palabrasP,
        Categoria: categ,
        Pais: this.usuarioPais
      };
      this._ejemploservicio.agregarProducto(productoObj).subscribe(( resp: any[] ) => {
        // this.usuarios = resp;
          // console.log('METODOOOOOOO');
         // console.log(resp);
       });
      window.location.reload();
     }, 2000);
  }
  actualizarUsuario(nombre: string, apellido: string, pais: string, fecha: string){
    // console.log(this.fotoNueva.length);
    if (this.fotoNueva.length === 0){
        console.log('no actualizara foto');
        // localStorage.clear();

       // this._cargaImagenesFireService.cargarImagenesFirebase(this.fotoNueva);
        setTimeout(() => {
      const usrUpdate = {
        Nombre: nombre,
        Apellido: apellido,
        Pais: pais,
        Fecha: fecha,
        Imagen: this.usuarioFoto,
        Correo: this.usuarioCorreo
      };
      console.log('UPDATE:');
      console.log(usrUpdate);
      this._ejemploservicio.actualizarDatos(usrUpdate).subscribe(( resp: any[] ) => {

         // console.log(resp);
       });
      window.location.reload();
     }, 2000); 


    }
    else{
      console.log('SI actualizara foto');
      localStorage.clear();

      this._cargaImagenesFireService.cargarImagenesFirebase(this.fotoNueva);
      setTimeout(() => {
      const usrUpdate = {
        Nombre: nombre,
        Apellido: apellido,
        Pais: pais,
        Fecha: fecha,
        Imagen: localStorage.getItem('urlImagen'),
        Correo: this.usuarioCorreo
      };
      console.log('UPDATE:');
      console.log(usrUpdate);
      this._ejemploservicio.actualizarDatos(usrUpdate).subscribe(( resp: any[] ) => {

         // console.log(resp);
       });
      window.location.reload();
     }, 2000);

    }

  }
  actualizarPass(nuevaPass: string){
      const usrObj = {
        Correo: sessionStorage.getItem('correo'),
        Pass: nuevaPass
      };
      this._ejemploservicio.recuperarPass(usrObj).subscribe(( resp: any[] ) => {
        // this.usuarios = resp;
          console.log('Respuesta Correo: ');
          console.log(resp);
          alert('Pass ha sido actualizada!');
       });
  }
}
