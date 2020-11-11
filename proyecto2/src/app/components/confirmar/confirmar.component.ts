import { Component, OnInit } from '@angular/core';
import { EjemploService } from '../../servicios/ejemplo.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  constructor(private _ejemploservicio:EjemploService, private router:Router) { }

  ngOnInit(): void {
  }

  confirmarCuenta(correo: string){
    const usrObj = {
      Correo: correo
    }
    this._ejemploservicio.confirmarCuenta(usrObj)
    .subscribe(( resp: any[] ) => {
      
    });

    alert('CuentaConfirmada');

  }
}
