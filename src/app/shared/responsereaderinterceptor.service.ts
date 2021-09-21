import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError} from 'rxjs';
import { catchError, map, retry } from "rxjs/operators";

@Injectable()
export class ResponsereadernterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    return next.handle(req).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          console.log(event);
            
            return event;
          }
        })
      );
   
   
  }


}