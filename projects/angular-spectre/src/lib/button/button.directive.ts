import {Directive, ElementRef, Input} from '@angular/core';

export type BtnColor = 'primary' | 'success' | 'error' | 'link' | 'default';
export type BtnSize = 'md' | 'sm' | 'lg';

@Directive({
  selector: '[ngsButton]'
})

export class NgsButtonDirective {

  private _classNames: string = 'btn';

  constructor(private _elementRef: ElementRef<HTMLElement>) {
    this._elementRef.nativeElement.classList.add('btn');
  }

  private _color: BtnColor = 'default';

  @Input('color')
  set color(value: BtnColor) {
    this._color = value;
    if (this._color && this._color !== 'default') {
      this._addClass(`btn-${this._color}`);
    }
  }

  private _size: BtnSize = 'md';

  @Input('size')
  set size(value: BtnSize) {
    this._size = value;
    if (this._size && this._size !== 'md') {
      this._addClass(`btn-${this._size}`);
    }
  }

  private _disabled: boolean = false;

  @Input('disabled')
  set disabled(value) {
    this._disabled = value;
    if (this._disabled) {
      this._addClass('disabled');
    }
  }

  private _active: boolean = false;

  @Input('active')
  set active(value) {
    this._active = value;
    if (this._active) {
      this._addClass('active');
    }
  }

  private _fab: boolean = false;

  @Input('fab')
  set fab(value) {
    this._fab = value;
    if (this._fab) {
      this._addClass('btn-action');
      this._addClass('ngs-btn-circle');
    }
  }

  private _addClass(className) {
    this._elementRef.nativeElement.classList.add(className);
  }

}
