import { Directive, ElementRef, HostListener, inject, input } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'handleClick($event)'
    }
})

export class SafeLinkDirective {

    queryParam = input('myapp');

    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef)
    constructor() {
        console.log('SafeLinkDirective is active!');
    }
    //@HostListener('click', ['$event'])
    handleClick(event: MouseEvent) {
        console.log("HostListerner is working");
        const wantsToLeave = window.confirm('Do you want to leave the page ?');
        if (wantsToLeave) {
            //const address = (event.target as HTMLAnchorElement).href ;
            const address = this.hostElementRef.nativeElement.href
            this.hostElementRef.nativeElement.href  = address + '?from=' + this.queryParam();
            return;
        } else {
            event?.preventDefault();
        }
    }
}