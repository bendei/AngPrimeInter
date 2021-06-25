import {Component, Output, OnInit} from "@angular/core";
import {Product} from "../../store/shared/Product";
import {ProductRepository} from "../../store/shared/product.repository";

@Component({
    templateUrl: "inputOutputParent.component.html"
})
export class InputOutputParentComponent {

    // table child comp kapja meg mint @Input
    products: Product[] = [];

    // form child comp kapja meg mint @Input
    categories: string[] = [];

    receivedProductFromTable: Product;

    constructor(private repo: ProductRepository) {        
    }

    ngOnInit(): void {
        this.repo.getProducts().subscribe(data => {
            this.products = data;
            // ne rakd a subscriben kivul, mert nem biztos hogy adataot kap a RESTol időben!!
            this.categories =  this.products.map(x => x.category).filter((c, index, sor) => sor.indexOf(c) == index);
            this.categories.unshift("Kérem válasszon");
            }
        );
    }    

    addProduct(product: Product) {
        this.receivedProductFromTable = product;      
        const prodFound = this.products.filter(p => p.id == product.id).length > 0;

        if(prodFound) {  // ha van már ilyen product akkor nem push csak replace a product array-ben
           const index = this.products.findIndex( ({id}) => id == product.id);  // using arrow function and deconstructing
            this.products.splice(index, 1, product);
        } else {
            console.table(product);
            this.products.push(product);     // itt adjuk hozza az uj productot, amit a tableben jelenitunk meg  
        }           
    }

    // a table egy sorára kattintva a parent megkapja a kiválasztott productot amit a form component vesz át és majd tölt be 
    receiveSelectedProduct(prod: Product) {
        console.log("parent comp received the product from table comp:" + prod.name);
        this.receivedProductFromTable = prod;
    }
}