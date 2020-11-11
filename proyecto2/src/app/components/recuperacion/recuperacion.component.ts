import { Component, OnInit } from '@angular/core';
import { EjemploService } from '../../servicios/ejemplo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.css']
})
export class RecuperacionComponent implements OnInit {

  constructor(private _ejemploservicio:EjemploService, private router:Router) { 

  }

  ngOnInit(): void {
  }

  reiniciarpass(correo: string, pass: string){
      const usrObj = {
        Correo: correo,
        Pass: pass
      }
      this._ejemploservicio.recuperarPass(usrObj).subscribe((resp: any[])=>{
          console.log(resp);
          alert('Password actualizada!');
      });
  }


}
