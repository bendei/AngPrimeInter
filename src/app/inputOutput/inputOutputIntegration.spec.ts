// interaction between parent and form
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../app/shared/shared.module";  // kell a shared is mert benne van importálva a PrimeAng komponensek
import localeFr from '@angular/common/locales/fr';
import localeHu from '@angular/common/locales/hu';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';  
import { RestDataSource } from "../../app/shared/rest.datasource";
import { DebugElement, SimpleChange, SimpleChanges } from '@angular/core';
import { InputOutputFormComponent } from "../../app/inputOutput/inputOutput-form/inputOutputForm.component";
import { InputOutputParentComponent } from "../../app/inputOutput/inputOutput-parent/inputOutputParent.component";
import { TESTPRODUCTS } from "../../app/testdata/data-products";
import { Product } from 'src/app/store/shared/product';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeHu, 'hu');
registerLocaleData(localeRu, 'ru');


describe('InputOutputFormComponent', () => 
{
    let formBuilder: FormBuilder;
    let restDataSource: any;
    let component: InputOutputFormComponent;
    let fixture: ComponentFixture<InputOutputFormComponent>;
    let el: DebugElement;

    beforeEach(waitForAsync(() => {
        // cretaing stubs for DI
     
        restDataSource = {
            getProducts: () => of(TESTPRODUCTS),
            saveProduct: (pro: Product) => of(pro),
            updateProduct: (pro: Product) => {
                pro.id = 99;
                return of(pro);
            }
        };

        TestBed.configureTestingModule({
            declarations: [InputOutputFormComponent], 
            imports: [ReactiveFormsModule, SharedModule],
            providers: [
                {
                    provide: RestDataSource,
                    useValue: restDataSource
                },
                FormBuilder
            ]
        }).compileComponents().then( () => {
            fixture = TestBed.createComponent(InputOutputFormComponent);
            el = fixture.debugElement;
            component = fixture.componentInstance;
            restDataSource = TestBed.inject(RestDataSource);
            formBuilder = TestBed.inject(FormBuilder);
        });
    }));

});