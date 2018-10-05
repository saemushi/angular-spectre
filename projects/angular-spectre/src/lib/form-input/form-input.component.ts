import {CommonModule} from '@angular/common';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Input,
  NgModule,
  OnDestroy,
  Optional,
  Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormControlName, NG_VALUE_ACCESSOR, NgControl, NgModel} from '@angular/forms';

import {checkBooleanProperty} from '../core/utils';
import {Subscription} from 'rxjs';

const VALID_TYPES = [
  'color',
  // 'button',
  // 'checkbox',
  'date',
  'datetime-local',
  'email',
  // 'file',
  'hidden',
  // 'image',
  'month',
  'number',
  'password',
  // 'radio',
  // 'range',
  // 'reset',
  'search',
  // 'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
];
const nativeValidationAttributes = ['required', 'pattern', 'minlength', 'maxlength', 'min', 'max', 'step'];

export enum InputState {
  INITIAL,
  VALID,
  INVALID
}

let nextUniqueId = 0;

@Component({
  selector: 'ngs-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'formInput',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormInputComponent),
    multi: true
  }]
})
export class FormInputComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {

  isInput: boolean;
  isTextArea: boolean;
  onTouched: Function;
  @Input() name: string;
  @ViewChild('inputRef') inputRef: ElementRef;
  private _statusChanges$: Subscription;
  private _uniqueId: string = `ngs-input-${++nextUniqueId}`;
  @Input() id: string = this._uniqueId;
  private onChange: Function;

  constructor(
    @Optional() @Self() @Inject(NgModel) protected ngModel: NgModel,
    @Optional() @Self() @Inject(FormControlName) protected formControl: FormControlName,
    protected cdr: ChangeDetectorRef) {
  }

  private _valid: InputState;

  public get valid(): InputState {
    return this._valid;
  }

  public set valid(value: InputState) {
    this._valid = value;
  }

  private _type: string;

  @Input()
  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value || 'text';
    this.validateType();
  }

  private _required: boolean = false;

  @Input()
  get required(): boolean {
    return this._required;
  }

  set required(value: boolean) {
    this._required = checkBooleanProperty(value);
  }

  get value() {
    return this.nativeElement.value;
  }

  @Input('value')
  set value(value: any) {
    this.nativeElement.value = value;
  }

  public get disabled() {
    return this.nativeElement.hasAttribute('disabled');
  }

  @Input()
  public set disabled(value: boolean) {
    this.nativeElement.disabled = value;
  }

  get ngControl(): NgControl {
    return this.ngModel ? this.ngModel : this.formControl;
  }

  get nativeElement() {
    return this.inputRef.nativeElement;
  }

  get inputId(): string {
    return `${this.id || this._uniqueId}`;
  }

  public get focused() {
    return this.nativeElement.isFocused;
  }

  @HostListener('focus', ['$event'])
  public onFocus(event) {
    this.nativeElement.isFocused = true;
  }

  @HostListener('blur', ['$event'])
  public onBlur(event) {
    this.nativeElement.isFocused = false;
    this._valid = InputState.INITIAL;
    if (this.ngControl) {
      if (!this.ngControl.valid) {
        this._valid = InputState.INVALID;
      }
    } else if (this._hasValidators() && !this.nativeElement.checkValidity()) {
      this._valid = InputState.INVALID;
    }
  }

  @HostListener('input')
  public onInput() {
    if (!this.ngControl && this._hasValidators()) {
      this._valid = this.nativeElement.checkValidity() ? InputState.VALID : InputState.INVALID;
    }
  }

  public focus() {
    this.nativeElement.focus();
  }

  ngAfterViewInit() {
    if (this.ngControl) {
      this._statusChanges$ = this.ngControl.statusChanges.subscribe(this.onStatusChanged.bind(this));
    }
    this.cdr.detectChanges();
  }

  writeValue(value) {
    this.value = value;
    if (this.nativeElement && value) {
      this.nativeElement.value = value;
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  validateType() {
    if (this.type === 'textarea') {
      this.isTextArea = true;
    } else if (VALID_TYPES.indexOf(this.type) > -1) {
      this.isInput = true;
    }

    if (VALID_TYPES.indexOf(this.type) < 0) {
      throw Error(`Input type "${this.type}" isn't supported by matInput.`);
    }
  }

  ngOnDestroy() {
    if (this._statusChanges$) {
      this._statusChanges$.unsubscribe();
    }
  }

  protected onStatusChanged() {
    if (this.ngControl.control.validator || this.ngControl.control.asyncValidator) {
      if (this.ngControl.control.touched || this.ngControl.control.dirty) {
        if (this.nativeElement.isFocused) {
          // the user is still typing in the control
          this._valid = this.ngControl.valid ? InputState.VALID : InputState.INVALID;
        } else {
          // the user had touched the control previosly but now the value is changing due to changes in the form
          this._valid = this.ngControl.valid ? InputState.INITIAL : InputState.INVALID;
        }
      } else if (this._valid !== InputState.INITIAL) {
        this._valid = this.ngControl.valid ? InputState.INITIAL : InputState.INVALID;
      } else if (this._valid === InputState.INITIAL && this.ngControl.value !== undefined && this.ngControl.invalid) {
        this._valid = InputState.INVALID;
      }
    }
  }

  private _hasValidators(): boolean {
    for (const nativeValidationAttribute of nativeValidationAttributes) {
      if (this.nativeElement.hasAttribute(nativeValidationAttribute)) {
        return true;
      }
    }

    return !!this.ngControl && (!!this.ngControl.control.validator || !!this.ngControl.control.asyncValidator);
  }

}

@NgModule({
  declarations: [FormInputComponent],
  exports: [FormInputComponent],
  imports: [CommonModule]
})
export class FormInputModule {
}
