import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Book } from '../shared/book';
import { ActivatedRoute, Router } from '@angular/router';
import {Modes} from "../../shared/app-enums";
import { of } from 'rxjs';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { BookDetailsComponent } from "./book-details.component";
import { NGXLogger } from 'ngx-logger';
import { SharedModule } from "../../shared/shared.module";  // kell a shared is mert benne van importálva a PrimeAng komponensek
import localeFr from '@angular/common/locales/fr';
import localeHu from '@angular/common/locales/hu';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';  
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RestDataSource } from 'src/app/shared/rest.datasource';

registerLocaleData(localeFr, 'fr');
registerLocaleData(localeHu, 'hu');
registerLocaleData(localeRu, 'ru');

describe('BookDetails component', () => {   // inline function
    let router: any;
    let activatedRoute: any;
    let formBuilder: FormBuilder;
    let ds: any;
    let loggerSpy: any;
    let component: BookDetailsComponent;
    let fixture: ComponentFixture<BookDetailsComponent>;
    let el: DebugElement;

    const countries = ["Afghanistan","Andorra","Alabama","Belgium","Bhutan","Belaruss"];
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

    beforeEach(waitForAsync(() => {
        // cretaing stubs for DI
        ds = {
            getBook: (id: string) => of(book),  // Observable-t kell visszaadnunk!!
            getCountries: (cou: string) => {
                const selection = countries.filter(co => co.toLowerCase().includes(cou.toLowerCase()));
                return of(selection);  // Observable-t kell visszaadnunk!!
            },
            updateBook: (book: Book) => {
                return of(book); // Observable-t kell visszaadnunk!!
            }
        };

        loggerSpy = jasmine.createSpyObj('NGXLogger', ['error']);

        router = {
            navigateByUrl: (url: string) => {console.log("Router.navigateByUrl(...) to: ", url)}
        };

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
                            provide: RestDataSource,
                            useValue: ds
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
        }).compileComponents().then( () => {
            fixture = TestBed.createComponent(BookDetailsComponent);
            el = fixture.debugElement;
            component = fixture.componentInstance;
            ds = TestBed.inject(RestDataSource);
            activatedRoute = TestBed.inject(ActivatedRoute);
            router = TestBed.inject(Router);
            loggerSpy = TestBed.inject(NGXLogger);
            formBuilder = TestBed.inject(FormBuilder);
    
            component.ngOnInit();
        });
    }));

    it('initiates component - bookForm defined', () => {
        expect(component.bookForm).toBeDefined();
       // expect(loggerSpy.error).toHaveBeenCalledTimes(1);
    });

    it('renders isbn text field as disabled', () => {
        fixture.detectChanges();    // enelkul nem populalja a fieldeket a feluleten
        const isbnInputEl = el.queryAll(By.css(".p-inputtext"))[0];
        expect(isbnInputEl.nativeElement.disabled).toBeTrue();
    });

    it('places out 3 authors input', () => {
        fixture.detectChanges();      
        const arrAuthorsInputs = el.nativeElement.querySelector("#auhtorsDiv").querySelectorAll("input");
        expect(arrAuthorsInputs.length).toBe(3);
        expect(arrAuthorsInputs[0].value).toEqual("Ferdinand Malcher");
    });

    it('adds new author input to the authors input list with a "Bende" name and shows it on the gui', () => {
        fixture.detectChanges();    
       
        // how to get and iterate over elements in DOM: https://attacomsian.com/blog/getting-dom-elements-javascript
        const arrAuthorsInputs = el.nativeElement.querySelector("#auhtorsDiv").querySelectorAll("input");

        // click on button to add new author
        const addAuthorButton = el.query(By.css("#addAuthorButton"));
        //click(addAuthorButton);
        fixture.debugElement.nativeElement.querySelector("#addAuthorButton").click();
        fixture.detectChanges();

        // writing new author input with the name Bende
        let numberOfInputs = el.nativeElement.querySelector("#auhtorsDiv").querySelectorAll("input").length;
        let lastInputEl = el.nativeElement.querySelector("#auhtorsDiv").querySelectorAll("input")[--numberOfInputs];
        lastInputEl.value = "Bende";
        fixture.detectChanges();

        const arrAuthorsInputsClicked = el.nativeElement.querySelector("#auhtorsDiv").querySelectorAll("input");
        expect(arrAuthorsInputsClicked.length).toEqual(arrAuthorsInputs.length+1);
    })

    it('retrieves Alabama from country names autocomplete method', () => {
        const event = {query: "Al"};
        component.search(event);
        expect(component.searchResults).toBeDefined();
        expect(component.searchResults.length).toBeGreaterThan(0);
        expect(component.searchResults[0]).toEqual("Alabama");
    });

    fit('deleting first seller row', () => {
        fixture.detectChanges(); 

        // there must be 2 sellers, figyelem: sellersDiv-bol annyi van ahany seller soor a gui-n
        let arrSellerRow = el.nativeElement.querySelectorAll(".sellersDiv");
        expect(arrSellerRow.length).toBe(2);
        const deleteButton = arrSellerRow[0].querySelector("button");
        deleteButton.click();   // delete buttonal toroljuk az elso sellert
        fixture.detectChanges(); 

        // cecking there is only on seller now
        arrSellerRow = el.nativeElement.querySelectorAll(".sellersDiv");
        expect(arrSellerRow.length).toBe(1);
        expect((component.bookForm.get("sellers") as FormArray).length).toBe(1);
    });

    it('adding seller', () => {
        fixture.detectChanges(); 

        // adding new empty raw by clicking add new seller button
        let arrSellerRow = el.nativeElement.querySelectorAll(".sellersDiv");
        expect(arrSellerRow.length).toBe(2);
        const addSellerButton: HTMLButtonElement = el.nativeElement.querySelector("#addSeller");
        addSellerButton.click();
        fixture.detectChanges(); 

        arrSellerRow = el.nativeElement.querySelectorAll(".sellersDiv");
        expect(arrSellerRow.length).toBe(3);

        let newSellerRow = arrSellerRow[2];
        expect(newSellerRow.querySelectorAll("input")[1].value).toEqual("");

        const newNameInput: HTMLInputElement =  newSellerRow.querySelectorAll("input")[0];
        newNameInput.value = "Kása Pista";
        // Angular doesn't know that you set the input element's value property. It won't read that property until you raise the element's input event by calling dispatchEvent()
        newNameInput.dispatchEvent(new Event('input')); 
        const addrInput: HTMLInputElement = newSellerRow.querySelectorAll("input")[1];
        addrInput.value = "Katona utca";
        addrInput.dispatchEvent(new Event('input')); 
        const quantInput: HTMLInputElement = newSellerRow.querySelectorAll("input")[2];
        quantInput.value = "3434";
        quantInput.dispatchEvent(new Event('input'));
        const ageInput: HTMLInputElement = newSellerRow.querySelectorAll("input")[3];
        ageInput.value = "50";
        ageInput.dispatchEvent(new Event('input'));
        const yearInput: HTMLInputElement = newSellerRow.querySelectorAll("input")[4];
        yearInput.value = "1971";
        yearInput.dispatchEvent(new Event('input'));
        fixture.detectChanges(); 

        // does the form model updated?
        expect(component.bookForm.value.sellers[2].name).toEqual("Kása Pista");
    });

    it('validating title for conatinng Angular', () => {
        fixture.detectChanges(); 
        const titleEL: HTMLInputElement = el.nativeElement.querySelector("#titleInput");
        titleEL.value = "Angul";
        titleEL.dispatchEvent(new Event('input'));
        fixture.detectChanges(); 
        expect(component.bookForm.get('title')?.errors.title.message).toEqual("error.book_title");
    })

    it('submitting', () => {
        fixture.detectChanges(); 
        const ebookChkb: HTMLInputElement = el.nativeElement.querySelector("#ebookChkb");
        ebookChkb.click();
        fixture.detectChanges(); 

        const submitButton: HTMLButtonElement = el.nativeElement.querySelector("[type='submit']");
        submitButton.click();
        expect(component.bookForm.value.ebook).toBeTrue();
        expect(component.bookForm.get("ebook").value).toBeTrue();
    });

});




