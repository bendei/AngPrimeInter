import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Book } from '../shared/book';
import { Modes} from "../../shared/app-enums";
import { BookListItemComponent } from '../book-list-item/book-list-item.component';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { BookChildComponent } from '../book-child/book-child.component';
import { RestDataSource } from "../../shared/rest.datasource";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit {

  // für async pipe
  books$: Observable<Book[]>;
  ModesEnum = Modes;  // must assign enum to public field so that it can be used in the template // ez js module és nam angular module ezért nem kell egy ng modulban sem importálni
  thereAreBooks: boolean = false;
  errorObject: any;

  @ViewChild("booklistheader")
  booklistheader: ElementRef;
  // We can think of the QueryList as an observable collection, which can emit events once items are added or removed from it. 
  //We can access the Observable wrapped by the QueryList with its changes property. 

  @ViewChild(BookChildComponent)
  child: BookChildComponent;

    constructor(private ds: RestDataSource, private renderer: Renderer2, private restDS: RestDataSource) { }

  ngOnInit(): void {
    //setTimeout( () => {this.repo.getBooks().subscribe(data => this.books = data)}, 1400);
    // this.repo.getBooks().subscribe(data => this.books = data);
    this.books$ = this.ds.getBooks().pipe(share());
    this.books$.subscribe(x => this.thereAreBooks = true);
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

  throwError1(): void {
    this.createError();
  }

  throwError2(): void {
    try {
      this.createError();
    } catch(error) {
      console.log("my mehtod handles error: ", error.message);
    }
  }

  kamuErrorFromHttp(): void {   
    let observer = {
      next: (response: any) => console.log("next:", response),
      error: (err: any) => this.errorObject = err
    };
      this.restDS.get404StatusCode().subscribe( observer );
   
  }

  private createError(): void {
    const error: Error = {
      name: "pisti error",
      message: "pisti message"
    };
    throw error;
  }

  
}
