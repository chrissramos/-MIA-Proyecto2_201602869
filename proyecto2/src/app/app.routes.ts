import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {HeroesComponent} from './components/heroes/heroes.component';
import {HeroeComponent} from './components/heroe/heroe.component';
import {BuscadorComponent} from './components/buscador/buscador.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { PaneluComponent } from './components/panelu/panelu.component';
import { ProductoTarjetaComponent } from './components/producto-tarjeta/producto-tarjeta.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ProductoTarjetaTiendaComponent } from './components/producto-tarjeta-tienda/producto-tarjeta-tienda.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import {  PaneladminComponent } from './components/paneladmin/paneladmin.component';
import { DenunciasComponent } from './components/denuncias/denuncias.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import {  ReportesComponent } from './components/reportes/reportes.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { MichatComponent } from './components/michat/michat.component';

import { RecuperacionComponent } from './components/recuperacion/recuperacion.component';


const APP_ROUTES: Routes = [
    { path: 'home', component : HomeComponent },
    { path: 'about', component : AboutComponent },
    { path: 'heroes', component : HeroesComponent },
    { path: 'heroe/:id', component : HeroeComponent },
    { path: 'buscar/:termino', component : BuscadorComponent },
    { path: 'fotos', component : FotosComponent },
    { path: 'carga', component : CargaComponent },
    { path: 'panelu', component: PaneluComponent },
    { path: 'productodetail', component: ProductoTarjetaComponent },
    { path: 'tienda', component: TiendaComponent },
    { path: 'productodetailtienda', component: ProductoTarjetaTiendaComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'panela', component: PaneladminComponent },
    { path: 'denuncias', component: DenunciasComponent },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'confirmar', component: ConfirmarComponent },
    { path: 'michat', component: MichatComponent },
    { path: 'recuperacion', component: RecuperacionComponent },
    
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
