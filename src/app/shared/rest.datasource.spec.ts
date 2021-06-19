import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RestDataSource } from './rest.datasource';
import { Book } from '../book/shared/book';
import { TESTBOOKS } from "../testdata/data-books";
import { HttpErrorResponse } from '@angular/common/http';

// nem igazi API hivas, hanem mi adjuk a repsone-ot is meg
describe('RestDataSource 1', () => {
    let httpMock: HttpTestingController;
    let service: RestDataSource;
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYSIsImV4cGlyZXNJbiI6IjFoIiwiaWF0IjoxNjIzMzE3NDI0fQ.2P61rTLx1qJzIKtpNq60R1k5zcxHxgUPzq3V18xR5XI';
    const UN: string = "a";
    const PW: string = "a";

    const responseAuthenticationSuccess = {
        success: true,
        token: TOKEN
      };
    const responseAuthenticationFails = {
        success: false,
      };

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [RestDataSource]
        });
        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(RestDataSource);
        });

        // testing : 1. request uses GET method, repo method calls http://localhost:3500/books GET method url, repo return expected json
        it('retrieves all books', () => {
            service.getBooks().subscribe(response => {                      // set of excpectations regarding response object
                expect(response).toBeTruthy();
            });
            
            const req = httpMock.expectOne(`http://localhost:3500/books`);  // repo request really hits this url?
            expect(req.request.method).toEqual('GET');                      // repo uses really GET method?
            req.flush(Object.values(TESTBOOKS));                            // sending back our moch json response
        });

        it('updates book', () => {  
            let updatableBook: Book = Object.values(TESTBOOKS)[0] as Book;
            updatableBook.authors = [...updatableBook.authors, 'Bende Psita'];
            service.updateBook(updatableBook).subscribe(response => {
                expect(response.isbn == '1111').toBeTrue();
                expect(response.authors.includes('Bende Psita')).toBeTrue();
                expect(response.authors.length == 3).toBeTrue();
            });            
            const req = httpMock.expectOne(`http://localhost:3500/books/${1111}`);
            expect(req.request.method).toEqual('PUT', "method not PUT");            
            req.flush(updatableBook);
        });

        it('deletes existing book', () => {
            service.deleteBook('34324233').subscribe(response => {
                console.log("response:",response);
            });
            const req = httpMock.expectOne(`http://localhost:3500/books/${34324233}`);
            expect(req.request.method).toEqual('DELETE', "method not DELETE");     
            req.flush({}); 
        });

        // The server might reject the request for various reasons. Whenever it does it will return the error response with the HTTP Status Codes such as Unauthorized (401),
        //  Forbidden (403), Not found (404), internal Server Error (500), etc. The Angular assigns the error response to error property of the HttpErrorResponse.
        it('deletes non exisiting book', () => {
            const errorResponse = new HttpErrorResponse({
                error: '404 error',
                status: 404, statusText: 'Not Found'
              });

              service.deleteBook('34324233').subscribe(
               response => {
                   (error: HttpErrorResponse) => {
                       expect(error.status).toBe(404);
                   }
               }
                
            );

            const req = httpMock.expectOne(`http://localhost:3500/books/${34324233}`);
            expect(req.request.method).toEqual('DELETE', "method not DELETE");     
            req.flush(errorResponse); 
        });

        // it('filters a book', () => {
        //     service.findBooks('isbn', 'asc', 3, 0).subscribe(response => {
        //         expect(response).toBeTruthy();
        //     });
        //     const req = httpMock.expectOne(req => req.url == 'http://localhost:3500/books');
        //     expect(req.request.method).toEqual("GET");
        //     expect(req.request.params.get("pageNumber")).toEqual("3");    // checking the repo send pageNumber reuest param 3 really?
        //     expect(req.request.params.get("pageSize")).toEqual("0");
        //     expect(req.request.params.get("filter")).toEqual("isbn");
        //     expect(req.request.params.get("sortOrder")).toEqual("asc");
        //     req.flush(TESTBOOKS);
        // })

        it('login succeeds', () => {
            service.authenticate(UN, PW).subscribe(response =>{
                expect(response).toBeTrue();    // token felejtős mert azt a RestDS sem adja vissza, hanem tárolja és csak a true vagy false jön vissza!
                expect(service.auth_token == TOKEN).toBeTrue();
            });
            const req = httpMock.expectOne('http://localhost:3500/login');
            expect(req.request.method).toEqual('POST');
            req.flush(responseAuthenticationSuccess);    // ezt a json-t adná vissza sikeres auth kor a server
        });
    
        it('login fails', () => {
            service.authenticate(UN, 'a').subscribe(response => {
                expect(response).toBeFalse();    // token felejtős mert azt a RestDS sem adja vissza, hanem tárolja és csak a true vagy false jön vissza!
                expect(service.auth_token).toBeNull()
            });
            const req = httpMock.expectOne('http://localhost:3500/login');
            expect(req.request.method).toEqual('POST');
            req.flush(responseAuthenticationFails);
        });


        afterEach(() => {
            // prüfen, ob kein Request übrig geblieben ist
            httpMock.verify();
        });

});
