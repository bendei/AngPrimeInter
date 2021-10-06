import { Component, ElementRef, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
import { from, fromEvent, Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Book } from '../book/shared/book';
import { GyakorlasDatatsourceService } from "../gyakorlas/gyakorlas.datatsource";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { BookChildComponent } from '../book/book-child/book-child.component';

//http://localhost:8080/h2-console
@Component({
  selector: 'app-gyakorlas',
  templateUrl: './gyakorlas.component.html',
  styleUrls: ['./gyakorlas.component.css'],
  providers: [GyakorlasDatatsourceService]
})
export class GyakorlasComponent implements OnInit {

  @ViewChild("responseFromPutBook")
  responseFromPutBook: ElementRef;

  @ViewChild("idInput")
  idInput: ElementRef;

  bookForm2: FormGroup;

  szamok: number[] = [1,2,3,4,5];

  ember = {
    payload: { 
      sex: "male",
      age: 34,
      color: "red"
    }
  };

  $szamokObs: Observable<number> = from(this.szamok);
  $emberOb: Observable<any> = of(this.ember);

  constructor(private renderer: Renderer2, private ds: GyakorlasDatatsourceService, private fb: FormBuilder) { }

  ngOnInit(): void {
   this.initForm();
   this.ds.getBook(1).subscribe(x => {
   
    if(this.checkBook(x)) {this.setFormValues(x as Book);}
    
    });
    // this.$szamokObs.pipe(map(x => x * 2)).subscribe(val => console.log(val)); //klasszikus map egy array elemeit mappeljuk át egy projection functional más elemekké

    this.$emberOb.pipe(
      tap( re => console.log("tapeed response: ", re)),
      map(response => response['payload']))  // itt csak a response  payload propertijét mappeljük le a responseba, mert csak ezt akarjuk használni
      .subscribe(e => console.log(e));

  }

  checkBook = (p: any): p is Book => p.hasOwnProperty('id');

  ngAfterViewInit() {
    const $searchIdString = fromEvent(this.idInput.nativeElement,'keyup').pipe(
        map(x => {
          return this.idInput.nativeElement.value;
          // return x['key']; mert nemcsak az utolsó beütött karakter akarjuk átadni, hanem a mező  egész értékét
        }, 
        debounceTime(400)
       )
      );

      const $bookBack =   $searchIdString.pipe(
        switchMap(x => this.askTheServer(x))
       
        )
        .subscribe(y => {
          if (this.checkBook(y)) {
            this.setFormValues(y as Book);
          } else {
            this.bookForm2.reset();
          }         
        }
      );    
  }

  private askTheServer(id: number): Observable<Book | string> {
    return this.ds.getBook(id);
  }

  private initForm(): void {
        this.bookForm2 = this.fb.group({
        id: [''],
        isbn: [''],
        title: [''],
        pageSize: [''],
        rating: [''],
      });
  }

  private setFormValues(book: Book) {
    console.log("setFormValues:", book);
    this.bookForm2.patchValue(book);
  }

  submitForm() {
   
  }

  /* Ez a hiba jött:
  TypeError: Cannot read properties of undefined (reading 'title') at t.putBook (http://localhost:4200/main.js:1:874305) at http://localhost:4200/main.js:1:874924 at 
  ll (http://localhost:4200/main.js:1:167770) at n (http://localhost:4200/main.js:1:167932) at HTMLButtonElement.<anonymous> (http://localhost:4200/main.js:1:853083) 
  at e.invokeTask (http://localhost:4200/polyfills.js:1:159341) a

  Megoldás:
    Since the originating port 4200 is different than 8080,So before angular sends a create (PUT) request,it will send an OPTIONS request to the server 
    to check what all methods and what all access-controls are in place. Server has to respond to that OPTIONS request with list of allowed methods and allowed origins.


  */
    putBook(): void {
      let book = {
        title: "2dsdasda22222",
        isbn: "53345",
        pageSize: 13
      };
  
      let bookSaved: Book;
      this.ds.putBook(1, book).pipe(
        tap(x => console.log("repsonse tap():", x))
        ).subscribe(x => {
          bookSaved = x;
          const innerText = this.renderer.createText(
            `${bookSaved.id}
             ${bookSaved.title}
          `);  // text justr created, not yet added to the DOM
          this.renderer.appendChild(this.responseFromPutBook.nativeElement, innerText);  // adding it to existing element
        }
      );
    
      }


}
