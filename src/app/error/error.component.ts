import { Component } from "@angular/core";
import { ErrortransferService } from "./errortransfer.service";

@Component({
    template: `<h2>Error occured: {{errorMessage}}</h2>
                <div>Name:{{name}}</div>
                <div>Stacktrace: <br/>
                    {{stack}}
                </div>
              `
})
export class ErrorComponent {
    errorMessage: string;
    name: string;
    stack: string;

    constructor(private errortransferService: ErrortransferService) {
        this.errorMessage = errortransferService.getMessage();
        this.name = errortransferService.getName();
        this.stack = errortransferService.getStack();
    }

}