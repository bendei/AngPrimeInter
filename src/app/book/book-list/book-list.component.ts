import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BookRepository } from '../shared/book.repository';
import { Book } from '../shared/book';
import {Modes} from "../../shared/app-enums";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit {

  books: Book[];
  ModesEnum = Modes;  // must assign enum to public field so that it can be used in the template // ez js module és nam angular module ezért nem kell egy ng modulban sem importálni

  @ViewChild("booklistheader")
  booklistheader: ElementRef;
  // We can think of the QueryList as an observable collection, which can emit events once items are added or removed from it. 
  //We can access the Observable wrapped by the QueryList with its changes property. 

  constructor(private repo: BookRepository) { }

  ngOnInit(): void {
    //setTimeout( () => {this.repo.getBooks().subscribe(data => this.books = data)}, 1400);
    this.repo.getBooks().subscribe(data => this.books = data);
  }
      
  ngAfterViewInit() {
    console.log("ngAfterViewInit", this.booklistheader);
    this.booklistheader.nativeElement.innerHTML = "book-list.caption";
    
  }

    //console.log(this.itemComponents.get(0).book.isbn);
  

}
