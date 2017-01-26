import {Directive, Input, ElementRef, Inject} from  '@angular/core';
// Simple 'focus' Directive

@Directive({
    selector: '[focus]'
})
export class FocusDirective {
    @Input()
    focus:boolean;
    constructor(@Inject(ElementRef) private element: ElementRef) {}
    protected ngOnChanges() {

        if(this.focus)
        this.element.nativeElement.focus();
    }
}