import {ErrorHandler, Injectable, Injector} from "@angular/core";
import { Router } from "@angular/router";
import { ErrortransferService } from "./errortransfer.service";

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    router: Router;

    constructor(private injector: Injector, private errortransferService: ErrortransferService) {
        this.router = this.injector.get(Router);
    }

    handleError(error: any): void {
        this.errortransferService.clearAll();       
        this.errortransferService.setMessage(error.message);
        this.router.navigate(['/error']);
    }

}