import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[higlightBook]'
})
export class BookDirective {

    bookDivWidth: number = 600;

    @HostBinding('style.width.px')
    get foo() {return this.bookDivWidth;}

    @HostListener('mouseenter')
    higlightMe() {
        console.log("clicker");
        this.bookDivWidth = 800;
    }

    @HostListener('mouseleave')
    higlightMeOut() {
        this.bookDivWidth = 600;
    }
}