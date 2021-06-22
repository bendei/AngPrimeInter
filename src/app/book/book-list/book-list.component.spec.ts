import { TestBed, inject, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { BookRepository } from "../shared/book.repository";
import { BookListComponent } from "../book-list/book-list.component";
import { of } from 'rxjs';
import { Book } from '../shared/book';
import { DebugElement } from '@angular/core';
import {TESTBOOKS} from "../../testdata/data-books";

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
                    provide: BookRepository,
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
            let konyvek: Book[] = component.books;
            expect(konyvek.length == 11).toBeTrue();
    });

});
