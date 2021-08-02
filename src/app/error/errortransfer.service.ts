import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ErrortransferService {

    private message: string;
    private name: string;
    private stack?: string;
    private status?: string;
    private statusText?: string;

    clearAll(): void {
        this.message = null;
        this.name = null;
        this.stack = null;
        this.status = null;
        this.statusText = null;
    }

    getMessage(): string {
        return this.message;
    }

    setMessage(msg: string): void {
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

    getStatus(): string {
        return this.status;
    }
    
    setStatus(st: string): void {
        this.status = st;
    }

    getStatusText(): string {
        return this.statusText;
    }

    setStatusText(stt: string): void {
        this.statusText = stt;
    }


}