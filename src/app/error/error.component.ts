import { Component } from "@angular/core";
import { ErrortransferService } from "./errortransfer.service";

@Component({
    template: `<h2>Error occured: {{errorMessage}}</h2>`
})
export class ErrorComponent {
    errorMessage: string;

    constructor(private errortransferService: ErrortransferService) {
        this.errorMessage = errortransferService.getMessage();
    }

}