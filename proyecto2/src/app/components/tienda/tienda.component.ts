import { Component, OnInit } from '@angular/core';
import { EjemploService } from '../../servicios/ejemplo.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html'
})
export class TiendaComponent implements OnInit {
  productos: any[] = [];

  constructor(private _ejemploservicio:EjemploService, private router:Router) { 
    if(sessionStorage.getItem('conectado') == '0'){
      alert('Debe Iniciar sesion para ver la tienda');
      this.router.navigate(['/home']);
    }else{
      this._ejemploservicio.obtenerProductosTienda()
      .subscribe(( resp: any[] ) => {
        this.productos = resp;
        console.log('Productos');
        console.log(resp);
      });
    }
    
  }
  
  ngOnInit(): void {
  }

  verProducto(prod: any){
    // console.log(prod);
    localStorage.setItem('productoSel', JSON.stringify(prod));
     this.router.navigate(['/productodetailtienda']);
  }

  ordenCategoria(){
    this._ejemploservicio.obtenerProductosTiendaCat()
      .subscribe(( resp: any[] ) => {
        this.productos = resp;
        console.log('Productos');
        console.log(resp);
      });
  }
  ordenPrecioAsc(){
    this._ejemploservicio.obtenerProductosTiendaPrecioAsc()
    .subscribe(( resp: any[] ) => {
      this.productos = resp;
      console.log('Productos');
      console.log(resp);
    });
  }
  ordenPrecioDesc(){
    this._ejemploservicio.obtenerProductosTiendaPrecioDesc()
    .subscribe(( resp: any[] ) => {
      this.productos = resp;
      console.log('Productos');
      console.log(resp);
    });
  }
  quitarFiltro(){
    this._ejemploservicio.obtenerProductosTienda()
    .subscribe(( resp: any[] ) => {
      this.productos = resp;
      console.log('Productos');
      console.log(resp);
    });
  }
  buscarProducto(texto: string){
    console.log('Vamos a buscar: ', texto);
    const objPalabra = {
      Palabras: texto
    }
    this._ejemploservicio.obtenerProductosTiendaPalabras(objPalabra)
    .subscribe(( resp: any[] ) => {
      this.productos = resp;
      // console.log('Productos');
      // console.log(resp);
    });

  }

}
