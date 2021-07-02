import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";  // kell a shared is mert benne van importálva a PrimeAng komponensek
import localeFr from '@angular/common/locales/fr';
import localeHu from '@angular/common/locales/hu';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';  
import { RestDataSource } from "../../shared/rest.datasource";
import { DebugElement, SimpleChange, SimpleChanges } from '@angular/core';
import { InputOutputFormComponent } from "../../inputOutput/inputOutput-form/inputOutputForm.component";
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
    });

    it('creates a new product - testing custom event emitting', () => {
      fixture.detectChanges(); 
      // spying on EventEmmitter
      spyOn(component.newProductevent, 'emit');
      const nameInput: HTMLInputElement = el.nativeElement.querySelector("[data-testId='nameInput']");
      nameInput.value = "köcsög";
      nameInput.dispatchEvent(new Event('input'));
      const priceInput: HTMLInputElement = el.nativeElement.querySelector("[data-testId='priceInput']");
      priceInput.value = "22.2";
      priceInput.dispatchEvent(new Event('input')); 
      const newSubmitButton: HTMLInputElement = el.nativeElement.querySelector("[data-testId='newSubmitButton']");

      fixture.detectChanges(); 

      expect(nameInput.value).toEqual("köcsög");
      expect(priceInput.value).toEqual("22.2");
      expect(component.productForm.value.price).toEqual(22.2);
      expect(component.productForm.value.name).toEqual("köcsög");

      newSubmitButton.click();
      let lastId = component.getLastProductID([{id: 9}]);
      let newProduct: Product = {
        ...component.productForm.value,
        id: lastId           
    };

    // was "newProductevent" emmitted after submit?
      expect(component.newProductevent.emit).toHaveBeenCalledWith(newProduct);
    });

});