import { Component } from "@angular/core";
import { ErrortransferService } from "./errortransfer.service";

@Component({
    template: ` <div>{{errorMessage}}</div>
                <div *ngIf="name">Name:{{name}}</div>
                <div *ngIf="stack">Stacktrace: <br/>
                    {{stack}}
                </div>
                <div *ngIf="status">Status: {{status}}</div>
                <div *ngIf="statusText">Statustext: {{statusText}}</div>
              `
})
export class ErrorComponent {
    errorMessage: string;
    name?: string;
    stack?: string;
    status?: string;
    statusText?: string;

    constructor(private errortransferService: ErrortransferService) {

        this.clearAll();

        this.errorMessage = errortransferService.getMessage();
        this.name = errortransferService.getName();
        this.stack = errortransferService.getStack();
        this.status = errortransferService.getStatus();
        this.statusText = errortransferService.getStatusText();
    }

    private clearAll(): void {
        this.errorMessage = null;
        this.name = null;
        this.stack = null;
        this.status = null;
        this.statusText = null;
    }

}