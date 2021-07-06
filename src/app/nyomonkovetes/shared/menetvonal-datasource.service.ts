import { Injectable } from '@angular/core';
import { Observable, of, throwError } from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import { catchError, map, retry } from "rxjs/operators";
import { Menetvonal } from "../../nyomonkovetes/shared/menetvonal";

const PROTOCOL = "http";
const PORT = 3500;
const API = `${PROTOCOL}://localhost:${PORT}`;

@Injectable({
  providedIn: 'root'
})
export class MenetvonalDatasourceService {

  constructor(private http: HttpClient) { }

  getMenetvonalak(): Observable<Menetvonal[]> {
    return this.http.get<Menetvonal[]>(`${API}/menetvonalak`).pipe(
      retry(3),
      catchError((err: Response) => throwError(` http status code: ${err.status} - ${err.statusText} - ${err.url}`) )
    );
  }


}
