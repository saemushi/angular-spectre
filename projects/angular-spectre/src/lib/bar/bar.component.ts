import { Component, Directive, HostBinding, Input, NgModule, ElementRef, Renderer2, OnInit } from '@angular/core';

export type barSizes = 'sm' | '';

@Component({
    selector: 'ngs-bar',
    template: '<ng-content></ng-content>'
})
export class NgsBarComponent implements OnInit {
    private _barSize: barSizes = '';
    private _barSlider: boolean = false;
    @Input('size')
    get barSize(): barSizes { 
        return this._barSize;
    }
    set barSize(value: barSizes) {
        this._barSize = value;
    }

    @Input('barSlider')
    get barSlider(): boolean {
        return this._barSlider;
    }
    set barSlider(value: boolean) {
        this._barSlider = value;
    }
    
    constructor(private ele: ElementRef, private renderer: Renderer2) { }
    ngOnInit() {
        this.renderer.addClass(this.ele.nativeElement, 'bar');
        if (this._barSize != '')
            this.renderer.addClass(this.ele.nativeElement, `bar-${this._barSize}`);
        if (this._barSlider)
        this.renderer.addClass(this.ele.nativeElement, 'bar-slider');
    }
}

@Directive({
    selector: '[ngsBarItem]'
})
export class NgsBarItemDirective implements OnInit {
    private _barWidth: number = 0;
    private _barColor: string = '';

    @Input('barWidth')
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

    @Input('barColor')
    get barColor(): string {
        return this._barColor;
    }
    set barColor(value: string) {
        this._barColor = value;
    }

    constructor(private eleR: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        console.log('c'+this._barColor+' w'+this._barWidth);
        this.renderer.addClass(this.eleR.nativeElement, 'bar-item');
        if(this._barColor != ''){
            this.renderer.setStyle(this.eleR.nativeElement, 'background', this._barColor);
        }
        this.renderer.setStyle(this.eleR.nativeElement, 'width', `${this._barWidth}%`);
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
