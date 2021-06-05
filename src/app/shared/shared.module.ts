import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// primeeng
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from "primeng/button";
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

const modulesToExport = [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, HttpClientModule];
const primeModules = [InputTextModule, ButtonModule, TableModule, CalendarModule, AutoCompleteModule];

@NgModule({
  imports: [...modulesToExport, ...primeModules,  TranslateModule.forRoot({
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
  })],
  exports: [...modulesToExport, ...primeModules,  TranslateModule]
})
export class SharedModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
// Shared module will be imported by many lazy loaded features and because of that it should NEVER implement any services
//  (providers: [ ]) and only contain declarables (components, directives and pipes) and modules (which only contain declarables).