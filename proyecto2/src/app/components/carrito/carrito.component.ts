import { Component, OnInit } from '@angular/core';
import { EjemploService } from '../../servicios/ejemplo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html'
})
export class CarritoComponent implements OnInit {

  productosCarrito: any[] = [];
  totalCarrito = 0;
  constructor(private _ejemploservicio: EjemploService, private router: Router) {
    const usuarioID =  sessionStorage.getItem('idUsuario');
    this._ejemploservicio.obtenerCarritoUsuario(usuarioID).subscribe(( resp: any ) => {
        this.productosCarrito = resp;
        // console.log('Carrito: ');
        console.log(this.productosCarrito);
        for (const elemento of this.productosCarrito){
         // console.log(elemento);
          // this.totalCarrito += parseInt(elemento.Precio);

        }

     });
   }

  ngOnInit(): void {
  }

  // metodos
  quitarCarrito(prod: any){
    const usuarioActivo = sessionStorage.getItem('idUsuario');
    const idProductoQuitar = prod.IdProducto;
    console.log('Vamos a eliminar de carrito: ', usuarioActivo, idProductoQuitar);
     // vaciar carrito
    const itemCarrito = {
      IdCliente: parseInt(sessionStorage.getItem('idUsuario')),
      IdProducto: prod.IdProducto
    };
    this._ejemploservicio.vaciarItemCarrito(itemCarrito).subscribe(( resp: any ) => {  });
    window.location.reload();
  }


  calcSubtotal(prod: any, cantidad: number){
     // console.log('Subtotal de: ', cantidad);
      console.log(prod);
      const precioProd = prod.Precio;
      const nuevoSub = precioProd * cantidad;
      console.log('El Subtotal es: ' , nuevoSub);
      const obj = {
        Subtotal: nuevoSub,
        Usuario:  parseInt(sessionStorage.getItem('idUsuario')),
        ProductoId: prod.IdProducto,
        CarritoId: prod.IdCarrito
      };
      this._ejemploservicio.agregarSubtotal(obj).subscribe(( resp: any ) => {
        this.router.navigate(['/carrito']);
       });
      window.location.reload();
     // this.totalCarrito += nuevoSub;
  }

  calcularTotal(){
    this.totalCarrito = 0.00;
    console.log(this.productosCarrito);
    for (const producto of this.productosCarrito){
      console.log('Subtotal: ', producto.Subtotal);
      this.totalCarrito += producto.Subtotal;
    }
    // ver si hay credito
    const creditoUsuario =  parseFloat(sessionStorage.getItem('credito'));
    if (creditoUsuario > this.totalCarrito){

    }else {
      alert('No Cuenta con suficiente credito');
    }
  }
  compraTotal(){

      // hacer el html factura
      let htmlFactura = `<h1>Gracias por comprar en GT SALES </h1>
                        <br>
                        <h4>A continuacion encontrara la factura de su compra</h4>
                        <hr>
                        <h2>Detalle de Compra: </h2>
                        <table>
                          <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Subtotal</th>

                          </tr>

                        `;
      for (const producto of this.productosCarrito){
          htmlFactura += `<tr>
                              <td> ${producto.Nombre}</td>
                              <td> ${producto.Precio}</td>
                              <td> ${producto.Subtotal}</td>`;
      }

      htmlFactura += `</table>
      <br> <br>
      <h2>Total de Compra: ${this.totalCarrito}</h2>`;
      // console.log(htmlFactura);

      // insertar en venta
      for (const producto of this.productosCarrito){
        console.log(producto);
        const cant = producto.Subtotal / parseInt(producto.Precio);
        const objVenta = {
           idProducto: producto.IdProducto,
           idPropietario: producto.IdPropietario,
           cantidad: cant
        };
       // console.log(objVenta);
        this._ejemploservicio.insertarVenta(objVenta).subscribe(( resp: any ) => {   });

        // SUMAR CREDITOS AQUI
        const sumObj = {
          IdCliente: producto.IdPropietario,
          Ganancia: producto.Subtotal
        };
        console.log('Sumando creditos');
        console.log(sumObj);
        this._ejemploservicio.creditoMas(sumObj).subscribe(( resp: any ) => {

        });


        // enviar correo a vendedor que se le vendio 1 producto y cantidad
        console.log('correo de vendedor a enviar: ', producto.CorreoPropietario);

        // armar correo para enviarlo a vendedor
        const htmlVendedor = `<h1>Se ha vendido uno de sus productos </h1>
                        <br>
                        <h4>A continuacion encontrara el detalle de la venta</h4>
                        <hr>
                        <h2>Detalle de Venta: </h2>
                        <table>
                          <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Ganancia</th>

                          </tr>
                          <tr>
                            <td WIDTH="200">
                              ${producto.Nombre}
                              <img src="${producto.Imagen}" style="max-width:100%;width:auto;height:auto;">
                            </td>
                            <td>${cant}</td>
                            <td>${producto.Subtotal}</td>

                          </tr>
                          </table>
                          <br>
                          <h3>Su credito ha sido actualizado!</h3>
                          <br>
                          <h4>Gracias por confiar en GTSALES!</h4>
                        `;

          // enviar correo a vendedor
        const correoObjVendedor = {
            Correo: producto.CorreoPropietario,
            Mensaje: 'Detalle de Venta',
            Html: htmlVendedor,
            Sub: 'Se ha vendido uno de sus productos'
          };
        this._ejemploservicio.enviarCorreoTest(correoObjVendedor).subscribe(( resp: any[] ) => {
            // this.usuarios = resp;
              console.log('Respuesta Correo: ');
              console.log(resp);
           });
        const date: Date = new Date();
        const bitObj = {
            correo: producto.CorreoPropietario,
            descripcion: 'Se ha vendido un producto de este usuario',
            fecha: date.toLocaleDateString()
          };
        console.log('enviando a bitacora: ');
        console.log(bitObj);
        this._ejemploservicio.insertarBitacora(bitObj).subscribe(( resp: any[] ) => {
           // this.usuarios = resp;

        });
      }


      // descontar creditos
      const descontando = this.totalCarrito * 1;
      const descObj = {
        IdCliente: parseInt(sessionStorage.getItem('idUsuario')),
        Ganancia: descontando
      };
      this._ejemploservicio.creditoMenosTres(descObj).subscribe(( resp: any ) => {  });

      // Enviar Correo Factura
      const correoObj = {
        Correo: sessionStorage.getItem('correo'),
        Mensaje: 'Factura Compra',
        Html: htmlFactura,
        Sub: 'Factura de Su Compra'
      };

      this._ejemploservicio.enviarCorreoTest(correoObj).subscribe(( resp: any[] ) => {
        // this.usuarios = resp;
          console.log('Respuesta Correo: ');
          console.log(resp);
       });

       // bitacora que compro
      const date: Date = new Date();
      const bitObj = {
            correo: sessionStorage.getItem('correo'),
            descripcion: 'Este usuario ha hecho una compra',
            fecha: date.toLocaleDateString()
          };
      console.log('enviando a bitacora: ');
      console.log(bitObj);
      this._ejemploservicio.insertarBitacora(bitObj).subscribe(( resp: any[] ) => {
           // this.usuarios = resp;

        });

      console.log('Descontando: ');
      console.log(descObj);

      // vaciar carrito
      const idVaciarCarrito = {
        IdCliente: parseInt(sessionStorage.getItem('idUsuario')),

      };
      this._ejemploservicio.vaciarCarrito(idVaciarCarrito).subscribe(( resp: any ) => {
          console.log(resp);
       });
      setTimeout(() => {
        console.log('aqui se recargaria la pagina');
        alert('Compra Procesada con exito');
         // this.router.navigate(['/carrito']);
        window.location.reload();
       }, 8000);
      // window.location.reload();

  }
}
