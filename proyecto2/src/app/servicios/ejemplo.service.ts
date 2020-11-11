import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjemploService {

  constructor(private http: HttpClient) {
   // this.cargarUsuarios();
  }

  usuarios: any[] = [];

   
    
    verUsuarios(){
      console.log('retornando datos usuario')
      return this.http.get('http://192.168.1.40:4201/getUsers');
    }

    agregarUsuario(usuario: any): Observable<any>{
      // console.log(usuarioObjeto.Imagen);
      //console.log('ENVIANDO A API');
      //console.log(usuario);
      return this.http.post('http://192.168.1.40:4201/insertarUsuario', usuario);
      
    }

    obtenerNombres(){
      console.log('Estamos en servicio Obtener Nombres');
      return this.http.get('http://192.168.1.40:4201/obtenerNombres');
    }
    iniciarSesion(usuario: any){
      // console.log('estamos en servicio');
      return this.http.post('http://192.168.1.40:4201/login', usuario);
    }
    obtenerProductoID(id: string){ // todos los productos de 1 usuario
      console.log('Usuario productos: ',id);
      const idObj = {
        idUsuario: id
      }
      return this.http.post('http://192.168.1.40:4201/getProductoID', idObj);
    }
    obtenerProductosTienda(){
      return this.http.get('http://192.168.1.40:4201/getProductoTienda');
    }
    obtenerProductosTiendaCat(){
      return this.http.get('http://192.168.1.40:4201/getProductoTiendaCat');
    }
    // getProductoTiendaPrecioAsc
    obtenerProductosTiendaPrecioAsc(){
      return this.http.get('http://192.168.1.40:4201/getProductoTiendaPrecioAsc');
    }
    obtenerProductosTiendaPrecioDesc(){
      return this.http.get('http://192.168.1.40:4201/getProductoTiendaPrecioDesc');
    }
    obtenerProductosTiendaPalabras(obj:any){
      return this.http.post('http://192.168.1.40:4201/getProductoTiendaPalabras', obj);
    }
    agregarProducto(producto: any){
      return this.http.post('http://192.168.1.40:4201/insertarProducto', producto);
    }
    agregarComentario(comentario: any){
      return this.http.post('http://192.168.1.40:4201/insertarComentario', comentario);
    }
    agregarDenuncia(denuncia: any){
      return this.http.post('http://192.168.1.40:4201/insertarDenuncia', denuncia);
    }
    obtenerComentarioID(id: number){
      console.log('id producto: ',id);
      const idObj = {
        idProducto: id
      }
      return this.http.post('http://192.168.1.40:4201/getComentarioID', idObj);
    }
    megusta(obj: any){
     // console.log('ME GUSTA: ');
     // console.log(obj);
      return this.http.post('http://192.168.1.40:4201/megusta', obj);
    }
    nomegusta(obj: any){
      return this.http.post('http://192.168.1.40:4201/nomegusta', obj);
    }
    agregarCarrito(carrito: any){
      return this.http.post('http://192.168.1.40:4201/insertarCarrito', carrito);
    }
    obtenerCarritoUsuario(idUsuario: string){
        const idObj = {
          idCliente: idUsuario
        }
        return this.http.post('http://192.168.1.40:4201/getCarritoUsuario', idObj);
    }
    agregarSubtotal(obj: any){
      return this.http.post('http://192.168.1.40:4201/agregarSubtotal', obj);
    }
    enviarCorreoTest(obj: any){
      return this.http.post('http://192.168.1.40:4201/enviarCorreo', obj);
    }
    obtenerCategorias(){
      return this.http.get('http://192.168.1.40:4201/getCategorias');
    }
    agregarCategoria(obj: any){
      return this.http.post('http://192.168.1.40:4201/agregarCategoria', obj);
    }

    obtenerDenuncias(){
      return this.http.get('http://192.168.1.40:4201/getDenuncias');
    }

    bloquearProducto(obj: any){
      return this.http.post('http://192.168.1.40:4201/bloquearProducto', obj);
    }
    confirmarCuenta(obj: any){
      return this.http.post('http://192.168.1.40:4201/confirmarCuenta', obj);
    }
    creditoMas(obj: any){
      return this.http.post('http://192.168.1.40:4201/actualizarCreditoMas', obj);
    }
    // tslint:disable-next-line:typedef
    creditoMenos(obj: any){
      return this.http.post('http://192.168.1.40:4201/actualizarCreditoMenos', obj);
    }
    // tslint:disable-next-line: typedef
    creditoMenosDos(obj: any){
      return this.http.post('http://192.168.1.40:4201/actualizarCreditoMenosDos', obj);
    }
    creditoMenosTres(obj: any){
      return this.http.post('http://192.168.1.40:4201/actualizarCreditoMenosTres', obj);
    }
    insertarVenta(obj: any){
      return this.http.post('http://192.168.1.40:4201/insertarVenta', obj);
    }
    vaciarCarrito(obj: any){
      return this.http.post('http://192.168.1.40:4201/vaciarCarrito', obj);
    }
    vaciarItemCarrito(obj: any){
      return this.http.post('http://192.168.1.40:4201/vaciarItemCarrito', obj);
    }
    insertarSalaChat(obj: any){
      return this.http.post('http://192.168.1.40:4201/insertarSalachat', obj);
    }
    obtenerSalaChat(obj: any){
      return this.http.post('http://192.168.1.40:4201/getSalaChat', obj);
    }
    obtenerSalasVendedor(obj: any){
      return this.http.post('http://192.168.1.40:4201/getSalasVendedor', obj);
    }
    recuperarPass(obj: any){
      return this.http.post('http://192.168.1.40:4201/recuperarPass', obj);
    }
    obtenerUsuarioTotal(obj: any){
      return this.http.post('http://192.168.1.40:4201/getUsuarioTotal', obj);
    }
    actualizarDatos(obj: any){
      return this.http.post('http://192.168.1.40:4201/actualizarDatosUsuario', obj);
    }
    consultaUno(){
      return this.http.get('http://192.168.1.40:4201/consultaUno');
    }
    reporteDos(){
      return this.http.get('http://192.168.1.40:4201/reporteDos');
    }
    reporteTres(){
      return this.http.get('http://192.168.1.40:4201/reporteTres');
    }
    reporteCuatroUno(){
      return this.http.get('http://192.168.1.40:4201/reporteCuatroUno');
    }
    reporteCuatroDos(){
      return this.http.get('http://192.168.1.40:4201/reporteCuatroDos');
    }
    reporteCinco(){
      return this.http.get('http://192.168.1.40:4201/reporteCinco');
    }
    reporteSeis(){
      return this.http.get('http://192.168.1.40:4201/reporteSeis');
    }
    reporteSiete(){
      return this.http.get('http://192.168.1.40:4201/reporteSiete');
    }
    insertarBitacora(obj: any){
      return this.http.post('http://192.168.1.40:4201/insertarBitacora', obj);
    }
    obtenerBitacora(){
      return this.http.get('http://192.168.1.40:4201/getBitacora');
    }
}
