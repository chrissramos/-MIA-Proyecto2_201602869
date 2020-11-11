import { Component, OnInit } from '@angular/core';
import { EjemploService } from '../../servicios/ejemplo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-producto-tarjeta-tienda',
  templateUrl: './producto-tarjeta-tienda.component.html'
})
export class ProductoTarjetaTiendaComponent implements OnInit {

  prodSel: any = {};
  comentarios: any[] = [];
  megustaVar = false;
  nomegustaVar = true;

  salaChatArr: any[] = [];
  // para el chat
  iniciarSalaBandera = false;
  idSalaChatEnviar = 'a';

  public chats: Observable<any[]>;

  constructor(private _ejemploservicio: EjemploService, firestore: AngularFirestore) {
    // chats
    this.chats = firestore.collection('chats').valueChanges();

    this.prodSel = JSON.parse(localStorage.getItem('productoSel'));
    console.log('viendo el producto: ');
    console.log(this.prodSel);
    // traer producto
    
     // traer comentarios
    this._ejemploservicio.obtenerComentarioID(this.prodSel.Id)
    .subscribe(( resp: any[] ) => {
      this.comentarios = resp;
      console.log('Comentarios: ');
      console.log(resp);
    });
   }

  ngOnInit(): void {
   /* this._webSocketService.listen('test event').subscribe((data)=> {
        console.log(data);
    });*/
  }

  agregarComentario(comentario: string){
    const date: Date = new Date();
    console.log('Date = ' + date);
    const comentarioObj = {
      Comentario: comentario,
      Fecha: date.toLocaleDateString(),
      ProductoId: this.prodSel.Id,
      UsuarioId: sessionStorage.getItem('idUsuario')
    };
    console.log(comentarioObj);
    this._ejemploservicio.agregarComentario(comentarioObj).subscribe(( resp: any[] ) => {
      // this.usuarios = resp;
        // console.log('METODOOOOOOO');
       // console.log(resp);
       alert('Su Comentario ha sido agregado');
       window.location.reload();
     });

    const bitObj = {
        correo: sessionStorage.getItem('correo'),
        descripcion: 'Usuario hizo un comentario en el producto: ' + this.prodSel.Nombre,
        fecha: date.toLocaleDateString()
      };
    console.log('enviando a bitacora: ');
    console.log(bitObj);
    this._ejemploservicio.insertarBitacora(bitObj).subscribe(( resp: any[] ) => {
       // this.usuarios = resp;

    });
  }
  agregarDenuncia( denuncia: string){
    const date: Date = new Date();
    console.log('Date = ' + date);
    const comentarioObj = {
      Comentario: denuncia,
      Fecha: date.toLocaleDateString(),
      ProductoId: this.prodSel.Id,
      UsuarioId: sessionStorage.getItem('idUsuario')
    };
    console.log(comentarioObj);
    this._ejemploservicio.agregarDenuncia(comentarioObj).subscribe(( resp: any[] ) => {
      // this.usuarios = resp;
        // console.log('METODOOOOOOO');
       // console.log(resp);
       alert('Su Denuncia ha sido enviada al Administrador');
       window.location.reload();
     });
    const bitObj = {
        correo: sessionStorage.getItem('correo'),
        descripcion: 'Usuario hizo una Denuncia en el producto: ' + this.prodSel.Nombre,
        fecha: date.toLocaleDateString()
      };
    console.log('enviando a bitacora: ');
    console.log(bitObj);
    this._ejemploservicio.insertarBitacora(bitObj).subscribe(( resp: any[] ) => {
       // this.usuarios = resp;

    });
  }
  megusta(){
    const date: Date = new Date();
    const megustaObj = {
      ProductoId: this.prodSel.Id,
      UsuarioId: sessionStorage.getItem('idUsuario')
    };
    this._ejemploservicio.megusta(megustaObj).subscribe(( resp: any ) => {

        console.log(resp.msg);
        if (resp.msg === 'Existe'){
            alert('Ya le ha dado Me gusta a este producto');
        }else{
          // console.log('LE DIO MEGUSTA AL PRODUCTO');
          this.prodSel.Producto_megusta  += 1;
          console.log('Nuevo Producto Sel : ');
          console.log(this.prodSel);
          localStorage.setItem('productoSel', JSON.stringify(this.prodSel));
         //  window.location.reload();
        }


     });

    const bitObj = {
        correo: sessionStorage.getItem('correo'),
        descripcion: 'Usuario le dio like a producto: ' + this.prodSel.Nombre,
        fecha: date.toLocaleDateString()
      };
    console.log('enviando a bitacora: ');
    console.log(bitObj);
    this._ejemploservicio.insertarBitacora(bitObj).subscribe(( resp: any[] ) => {
       // this.usuarios = resp;

    });
  }
  nomegusta(){
    const date: Date = new Date();
    const nomegustaObj = {
      ProductoId: this.prodSel.Id,
      UsuarioId: sessionStorage.getItem('idUsuario')
    };
    this._ejemploservicio.nomegusta(nomegustaObj).subscribe(( resp: any ) => {

        console.log(resp.msg);
        if (resp.msg === 'Existe'){
            alert('Ya le ha dado NO Me gusta a este producto');
        }else{
          // console.log('LE DIO MEGUSTA AL PRODUCTO');
          this.prodSel.Producto_nomegusta  += 1;
          console.log('Nuevo Producto Sel : ');
          console.log(this.prodSel);
          localStorage.setItem('productoSel', JSON.stringify(this.prodSel));
         //  window.location.reload();
        }


     });
    const bitObj = {
        correo: sessionStorage.getItem('correo'),
        descripcion: 'Usuario le dio No me gusta a producto: ' + this.prodSel.Nombre,
        fecha: date.toLocaleDateString()
      };
    console.log('enviando a bitacora: ');
    console.log(bitObj);
    this._ejemploservicio.insertarBitacora(bitObj).subscribe(( resp: any[] ) => {
       // this.usuarios = resp;

    });
  }

  agregarCarrito(){
    const date: Date = new Date();
    const carritoObj = {
      ProductoId: this.prodSel.Id,
      UsuarioId: sessionStorage.getItem('idUsuario')
    };
    console.log(carritoObj);
    this._ejemploservicio.agregarCarrito(carritoObj).subscribe(( resp: any[] ) => {

      // this.usuarios = resp;
        // console.log('METODOOOOOOO');
       // console.log(resp);
     });
    
    const bitObj = {
        correo: sessionStorage.getItem('correo'),
        descripcion: 'Usuario agrego a carrito el producto: ' + this.prodSel.Nombre,
        fecha: date.toLocaleDateString()
      };
    console.log('enviando a bitacora: ');
    console.log(bitObj);
    this._ejemploservicio.insertarBitacora(bitObj).subscribe(( resp: any[] ) => {
       // this.usuarios = resp;
      console.log(resp);
      alert('Producto agregado a carrito');
      window.location.reload();
    });
  }

  iniciarSalaChat(){
    // idPropietario
    // idcliente = sessionstorage
    const idProp = this.prodSel.IdClientePrueba;
    const idCliente = sessionStorage.getItem('idUsuario');
    const idSala = idProp + idCliente;
    this.idSalaChatEnviar = idSala;
    console.log('Sala chat enviar = ', this.idSalaChatEnviar);
    const nombreU = sessionStorage.getItem('nombre') + sessionStorage.getItem('apellido');
    const salaObj = {
      IdVendedor: idProp,
      IdComprador: idCliente,
      IdSala: idSala,
      Foto: sessionStorage.getItem('imagen'),
      Nombre: nombreU
    };
    // console.log(salaObj);

    this._ejemploservicio.insertarSalaChat(salaObj).subscribe(( resp: any[] ) => {
     // console.log('inserto en bd');
      // this.iniciarSalaBandera = true;

    });

    // traer idSala
    const objTraerSala = {
      IdSala: parseInt(idSala)
    };

    // traer la sala

    this._ejemploservicio.obtenerSalaChat(objTraerSala).subscribe(( resp: any[] ) => {
      // this.iniciarSalaBandera = true;
      console.log('OBTENIENDO SALA: ');
      this.salaChatArr = resp;
      console.log(this.salaChatArr);
      setTimeout(() => {
        this.iniciarSalaBandera = true;
      }, 3500);
  });


  }

}
