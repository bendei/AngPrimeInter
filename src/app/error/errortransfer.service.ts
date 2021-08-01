import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ErrortransferService {

    private message: string;
    private name: string;
    private stack: string;

    getMessage(): string {
        return this.message;
    }

    setMessage(msg: string): void {
        this.message = null;
        this.message = msg;
    }

    getName(): string {
        return this.name;
    }

    setName(n: string): void {
        this.name = n;
    }

    getStack(): string {
        return this.stack;
    }

    setStack(st: string): void {
        this.stack = st;
    } 

}