import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-producto-tarjeta',
  templateUrl: './producto-tarjeta.component.html'
})
export class ProductoTarjetaComponent implements OnInit {
  prodSel:any = {};
  
  constructor() {
    this.prodSel = JSON.parse(localStorage.getItem('productoSel'));
    console.log(this.prodSel);
   }

  ngOnInit(): void {
  }

}
