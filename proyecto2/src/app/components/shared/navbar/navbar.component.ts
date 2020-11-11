import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  showV = true;

  constructor( private router:Router ) { 
    if(sessionStorage.getItem('conectado') == '1'){
      this.showV = true;

    }else{
      this.showV = false;
    }
  }

  ngOnInit(): void {
  }

  buscarHeroe(termino:string){
    this.router.navigate( ['buscar', termino] );
  }
  cerrarSesion(){
    // alert('Vamos a cerrar sesion');
    sessionStorage.clear();
    sessionStorage.setItem('conectado', '0');
    this.router.navigate(['/home']);
  }
}
