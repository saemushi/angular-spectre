import { Directive, HostBinding, Input, NgModule, OnInit, Renderer2, ElementRef} from '@angular/core';

@Directive({
    selector: 'ngs-popover, ngsPopover, [ngs-popover], [ngsPopover]'
})
export class NgsPopoverDirective implements OnInit{

    private _position: string = 'bottom';
    @Input('position')
    get position(): string{
        return this._position;
    }
    set position(value: string){
        this._position = value;
    }
    constructor(private el: ElementRef, private renderer: Renderer2){}
    ngOnInit(){
        this.renderer.addClass(this.el.nativeElement, 'popover');
        this.renderer.addClass(this.el.nativeElement, `popover-${this._position}`);
    }

}

@Directive({
    selector: 'ngs-popover-container, ngsPopoverContainer, [ngs-popover-container], [ngsPopoverContainer]'
})
export class NgsPopoverContainerDirective{
    @HostBinding('class.popover-container') class = true;
}


@NgModule({
    declarations: [
        NgsPopoverDirective,
        NgsPopoverContainerDirective
    ],
    exports: [
        NgsPopoverDirective,
        NgsPopoverContainerDirective
    ]
})

export class NgsPopoverModule { }
