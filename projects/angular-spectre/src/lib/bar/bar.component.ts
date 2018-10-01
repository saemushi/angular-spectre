import { Component, Directive, HostBinding, Input, NgModule, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
    selector: 'ngs-bar',
    template: '<ng-content></ng-content>'
})
export class NgsBarComponent implements OnInit {
    private _barSize: string = '';
    @HostBinding('class.bar') bar: boolean = true;
    @Input('size')
    get barSize(): string {
        return this._barSize;
    }
    set barSize(value: string) {
        this._barSize = value;
    }
    constructor(private ele: ElementRef, private renderer: Renderer2) { }
    ngOnInit() {
        this.renderer.addClass(this.ele.nativeElement, 'bar');
        if (this._barSize != '')
            this.renderer.addClass(this.ele.nativeElement, `bar-${this._barSize}`);
    }
}

@Directive({
    selector: 'ngs-bar-item',
})
export class NgsBarItemDirective implements OnInit {
    private _barWidth: number = 0;
    private _barColor: string = '';

    @Input('width')
    get barWidth(): number {
        return this._barWidth;
    }
    set barWidth(value: number) {
        if (value < 0) {
            value = 0;
        }
        else if (value > 100) {
            value = 100;
        }
        this._barWidth = value
    }

    @Input('color')
    get barColor(): string {
        return this._barColor;
    }
    set barColor(value: string) {
        this._barColor = value;
    }

    constructor(private eleR: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.renderer.setStyle(this.eleR.nativeElement, 'width', `${this._barWidth}%`);
        this.renderer.setStyle(this.eleR.nativeElement, 'background', this._barWidth);
    }

}

@NgModule({
    declarations: [
        NgsBarComponent,
        NgsBarItemDirective
    ],
    exports: [
        NgsBarComponent,
        NgsBarItemDirective
    ]
})

export class NgsBarModule { }
