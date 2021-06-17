import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RestDataSource } from './rest.datasource';
import { Book } from '../book/shared/book';

// nem igazi API hivas, hanem mi adjuk a repsone-ot is meg
describe('RestDataSource', () => {
    let httpMock: HttpTestingController;
    let service: RestDataSource;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [RestDataSource]
        });
        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(RestDataSource);
        });
   
        it('login succeeds', () => {
            const UN: string = "a";
            const PW: string = "a";
            const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYSIsImV4cGlyZXNJbiI6IjFoIiwiaWF0IjoxNjIzMzE3NDI0fQ.2P61rTLx1qJzIKtpNq60R1k5zcxHxgUPzq3V18xR5XI';

            let receivedResponse: any;
            const responseObject = {
                success: true,
                token: TOKEN
              };

            service.authenticate(UN, PW).subscribe(response => receivedResponse = response);
            // Request aus der Warteschlange holen
            const req = httpMock.expectOne('http://localhost:3500/login');
            req.flush(responseObject);

            expect(req.request.method).toEqual('POST');
            expect(receivedResponse).toBeTrue();    // token felejtős mert azt a RestDS sem adja vissza, hanem tárolja és csak a true vagy false jön vissza!
            expect(service.auth_token).toEqual(TOKEN);
        });
    
        it('login fails', () => {
            let receivedResponse: any;
            const UN: string = "aa";
            const PW: string = "a";
            const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYSIsImV4cGlyZXNJbiI6IjFoIiwiaWF0IjoxNjIzMzE3NDI0fQ.2P61rTLx1qJzIKtpNq60R1k5zcxHxgUPzq3V18xR5XI';
            const responseObject = {
                success: false,
              };

            service.authenticate(UN, PW).subscribe(response => receivedResponse = response);
            // Request aus der Warteschlange holen
            const req = httpMock.expectOne('http://localhost:3500/login');
            req.flush(responseObject);

            expect(req.request.method).toEqual('POST');
            expect(receivedResponse).toBeFalse();    // token felejtős mert azt a RestDS sem adja vissza, hanem tárolja és csak a true vagy false jön vissza!
            expect(service.auth_token).toBeNull()
        });

        it('retrieves all books', () => {
            let receivedResponse: Book[];
            const responseObject = [  {  
                    id: 34324233, 
                    isbn: 34324233, 
                    sellers: [
                        {name: 'Bende seller', address: 'sáky u 7a', quantity: 33000, age: 49, birthYear: 1972},
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
                }];

            service.getBooks().subscribe(response => receivedResponse = response);
            const req = httpMock.expectOne({method: 'GET', url: `http://localhost:3500/books`});
            // Request aus der Warteschlange holen
        
            req.flush(responseObject);

            expect(req.request.method).toEqual('GET');
            expect(responseObject.length == 1).toBeTrue();
            expect(responseObject.findIndex(x => x.isbn === 34324233) != -1).toBeTrue();
        });

        it('updates book', () => {
            let receivedResponse: Book;
            const responseObject: Book = {
                    id: '34324233',
                    isbn: '34324233', 
                    sellers: [
                        {name: 'Bende seller', address: 'sáky u 7a', quantity: 33000, age: 49, birthYear: 1972},
                        {name: 'Sasform Agrotechnika Kft.', address: 'Felsőszéktó 86', quantity: 12000, age: 40, birthYear: 1981}
                        ],
                    title: "Angular 11", 
                    authors: ['Ferdinand Malcher', 'Johannes Hoppe', 'Danny Koppenhagen'], 
                    published:  null, 
                    subtitle: 'Grundlagen, fortgeschrittene Themen und Best Practices', rating: 5,
                    thumbnails: [{
                        url: 'https://ng-buch.de/angular-cover.jpg', title: 'Buchcover' }],
                    description: 'Lernen Sie Angular mit diesem Praxisbuch!',
                    genres: ['IT', 'Programming'],
                    ebook: false,
                    printed: false,
                    availability: 'Available'
            };

            service.updateBook(responseObject).subscribe(response => receivedResponse = response);            
            const req = httpMock.expectOne({method: 'PUT', url: `http://localhost:3500/books/${34324233}`});
            // Request aus der Warteschlange holen
        
            req.flush(responseObject);

            expect(req.request.method).toEqual('PUT');
            expect(responseObject.isbn === '34324233').toBeTrue();
        });

});
