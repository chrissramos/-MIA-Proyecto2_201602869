import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//rutas
import { APP_ROUTING } from './app.routes';


//servicios
import { HeroesService } from './servicios/heroes.service';


// componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { HeroeTarjetaComponent } from './components/heroe-tarjeta/heroe-tarjeta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { CargaImagenesFireService } from './servicios/carga-imagenes-fire.service';

import { ChatserviceService } from './servicios/chatservice.service';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule} from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { PaneluComponent } from './components/panelu/panelu.component';
import { ProductoTarjetaComponent } from './components/producto-tarjeta/producto-tarjeta.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { ProductoTarjetaTiendaComponent } from './components/producto-tarjeta-tienda/producto-tarjeta-tienda.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PaneladminComponent } from './components/paneladmin/paneladmin.component';
import { DenunciasComponent } from './components/denuncias/denuncias.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { MichatComponent } from './components/michat/michat.component';
import { RecuperacionComponent } from './components/recuperacion/recuperacion.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    HeroesComponent,
    HeroeComponent,
    BuscadorComponent,
    HeroeTarjetaComponent,
    FotosComponent,
    CargaComponent,
    NgDropFilesDirective,
    PaneluComponent,
    ProductoTarjetaComponent,
    TiendaComponent,
    ProductoTarjetaTiendaComponent,
    CarritoComponent,
    PaneladminComponent,
    DenunciasComponent,
    CategoriasComponent,
    ReportesComponent,
    ConfirmarComponent,
    ChatComponent,
    MichatComponent,
    RecuperacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [
    HeroesService,
    CargaImagenesFireService,
    ChatserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
