import { Component, ContentChild, ElementRef, Renderer2, Input, OnInit, Output, ContentChildren, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../shared/book';
import {Modes} from "../../shared/app-enums";
import { AfterContentInit } from '@angular/core';
import { AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent implements AfterContentInit, AfterContentChecked {

  ModesEnum = Modes;  // ez js module és nam angular module ezért nem kell egy ng modulban sem importálni

  @Input()
  book: Book;

  @Input()
  index: number;

  @ViewChild("h4")
  projectedContentImg: ElementRef;

  @ContentChild("imgDiv")
  projectedImageDiv: ElementRef;

  constructor(private router: Router, private renderer: Renderer2) { }
 
  selectBook(selectedBook: Book) {
    this.router.navigateByUrl("/book/details");
  }

  get bookStyleMap() {
    return {
      "color": (this.index % 2 == 0) ? "white" : "black",
      "background-color": (this.index % 2 == 0) ? "grey" : "lightgrey",
     
    };
  }

  justPrintMyBookISBN(): void {
    console.log("---justPrintMyBookISBN: ", this.book.isbn);
  }

  get linkTextColor (): string {
    return (this.index % 2 == 0) ? "wheat" : "black";
  }

  ngAfterContentInit() {
    //this.renderer.setStyle(this.projectedImageDiv.nativeElement,"font-size","20px")
  }

  ngAfterContentChecked() {
    console.log(this.projectedImageDiv);
  }
 

}


