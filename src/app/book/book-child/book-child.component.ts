import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-child',
  templateUrl: './book-child.component.html',
  styleUrls: ['./book-child.component.css']
})
export class BookChildComponent implements OnInit {

  counter: number = 10;
  message: string = "this is a message using local variable to access child component (comp communication / sharing data)";
  books: Book[];
  singleBook: any;

  constructor() { }

  ngOnInit(): void {
    this.singleBook = {
      isbn: "originalISBN"
    };
  }

  increment(): void {
    this.counter++;

    this.singleBook.isbn = "newISBN";
  }

 

}
