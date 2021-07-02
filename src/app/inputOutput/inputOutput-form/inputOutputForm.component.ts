import {Component, Output, Input, EventEmitter, OnChanges, SimpleChanges} from "@angular/core";
import {FormBuilder, FormGroup } from "@angular/forms";
import {Product} from "../../store/shared/Product";
import { RestDataSource } from "../../shared/rest.datasource";
import { Category } from "src/app/shared/category";

@Component({
    selector: "inputoutput-form",
    templateUrl: "inputOutputForm.component.html"
})
export class InputOutputFormComponent implements OnChanges{
    productForm: FormGroup;
    selectedCategory: Category;

    @Input()
    categories: Category[];

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

    // egy dolog, hogy az output propertit megkapta a parent a tabletol és aztán átadta a formnak, de aform nem értesül automatikusan ha az input prop updatelődött:
    // we must intercept input property changes
    // Simply in the ngOnChange is fire when declared property values are changed. So in that method, we can set this as a param to store the data. like this
    // https://sithummeegahapola.medium.com/what-is-angular-simplechanges-in-ngonchange-method-2e6b8e7f411d
    ngOnChanges(changes: SimpleChanges) {
        for (const propName in changes) {
          const changedProp = changes[propName];

          if (propName == "receivedFromTable") {
            if (changedProp.currentValue !== undefined) {
                console.log("form comp detected changes on receivedFromTable @Input property and updating newProductevent property (for the template form model) with the received product");
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
        let newProduct: Product = {
            ...this.productForm.value           
        };

        // a productForm.value  object literal formájában tartalmazza az értékeket. !! a productForm.get("name").value null-t adi vissza submit utan

        this.repo.getProducts().subscribe(data => {
            // sollen GetAllProducts abwarten !!
           this.saveProductAsync(newProduct, data);
        });
    }

    private saveProductAsync(newProduct: Product, arr: Product[]): void {
        if (newProduct.id == null) {
            newProduct.id = this.getLastProductID(arr); // naja, ez az id ami a DB bol jon majd
            this.repo.saveProduct(newProduct).subscribe(data => newProduct = data); // az product.id szukseges ezert kell a return value (a DB.-bol)            
        } else {
            this.repo.updateProduct(newProduct);
        }

        // emmitiert event und übergibt product object der Eltern-Komponente, die wiederum als input 
        this.newProductevent.emit(newProduct);
    }

    getLastProductID(arr: Product[]): number {
        let newArr = arr.sort(x => x.id).map(x => x.id);
        let generatedId = newArr.pop();
        return ++generatedId;       
    }
}