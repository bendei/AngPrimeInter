import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ErrortransferService {

    private message: string;

    getMessage(): string {
        return this.message;
    }

    clearAll(): void {
        this.message = null;
    }

    setMessage(msg: string): void {
        this.message = msg;
    }



}