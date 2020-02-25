import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
//import { AccountComponent } from './account/account.component';
//import { NewAccountComponent } from './new-account/new-account.component';
import { ApiService } from './api.service'

import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {GridModule} from '@progress/kendo-angular-grid'
import {ButtonsModule} from '@progress/kendo-angular-buttons'
import {CalendarModule} from '@progress/kendo-angular-dateinputs'
import {PDFExportModule} from '@progress/kendo-angular-pdf-export'
import{ComboBoxModule} from '@progress/kendo-angular-dropdowns'
import {ExcelExportModule} from '@progress/kendo-angular-excel-export';
import { LoginComponent } from './login/login.component'

import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt'
import { JwtService } from './Utilities/jwt-service';
import { RouteGuard } from './Utilities/route-guard';
import { ErrorInterceptor } from './Utilities/http-error-interceptor';
import { HomeComponent } from './home/home.component';
import {appRoutingModule} from './appRoutingModule'



// const appRoutes: Routes =[
//   { path: '', component: HomeComponent, canActivate: [RouteGuard] },
//     { path: 'login', component: LoginComponent },

//     // otherwise redirect to home
//     { path: '**', redirectTo: '' }
  
// ]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
    
    //AccountComponent,
   // NewAccountComponent
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    appRoutingModule,
    HttpClientModule,
    InputsModule,
    BrowserAnimationsModule,
    GridModule,
    PDFExportModule,
    CalendarModule,
    ButtonsModule,
    ExcelExportModule,
    ComboBoxModule//,
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: function  tokenGetter() {
    //          return     localStorage.getItem('access_token');},
    //     whitelistedDomains: ['localhost:5001'],
    //    // blacklistedRoutes: ['http://localhost:3000/auth/login']
    //   }
    // })
  ],
  
  
  providers: [ApiService,JwtService,RouteGuard,
    // { provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
