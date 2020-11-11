import { Component, OnInit } from '@angular/core';
import { EjemploService } from '../../servicios/ejemplo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-michat',
  templateUrl: './michat.component.html',
  styleUrls: ['./michat.component.css']
})
export class MichatComponent implements OnInit {

  // variables
  idSalaChatEnviar= 'a';
  iniciarSalaBandera = false;
  banderaUnaSala = false;
  salasMias: any[] = [];
  public chats: Observable<any[]>;
  constructor(firestore: AngularFirestore,private _ejemploservicio:EjemploService) {
    this.chats = firestore.collection('chats').valueChanges();

   
    

  }
  ngOnInit(): void {
     // traer mis salas
    
  }

  traerSalas(){
    const vendedorSalaObj = {
      IdVendedor: sessionStorage.getItem('idUsuario') 
    }
    console.log('MICHAT sala a solicitar:');
    console.log(vendedorSalaObj);
    this._ejemploservicio.obtenerSalasVendedor(vendedorSalaObj).subscribe((resp: any[])=>{
      this.salasMias = resp;
      console.log('Mis salas:');
      console.log(this.salasMias);
      setTimeout(()=>{
        this.iniciarSalaBandera = true;
      }, 1000);
     });
  }
  cargarSalaChat(idSala: string){
    this.banderaUnaSala = false;
    console.log('En boton abrira sala:', idSala);
    this.idSalaChatEnviar = idSala.toString();
    console.log('Id para enviarrr:', this.idSalaChatEnviar);
    setTimeout(()=>{
      this.banderaUnaSala = true;
    }, 2500);
  }

}
