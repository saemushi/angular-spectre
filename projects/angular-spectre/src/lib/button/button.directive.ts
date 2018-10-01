import { Directive, ElementRef, Input, OnInit, HostBinding, Component, NgModule } from '@angular/core';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { CommonModule } from '@angular/common';

export type BtnColor = 'primary' | 'success' | 'error' | 'link' | 'default';
export type BtnSize = 'md' | 'sm' | 'lg';

/**
 * Example:
 * <button ngsButton color="primary" size="md">Button - Medium</button>
 */

@Directive({
    selector: '[ngsButton]'
})
export class NgsButtonDirective {

    private _color: BtnColor = 'default';
    private _size: BtnSize = 'md';
    private _disabled: boolean = false;
    private _active: boolean = false;
    private _fab: boolean = false;
    private _loading: boolean = false;
    private _classNames: string = 'btn';

    /**
    * An @Input property that sets the value of the `color` attribute. Default color - primary.
    *```html
    * <button ngsButton color="primary">Primary</button>
    *```
    */
    @Input('color')
    set color(value: BtnColor) {
        this._color = value;
        if (this._color && this._color !== 'default') {
            this._addClass(`btn-${this._color}`);
        }
    }

    /**
    * An @Input property that sets the value of the `size` attribute. Default size - md.
    *```html
    * <button ngsButton size="lg">Button - Large</button>
    *```
    */
    @Input('size')
    set size(value: BtnSize) {
        this._size = value;
        if (this._size && this._size !== 'md') {
            this._addClass(`btn-${this._size}`);
        }
    }

    /**
    * An @Input property that sets the value of the `disabled` attribute. Default value - false.
    *```html
    * <button ngsButton size="lg" color="primary" disabled="true">Button - Large</button>
    *```
    */
    @Input('disabled')
    set disabled(value) {
        this._disabled = value;
        if (this._disabled) {
            this._addClass('disabled');
        }
    }

    /**
    * An @Input property that sets the value of the `active` attribute. Default value - false.
    *```html
    * <button ngsButton size="lg" active="true">Button - Large</button>
    *```
    */
    @Input('active')
    set active(value) {
        this._active = value;
        if (this._active) {
            this._addClass('active');
        }
    }

    /**
    * An @Input property that sets the value of the `fab` attribute. Default value - false.
    *```html
    * <button ngsButton color="primary" fab="true">Button - Large</button>
    *```
    */
    @Input('fab')
    set fab(value) {
        this._fab = value;
        if (this._fab) {
            this._addClass('btn-action');
            this._addClass('ngs-btn-circle');
        }
    }

    /**
    * An @Input property that sets the value of the `loading` attribute. Default value - false.
    *```html
    * <button ngsButton color="primary" size="md" loading="true">Button - Large</button>
    *```
    */
    @Input('loading')
    set loading(value) {
        this._loading = value;
        if (this._loading) {
            this._addClass('loading');
        }
    }

    constructor(private _elementRef: ElementRef<HTMLElement>) {
        this._elementRef.nativeElement.classList.add('btn');
    }

    private _addClass(className) {
        this._elementRef.nativeElement.classList.add(className);
    }

}

/**
* Button group component presents a group of buttons which can simpy display buttons in a block.
* Full width buttons can be implemented by using btn-group-block attribute
*```html
* <button ngsButton size="lg" active="true">Button - Large</button>
*```
*/
@Component({
    selector: 'ngs-btn-group',
    template: `<ng-content></ng-content>`,

})
export class NgsButtonGroupComponent implements OnInit {
    private _block: boolean = false;

    @Input('block')
    get addBlock(): boolean {
        return this._block;
    }
    set addBlock(value: boolean) {
        this._block = value;
    }

    constructor(private _btnGrp: ElementRef<HTMLElement>) { }
    ngOnInit() {
        this._btnGrp.nativeElement.classList.add('btn-group');
        if (this._block) {
            this._btnGrp.nativeElement.classList.add('btn-group-block');
        }
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [NgsButtonDirective, NgsButtonGroupComponent],
    exports: [NgsButtonDirective, NgsButtonGroupComponent]
})
export class NgsButtonModule { }
