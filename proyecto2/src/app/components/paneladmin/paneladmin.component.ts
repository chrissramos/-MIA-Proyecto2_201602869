import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { EjemploService } from '../../servicios/ejemplo.service';

@Component({
  selector: 'app-paneladmin',
  templateUrl: './paneladmin.component.html',
  styleUrls: ['./paneladmin.component.css']
})
export class PaneladminComponent implements OnInit {

  categorias: any[] = [];
  denuncias: any[] = [];
  reporteUno: any[] =[];
  reporteDos: any[] = [];
  reporteTres: any[] = [];
  reporteCuatroUno: any[] = [];
  reporteCuatroDos: any[] = [];
  reporteCinco: any[] = [];
  reporteSeis: any[] = [];
  reporteSiete: any[] = [];
  reporteBitacora: any[] = [];

  constructor(private _ejemploservicio:EjemploService, private router:Router) {
    // categorias  

    
      if(sessionStorage.getItem('correo') == 'admin@gmail.com'){
          // categorias
          this._ejemploservicio.obtenerCategorias().subscribe(( resp: any[] ) => {
            this.categorias = resp;
            // console.log(this.categorias);
          });
    
          // denuncias
          this._ejemploservicio.obtenerDenuncias().subscribe(( resp: any[] ) => {
            this.denuncias = resp;
            console.log(this.denuncias);
          });

          // REPORTES
          
          // consulta 1
          this._ejemploservicio.consultaUno().subscribe(( resp: any[] ) => {
            this.reporteUno = resp;
            console.log(this.reporteUno);
          });

          // reporte 2
          this._ejemploservicio.reporteDos().subscribe(( resp: any[] ) => {
            this.reporteDos = resp;
            // console.log(this.reporteUno);
          });

          // reporte 3
          this._ejemploservicio.reporteTres().subscribe(( resp: any[] ) => {
            this.reporteTres = resp;
            // console.log(this.reporteUno);
          });
          // reporte 4
          this._ejemploservicio.reporteCuatroUno().subscribe(( resp: any[] ) => {
            this.reporteCuatroUno = resp;
            // console.log(this.reporteUno);
          });
          this._ejemploservicio.reporteCuatroDos().subscribe(( resp: any[] ) => {
            this.reporteCuatroDos = resp;
            // console.log(this.reporteUno);
          });
          
          // reporte 5
          this._ejemploservicio.reporteCinco().subscribe(( resp: any[] ) => {
            this.reporteCinco = resp;
            // console.log(this.reporteUno);
          });
          // reporte 6
          this._ejemploservicio.reporteSeis().subscribe(( resp: any[] ) => {
            this.reporteSeis = resp;
            // console.log(this.reporteUno);
          });
          // reporte 7
          this._ejemploservicio.reporteSiete().subscribe(( resp: any[] ) => {
            this.reporteSiete = resp;
            // console.log(this.reporteUno);
          });
          // reporte Bitacora
          this._ejemploservicio.obtenerBitacora().subscribe(( resp: any[] ) => {
            this.reporteBitacora = resp;
            // console.log(this.reporteUno);
          });

    }else{
      alert('Este apartado es solo para el administrador');
      this.router.navigate(['/panelu']);
    }
    
    /*this._ejemploservicio.obtenerCategorias().subscribe(( resp: any[] ) => {
        this.categorias = resp;
        // console.log(this.categorias);
      });

      // denuncias
    this._ejemploservicio.obtenerDenuncias().subscribe(( resp: any[] ) => {
        this.denuncias = resp;
        console.log(this.denuncias);
      });*/
  }

  ngOnInit(): void {
    
  }
  cerrarSesion(){
    // alert('Vamos a cerrar sesion');
    window.location.reload();
  }
  agregarCategoria(cat: string){
    console.log('Agregando categoria: ', cat);
    const catObj = {
      Categoria: cat
    }
    this._ejemploservicio.agregarCategoria(catObj).subscribe(( resp: any[] ) => {   
      
    });
    window.location.reload();

  }

  bloquearProducto(productoBloq: any){
    console.log(productoBloq);
    console.log('enviando correo a:', productoBloq.CorreoPropietario);

    // enviar correo al propietario 
    const htmlEnviar = '<h1>Se ha bloqueado su producto debido a una denuncia: </h1> <h3>' +  productoBloq.NombreProducto  + '</h3><br> <br> <img src = \" ' +  productoBloq.ImagenProducto + ' \">  <br> <br>  <h3>Por lo tanto ya no aparecera en la tienda </h3> <br> <br>  <h4>Att. Administrador de GT SALES </h4>' ;
    console.log(htmlEnviar);
    const usuarioObj = {
      Correo: productoBloq.CorreoPropietario,
      Mensaje: 'Producto Bloqueado',
      Html: htmlEnviar,
      Sub: 'Bloqueo de Producto'
    }
    this._ejemploservicio.enviarCorreoTest(usuarioObj).subscribe(( resp: any[] ) => {
      // this.usuarios = resp;
        console.log('Respuesta Correo: ');
        console.log(resp);
     });
    // setear el estado del producto
    
    const productoObj = {
      idProducto: productoBloq.IdProducto
    }
    
    this._ejemploservicio.bloquearProducto(productoObj).subscribe(( resp: any[] ) => {
      // this.usuarios = resp;
        
     });
    let date: Date = new Date();
    const bitObj = {
       correo: 'admin@gmail.com',
       descripcion: 'Administrador bloqueo el producto: ' + productoBloq.NombreProducto,
       fecha: date.toLocaleDateString()
     };
     this._ejemploservicio.insertarBitacora(bitObj).subscribe(( resp: any[] ) => {
      // this.usuarios = resp;
        
     });

  }
}
