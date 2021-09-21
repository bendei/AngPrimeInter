import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { Book } from "../book/shared/book";
import { catchError } from 'rxjs/operators';

const PROTOCOL = "http";
const PORT = 8080;
const API = `${PROTOCOL}://localhost:${PORT}/bookstore`;

@Injectable()
export class GyakorlasDatatsourceService {

  constructor(private http: HttpClient) { }

  putBook(bookId: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${API}/book/${bookId}`, book);
  }

  getBook(bookId: number): Observable<Book | string> {
    return this.http.get<Book>(`${API}/book/${bookId}`).pipe( catchError((err: Response) => of(err.status.toString())));
  }

}
