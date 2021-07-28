import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import { catchError, map, retry } from "rxjs/operators";
import {ProductFactory} from "../store/shared/ProductFactory";
import {BookFactory} from "../book/shared/BookFactory";
import { Book } from "../book/shared/book";
import { Product } from "../store/shared/product";
import { Order } from "../store/shared/order.model";
import { Category } from "../shared/category";

const PROTOCOL = "http";
const PORT = 3500;
const API = `${PROTOCOL}://localhost:${PORT}`;
const RISURL: string = "http://localhost:59661/api/token";

@Injectable({
    providedIn: "root"
})
export class RestDataSource {

    auth_token: string = null;
    
    constructor(private http: HttpClient) {
    }

    get404StatusCode(): Observable<string> {
        return this.http.get<string>(`${API}/kamu`).pipe(
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }
   
    // wir (type)parametisieren das Observable, und geben an in welcher Form die Daten vom Datenstrom geliefert werden.
    getProducts(): Observable<Product[]> {  // !!! Dieses geben wir zurück
        // ebenso können wir das HTTPClient type parametisieren, um anzugeben , in welcher Form die Daten vom Server strukturiert sind.
        // Den Typ der HTTP-Antwort können wir als Type Parameter an dem HTTPClient übergeben
        // damit definiren wir, wie die Daten vom Server tatsächlich strukturiert sind

        // Das Antwort hat ein Array von Product elementen, derer releaseDate Eigenschaft als string vom Server geliefert wird. Wir brauchen aber releaseDate als js Date Objekte im Product Objekten =>
        // wir müssen die ArrayElemente durchsuchen und die string Werte in js Date umwandeeln: wir verwenden dazu pipe() und map Methoden (RxJS und Array.map())
        return this.http.get<Product[]>(`${API}/products`) // !!! get<Product[]> dieses wird vom Server geschickt
        .pipe(
            retry(3),
            map(rawProducts => rawProducts
                .map(prod => // javascript: implicit return: ha csak 1 sorból áll a function body
                    // lent: ha objektumot adunk vissza akkor () köé kell tenni
                    //({id: 2312312, name: "nnn", category: "cat", description: "de", price: 33, releaseDate: new Date()})

                ProductFactory.convertRawToProduct(prod)    //miért nem lehet itt return statement használni?
                                                            // !!! megnézni hogy hogyan mapeljük ha több json tokenbő áll a válasz nem csak egyből
                                                            // https://stackoverflow.com/questions/66018616/how-can-i-use-map-operator-to-add-a-new-field-to-an-object-into-an-array-returne


                )
            ),
            // a catchError operator átad egy error objektumot a callbacként megadott functionnak: ezt mi loggolhatjuk tovább dobhatjuk stb.
            //catchError(error => of<any>('hahah'))                // catchError szintén egy Observable-t adi vissza, méghozzá Product[] tipusút
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
            );
    }

    getBook(id: string): Observable<Book> {
        return this.http.get<Book>(`${API}/books/${id}`).pipe(
            retry(3),
            map(book => BookFactory.convertBook(book)),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(`${API}/books`).pipe(
            retry(3),
            map(rawBook => 
                rawBook.map(book => BookFactory.convertBook(book))),
                catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
            );
    }

    saveBook(book: Book): Observable<Book> {
        return this.http.post<Book>(`${API}/books`, book).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    updateBook(book: Book): Observable<Book> {
        return this.http.put<Book>(`${API}/books/${book.id}`, book).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    deleteBook(isbn: string): Observable<any> { //semmit nem küld vissza, mert eppen toroltuk a bookot? ha siekres status code 200 OK, ha nincs ilyen 404
        return this.http.delete(`${API}/books/${isbn}`, {
            responseType: "text", 
        }).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    findBooks(filter: string, sortOrder: string, pageNumber: number, pageSize: number): Observable<Book[]> {
        return this.http.get<Book[]>(`${API}/books`, {
            params: new HttpParams()
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
                .set('sortOrder', sortOrder)
                .set('filter', filter)
        }).pipe(
            retry(3),
            map(rawBook => 
                rawBook.map(book => BookFactory.convertBook(book))),
                catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
            );
    }

    // getProduct(id: number): Observable<Product> {
    //     return this.http.get<Product>(`${api}/products/${id}`,  this.createOptions()).pipe(
    //         retry(3),
    //         catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
    //     );
    // } 

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(`${API}/categories`).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${API}/products/${id}`).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    } 

    saveProduct(prod: Product): Observable<Product> {
        return this.http.post<Product>(`${API}/products`,prod).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    updateProduct(prod: Product): Observable<Product> {
        return this.http.put<Product>(`${API}/products/${prod.id}`, prod).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    deleteProduct(productID: number): Observable<any> {
        return this.http.delete<Product>(`${API}/products/${productID}`).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${API}/orders`).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    markShippedOrder(order: Order): Observable<Order> {
        return this.http.put<Order>(`${API}/orders/` + order.id, order).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    deleteOrder(id: number): Observable<Order> {
        return this.http.delete<Order>(`${API}/orders/` + id).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    saveOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${API}/orders`, order).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    // autocomplete
    getCountries(search: string): Observable<string[]> {
        return this.http.get<string[]>(`${API}/countries/${search}`).pipe(
            retry(3),
            catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
        );
    }

    authenticate(name: string, pw: string): Observable<boolean> {
        return this.http.post<any>(`${API}/login`, {
            name: name, password: pw
            }).pipe(
                retry(3),
                map(response => {
                    this.auth_token = response.success ? response.token : null;
                    return response.success;    //ez true/false
                    }),
                catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
            );
    }

    // private createOptions() {
    //     return {
    //         headers: new HttpHeaders({
    //             //"Authorization": `Bearer<${this.auth_token}>`,
    //             "Content-Type": "application/json"
    //         })
    //     }
    // }

// RIS 2 höz
//     authenticate(user: string, pw: string) {
//         this.http.post(this.baseURL + "/login",
//             {
//                 "AppID": "aacbb8b4-3268-4371-a035-c891f1b2a188",
//                 "name": "admin",
//                 "password": "secret"
//             },
//             {observe: "body", responseType: "json"}
//             ).subscribe(data  => {
//             console.log("POST Request is successful ", data);
//             },
//             error  => {
//                 console.log("Error", error);
//             });
//    }

   

}
