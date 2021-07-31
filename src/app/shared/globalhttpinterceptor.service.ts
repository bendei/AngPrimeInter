import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrortransferService } from '../error/errortransfer.service';

@Injectable()
export class GlobalhttpinterceptorService implements HttpInterceptor {

  constructor(private router: Router, private errortransferService: ErrortransferService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    return next.handle(req).pipe(
      catchError((error) => {
        let handled: boolean = false;

        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:      //login
              this.router.navigateByUrl("/login");
              handled = true;
              break;
            case 403:     //forbidden
              this.router.navigateByUrl("/login");
              handled = true;
              break;
            case 404:     
              this.errortransferService.setMessage(error.message);
              this.router.navigateByUrl("/error");
              handled = true;
              break;
            default: 
              this.errortransferService.setMessage(error.message);
              this.router.navigateByUrl("/error");
              handled = true;
              break;
          }
        }
        else {
          this.errortransferService.setMessage(error.message);
          this.router.navigateByUrl("/error");
          handled = true;
        }

        return throwError(error.message);
      })
    )
  }
  
}
