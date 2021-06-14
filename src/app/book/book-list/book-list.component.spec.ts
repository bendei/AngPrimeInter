import { TestBed, inject } from '@angular/core/testing';
import { BookRepository } from "../shared/book.repository";
import { BookListComponent } from "../book-list/book-list.component";
import { of } from 'rxjs';
import { Book } from '../shared/book';

describe('BookListComponent tests', () => {

    let bookRepoStub;
    let books = [
        {  
            id: 34324233, 
            isbn: 34324233, 
            sellers: [
                {name: 'Bende seller', address: 'Csáky u 7a', quantity: 33000, age: 49, birthYear: 1972},
                {name: 'Sasform Agrotechnika Kft.', address: 'Felsőszéktó 86', quantity: 12000, age: 40, birthYear: 1981}
                ],
            title: "Angular 11", 
            authors: ['Ferdinand Malcher', 'Johannes Hoppe', 'Danny Koppenhagen'], 
            published:  new Date().toISOString(), subtitle: 'Grundlagen, fortgeschrittene Themen und Best Practices', rating: 5,
            thumbnails: [{
                url: 'https://ng-buch.de/angular-cover.jpg', title: 'Buchcover' }],
            description: 'Lernen Sie Angular mit diesem Praxisbuch!',
            genres: ['IT', 'Programming'],
            ebook: false,
            printed: false,
            availability: 'Available'
        }
    ];

    beforeEach( () => {

        // creating stub for bookRepo (Observble)
        bookRepoStub = {
            getBooks: () => of(books)
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
        });
    });

    it('get a list of all books',
        inject([BookListComponent], (component: BookListComponent) => {    // injecting the testable comp into the Testbed
            component.ngOnInit();
            let konyvek: Book[] = component.books;

            expect(konyvek.length==1).toBeTrue();
    }));

});