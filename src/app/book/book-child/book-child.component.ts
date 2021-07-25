import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-child',
  templateUrl: './book-child.component.html',
  styleUrls: ['./book-child.component.css']
})
export class BookChildComponent implements OnInit {

  counter: number = 10;
  books: Book[];

  constructor() { }

  ngOnInit(): void {
  }

  increment(): void {
    this.counter++;
  }

}
