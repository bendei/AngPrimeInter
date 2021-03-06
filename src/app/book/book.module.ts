import {NgModule} from "@angular/core";
import {BookListComponent} from "./book-list/book-list.component";
import {BookListItemComponent} from "./book-list-item/book-list-item.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import { SharedModule } from "../shared/shared.module";
import { BookChildComponent } from './book-child/book-child.component';
import { BookDirective } from "../book/shared/book.directive";

@NgModule({
    imports: [SharedModule],
    declarations: [ BookListComponent, BookListItemComponent, BookDetailsComponent, BookChildComponent, BookDirective]
})
export class BookModule {

}