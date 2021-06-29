import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import {Modes} from "../../shared/app-enums";
import { of } from 'rxjs';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { SharedModule } from "../../shared/shared.module";  // kell a shared is mert benne van importálva a PrimeAng komponensek
import localeFr from '@angular/common/locales/fr';
import localeHu from '@angular/common/locales/hu';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';  
import { RestDataSource } from "../../shared/rest.datasource";
import { DebugElement, SimpleChange, SimpleChanges } from '@angular/core';
import { InputOutputFormComponent } from "../../inputOutput/inputOutput-form/inputOutputForm.component";
import { By } from '@angular/platform-browser';
import { TESTPRODUCTS } from "../../testdata/data-products";
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


    it('gets @Input(Product) property set by the host component', () => {
        // the ComponentFixture holds the Component and provides a convenient interface to both the Component instance and the rendered DOM.
        // The fixture references the Component instance via the componentInstance property. In our example, it contains a InputOutputFormComponent instance.
        // const component = fixture.componentInstance;
        // The Component instance is mainly used to set Inputs and subscribe to Outputs, for example

        let prod: Product = {
            id: TESTPRODUCTS[0].id,
            name: TESTPRODUCTS[0].name,
            category: TESTPRODUCTS[0].category,
            price: TESTPRODUCTS[0].price,
            description: TESTPRODUCTS[0].description,
            releaseDate: new Date(TESTPRODUCTS[0].releaseDate)
        };

        let receivedFromTable: SimpleChange = {
            previousValue: null, 
            currentValue: prod, 
            firstChange: true,
            isFirstChange: () => true
        }

        let simpleChanges: SimpleChanges = {
           "receivedFromTable": receivedFromTable
        };
        // übergeben die Product von der host Komponentes
        component.receivedFromTable = prod;
        // @Input property values changes detection happens in this lifecycle hook --- so we call it
        component.ngOnChanges(simpleChanges);
        expect(component.productForm.get("id").value).toBeTruthy();
    })

});