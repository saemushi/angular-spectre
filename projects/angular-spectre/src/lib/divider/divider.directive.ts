import { Directive, Input, NgModule, Renderer2, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DividerPosition = 'vert' | 'hori';
export type DividerContentPosition = 'left' | 'center' | 'right';

@Directive({
    selector: 'ngsDivider, ngs-divider, [ngsDivider], [ngs-divider]'
})
export class NgsDividerDirective implements OnInit {
    @Input() dPos: DividerPosition = 'hori';
    @Input() cPos: DividerContentPosition = 'center';
    @Input() content: string = '';

    constructor(private ele: ElementRef, private renderer: Renderer2) { }
    ngOnInit() {
        if (this.dPos === 'vert') {
            this.renderer.addClass(this.ele.nativeElement, 'divider-vert');
        } else {
            this.renderer.addClass(this.ele.nativeElement, 'divider');
        }
        if (this.content !== '') {
            this.renderer.setAttribute(this.ele.nativeElement, 'data-content', this.content);
        }
        this.renderer.addClass(this.ele.nativeElement, `text-${this.cPos}`);
    }
}

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgsDividerDirective
    ],
    exports: [
        NgsDividerDirective
    ]
})

export class NgsDividerModule { }

