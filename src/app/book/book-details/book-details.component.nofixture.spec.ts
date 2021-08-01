import { TestBed } from '@angular/core/testing';
import { Book } from '../../book/shared/book';
import { ActivatedRoute, Router } from '@angular/router';
import {Modes} from "../../shared/app-enums";
import { of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BookDetailsComponent } from "../book-details/book-details.component";
import { NGXLogger } from 'ngx-logger';
import { RestDataSource } from 'src/app/shared/rest.datasource';

describe('BookDetails component not fixture', () => {
    let router;
    let activatedRoute;
    let formBuilder;
    let bookRepository;
    let logger;
    let component;

    const book = 
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
    ;

    beforeEach(() => {
        // cretaing stubs for DI
        bookRepository = {
            getBook: (id: string) => of(book)
        };

        logger = {
            error: (text: string) => console.log("Test mock logger: ", text)
        };

        router = {
            navigateByUrl: (url: string) => console.log("Test mocjók router.navigateByUrl(...) to: ", url)
        };

        TestBed.configureTestingModule({
            declarations: [], // nem integration test igy nem kell
            imports: [ReactiveFormsModule],
            providers: [
                        {
                            provide: ActivatedRoute,    // https://www.joshuacolvin.net/mocking-activated-route-data-in-angular/
                            useValue: {
                                snapshot: {
                                    paramMap: {
                                        get: (what: string) => {
                                            let result: string;
                                            switch(what) {
                                                case "mode": {result = Modes.edit.toString(); break;}
                                                case "id": {result = '34324233'}
                                            }
                                            return result;
                                        },
                                    },
                                },
                            },
                        },
                        {
                            provide: RestDataSource,
                            useValue: bookRepository
                        },
                        {
                            provide: Router,
                            useValue: router,
                        },
                        {
                            provide: NGXLogger,
                            useValue: logger
                        },
                        BookDetailsComponent,
                        FormBuilder
            ]
        });

        component = TestBed.inject(BookDetailsComponent);
        bookRepository = TestBed.inject(RestDataSource);
        activatedRoute = TestBed.inject(ActivatedRoute);
        router = TestBed.inject(Router);
        logger = TestBed.inject(NGXLogger);
        formBuilder = TestBed.inject(FormBuilder);

        component.ngOnInit();
    });

    xit('initiates component - bookForm defined', () => {
           expect(component.bookForm).toBeDefined();
    });
    

});
