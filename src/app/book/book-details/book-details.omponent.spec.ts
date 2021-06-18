import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Book } from '../../book/shared/book';
import { ActivatedRoute, Router } from '@angular/router';
import {Modes} from "../../shared/app-enums";
import { of } from 'rxjs';
import { BookRepository } from '../shared/book.repository';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BookDetailsComponent } from "../book-details/book-details.component";
import { NGXLogger } from 'ngx-logger';
import { SharedModule } from "../../shared/shared.module";  // kell a shared is mert benne van importálva a PrimeAng komponensek
import localeFr from '@angular/common/locales/fr';
import localeHu from '@angular/common/locales/hu';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';  

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeHu, 'hu');
registerLocaleData(localeRu, 'ru');

describe('BookDetails component', () => {   // inline function
    
    let router = {
        navigateByUrl: (url: string) => console.log("Test mocjók router.navigateByUrl(...) to: ", url)
    };


    let activatedRoute: any;
    let formBuilder: FormBuilder;
    let bookRepository = {
        getBook: (id: string) => of(book)
    };
    let loggerSpy: NGXLogger = jasmine.createSpyObj('NGXLogger', ['error']);
    let component: BookDetailsComponent;
    let fixture: ComponentFixture<BookDetailsComponent>;

    const book: Book = 
        {  
            id: '34324233', 
            isbn: '34324233', 
            sellers: [
                {name: 'Bende seller', address: 'Csáky u 7a', quantity: 33000, age: 49, birthYear: 1972},
                {name: 'Sasform Agrotechnika Kft.', address: 'Felsőszéktó 86', quantity: 12000, age: 40, birthYear: 1981}
                ],
            title: "Angular 11", 
            authors: ['Ferdinand Malcher', 'Johannes Hoppe', 'Danny Koppenhagen'], 
            published:  new Date(), subtitle: 'Grundlagen, fortgeschrittene Themen und Best Practices', rating: 5,
            thumbnails: [{
                url: 'https://ng-buch.de/angular-cover.jpg', title: 'Buchcover' }],
            description: 'Lernen Sie Angular mit diesem Praxisbuch!',
            genres: ['IT', 'Programming'],
            ebook: false,
            printed: false,
            availability: 'Available'
        }
    ;

    beforeEach(waitForAsync(() => { // waitForAsny hogy az összes block a beforeEach-ben végrehajtodjon, mielott az it spezikikationon elkezdenenek lefutni
        TestBed.configureTestingModule({
            declarations: [BookDetailsComponent], 
            imports: [ReactiveFormsModule, SharedModule],
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
                            provide: BookRepository,
                            useValue: bookRepository
                        },
                        {
                            provide: Router,
                            useValue: router,
                        },
                        {
                            provide: NGXLogger,
                            useValue: loggerSpy
                        },
                        FormBuilder
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(BookDetailsComponent);
            component = fixture.componentInstance;
            bookRepository = TestBed.inject(BookRepository);
            activatedRoute = TestBed.inject(ActivatedRoute);
            router = TestBed.inject(Router);
            loggerSpy = TestBed.inject(NGXLogger);
            formBuilder = TestBed.inject(FormBuilder);
        });


        
    }));

    it('initiates component - bookForm defined', () => {
        component.ngOnInit();
        expect(component.bookForm).toBeDefined();
       // expect(loggerSpy.error).toHaveBeenCalledTimes(1);
    });

    it('renders isbn text field as disabled', () => {
        fixture.detectChanges();    // enelkul nem populalja a fieldeket a feluleten
        component.ngOnInit();
        const detailsElement = fixture.nativeElement;
        expect(detailsElement.textContent).toContain('book-details.isbn');
    });

    

    

});
