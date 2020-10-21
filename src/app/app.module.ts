import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { CscProductosComponent } from './components/csc-productos/csc-productos.component';
import { LectorexcelComponent } from './components/lectorexcel/lectorexcel.component';
import { ExportAsModule } from 'ngx-export-as';
import { DashboardComponent } from './components/dashboard.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { CierreSesionComponent} from './components/cierre-sesion/cierre-sesion.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CargarImagenesComponent } from './components/cargar-imagenes/cargar-imagenes.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path:'csvproductos', component: CscProductosComponent },
  { path:'lectorexcel', component: LectorexcelComponent },
  { path:'dashboard', component: DashboardComponent },
  { path:'logout', component: CierreSesionComponent },
  { path:'crear-usuario',component:  CrearUsuarioComponent },
  { path:'supplier',component:  SupplierComponent },
  { path:'producto',component:  ProductoComponent },
  { path:'uploadImages',component:  CargarImagenesComponent }


];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioComponent,
    FormularioComponent,
    CscProductosComponent,
    LectorexcelComponent,
    DashboardComponent,
    LoginComponent,
    CierreSesionComponent,
    CrearUsuarioComponent,
    SupplierComponent,
    ProductoComponent,
    CargarImagenesComponent
   
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ExportAsModule,
    HttpClientModule,
    ReactiveFormsModule
  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
