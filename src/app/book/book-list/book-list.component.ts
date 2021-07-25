import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { BookRepository } from '../shared/book.repository';
import { Book } from '../shared/book';
import { Modes} from "../../shared/app-enums";
import { BookListItemComponent } from '../book-list-item/book-list-item.component';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { BookChildComponent } from '../book-child/book-child.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit {

  books$: Observable<Book[]>;
  ModesEnum = Modes;  // must assign enum to public field so that it can be used in the template // ez js module és nam angular module ezért nem kell egy ng modulban sem importálni

  @ViewChild("booklistheader")
  booklistheader: ElementRef;
  // We can think of the QueryList as an observable collection, which can emit events once items are added or removed from it. 
  //We can access the Observable wrapped by the QueryList with its changes property. 

  @ViewChild(BookChildComponent)
  child: BookChildComponent;

  constructor(private repo: BookRepository, private renderer: Renderer2) { }

  ngOnInit(): void {
    //setTimeout( () => {this.repo.getBooks().subscribe(data => this.books = data)}, 1400);
    // this.repo.getBooks().subscribe(data => this.books = data);
    this.books$ = this.repo.getBooks().pipe(share());
  }
      
  ngAfterViewInit() {
    const innerText = this.renderer.createText('book-list.caption');  // text justr created, not yet added to the DOM
    this.renderer.appendChild(this.booklistheader.nativeElement, innerText);  // adding it to existing element

    const childCounter = this.child.counter;
    console.log("childCounter - BookListComponent: ", childCounter);
    this.books$.subscribe(x => this.child.books = x);
  }

  incrementOnChild(): void {
    this.child.increment();
  }

}
