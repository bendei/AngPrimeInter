import {Component, Input, Output, EventEmitter} from "@angular/core";
import { DatePipe } from "@angular/common";
import {Product} from "../../store/shared/Product";

@Component({
    providers: [DatePipe],
    selector: "inputoutput-table",
    templateUrl: "inputOutputTable.component.html",
    styles: ['h3 {color: black;}']
})
export class InputOutputTableComponent {

    @Input()
    products: Product[];

    @Output()
    productToSend = new EventEmitter<Product>();

    constructor(private datePipe: DatePipe) {
    }
    
    sendProductToParent(prod: Product) {
        console.log("table comp sent the product");
        this.productToSend.emit(prod);
    }

    transformDateWithPipe(date: Date): string {
        return this.datePipe.transform(Date.now(),'yyyy-MM-dd HH:mm');
    }

}