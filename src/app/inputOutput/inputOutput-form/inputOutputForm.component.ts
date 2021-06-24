import {Component, Output, Input, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Product} from "../../store/shared/Product";

@Component({
    selector: "inputoutput-form",
    templateUrl: "inputOutputForm.component.html"
})
export class InputOutputFormComponent implements OnChanges{
    productForm: FormGroup;
    selectedCategory: string;

    @Input()
    categories: string[];
    
    // egy új event tipust ozunk létre, amire majd a consumer componens figyelni fog
    // ez az event jön létre, ha új productot huzunk létre és átadásra kerül a product objektum
    @Output("newProductOutputEvent")
    newProductevent = new EventEmitter<Product>();

    @Input()
    receivedFromTable: Product;

    constructor(private fb: FormBuilder) {
       this.initForm();
    }

    private initForm(): void {
        this.productForm = this.fb.group({
            name: [''],
            category: [''],
            price: [11]
        });
    }

    // egy dolog, hogy az output propertit megkapta a perent a tabletol és aztán átadta a formnak, de aform nem értesül automatikusan ha az input prop updatelődött:
    // we must intercept input property changes
    ngOnChanges(changes: SimpleChanges) {
        for (const propName in changes) {
          const changedProp = changes[propName];

          if (propName == "receivedFromTable") {
            if (changedProp.currentValue !== undefined) {
                console.log("form comp detected changes on receivedFromTable @Input property and updating newProductevent property (for the template form model) with the received product");
                Object.assign(this.productForm, changedProp.currentValue);
            }
          }
        }
    }

    clearForm() {
      this.productForm.reset();
    }

    simpleClicked() {
        if(confirm("Tényleg?")) { //egy window.confirm popupot nyit meg
            console.log("Tényleg");
        }
        else {
            open("");   //uj window broswer tab ablakot nyit meg
            console.log("nem Tényleg");
        }
    }

    submitForm() {
        console.table(this.productForm.value);

        const newProduct: Product = {
            ...this.productForm.value
        };


        // emmitiert event und übergibt product object der Eltern-Komponente, die wiederum als input 
        this.newProductevent.emit(newProduct);
    }
}