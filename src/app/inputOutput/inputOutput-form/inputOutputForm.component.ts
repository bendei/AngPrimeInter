import {Component, Output, Input, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {Product} from "../../store/shared/Product";
import { RestDataSource } from "../../shared/rest.datasource";

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

    constructor(private fb: FormBuilder, private repo: RestDataSource) {
       this.initForm();
    }

    private initForm(product?: Product): void {
        this.productForm = this.fb.group({
            id: [product?.id],
            name: [product?.name],
            category: [product?.category],
            price: [product?.price]
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
                //Object.assign(this.productForm, changedProp.currentValue);
                this.productForm = {...changedProp.currentValue};
                this.initForm(this.receivedFromTable);
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
        debugger;
        let newProduct: Product = {
            ...this.productForm.value           
        };

        if (newProduct.id == null) {
            console.log("itt");
            newProduct.id = this.getLastProductID(); // naja, ez az id ami a DB bol jon majd
            this.repo.saveProduct(newProduct).subscribe(data => newProduct = data); // az product.id szukseges ezert kell a return value (a DB.-bol)            
        } else {
            this.repo.updateProduct(newProduct);
        }

        // emmitiert event und übergibt product object der Eltern-Komponente, die wiederum als input 
        this.newProductevent.emit(newProduct);
    }

    private getLastProductID(): number {
        debugger;
        let arr: Product[] = [];
        this.repo.getProducts().subscribe(data => arr = data);
        let newArr = arr.sort(x => x.id).map(x => x.id);
        let generatedId = newArr[0];
        console.log("....",generatedId);
        console.log(typeof(generatedId));
        return ++generatedId;
    }
}