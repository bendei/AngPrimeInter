import { TestBed, inject, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { BookListComponent } from "../book-list/book-list.component";
import { Observable, of } from 'rxjs';
import { Book } from '../shared/book';
import { DebugElement } from '@angular/core';
import {TESTBOOKS} from "../../testdata/data-books";
import { RestDataSource } from 'src/app/shared/rest.datasource';

describe('BookListComponent tests', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let el: DebugElement;
    let bookRepoStub: any;
    let component: BookListComponent;
    
    beforeEach(waitForAsync(() => {

        // creating stub for bookRepo (Observble)
        bookRepoStub = {
            getBooks: () => of(Object.values(TESTBOOKS))
        };

        // confugring Testbed
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: RestDataSource,
                    useValue: bookRepoStub
                },
                BookListComponent
            ]
        }).compileComponents().then( () => {
            fixture = TestBed.createComponent(BookListComponent);
            el = fixture.debugElement;
            component = fixture.componentInstance;
            component.ngOnInit();
        });
        
    }));

    it('get a list of all books', () => {
            let booksObservable: Observable<Book[]> = of(Object.values(TESTBOOKS));
            let konyvek: Book[];
            booksObservable.subscribe(data => konyvek = data);
            expect(konyvek.length == 11).toBeTrue();
    });

});
