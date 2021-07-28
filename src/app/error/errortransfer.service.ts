import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ErrortransferService {

    private message: string;

    getMessage(): string {
        return this.message;
    }

    setMessage(msg: string): void {
        this.message = null;
        this.message = msg;
    }



}