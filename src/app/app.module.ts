import { BrowserModule } from '@angular/platform-browser';  // az egész appban csak 1 szer lehet deklarálni és azt legjobb itt
import { ErrorHandler, NgModule } from '@angular/core';
import {LOCALE_ID} from "@angular/core";
import localeFr from '@angular/common/locales/fr';
import localeHu from '@angular/common/locales/hu';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";

// class
import {AppErrorHandler} from "./error/AppErrorHandler";

// modules
import {AuthenticationModule} from "./authentication/authentication.module";
import { StoreModule} from "./store/store.module";
import { BookModule} from "../app/book/book.module";
import { NyomonkovetesModule } from "../app/nyomonkovetes/shared/nyomonkovetes.module";
import { InputOutputModule} from "./inputOutput/shared/inputOutput.module";
import { ButtonModule} from "primeng/button";

// comps
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from "./error/error.component";

// routing modules
import {AppRoutingModule} from "./app-routing.module";

// services
import { StoreGuard } from "./authentication/store.guard";
import { TokenInterceptor} from "../app/shared/token.interceptor";
import { GlobalhttpinterceptorService } from "../app/shared/globalhttpinterceptor.service";
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { SharedModule } from './shared/shared.module';
import { ErrortransferService } from "./error/errortransfer.service";
import { GyakorlasComponent } from './gyakorlas/gyakorlas.component';
import { ProbaModule } from "../app/proba/proba.module";

// pipes


registerLocaleData(localeFr, 'fr');
registerLocaleData(localeHu, 'hu');
registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    GyakorlasComponent,
  ],
  imports: [
    BrowserModule, RouterModule, ReactiveFormsModule, ButtonModule,
    AuthenticationModule, SharedModule,
    AppRoutingModule, 
    StoreModule, BookModule, InputOutputModule, NyomonkovetesModule, ProbaModule,
    LoggerModule.forRoot({serverLoggingUrl: 'http://localhost:3500/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
  ],
  providers: [StoreGuard, ErrortransferService,
    {provide: ErrorHandler, useClass: AppErrorHandler},  // custom error handling, eigentlich überschreiben wir hier das Angular's default
    //error handler für nicht behandlelte Errors 
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}, // token interceptior
    {provide: HTTP_INTERCEPTORS, useClass: GlobalhttpinterceptorService, multi: true} ,
   // {provide: HTTP_INTERCEPTORS, useClass: ResponsereadernterceptorService, multi: true}
     
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

 
