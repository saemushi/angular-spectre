import { Component, Output, EventEmitter, Directive, HostBinding, Input, HostListener } from '@angular/core';

@Component({
    selector: 'ngs-radio',
    template: `
    <label class="form-radio">
        <input type="radio" name="{{radioName}}" value="{{radioValue}}" [checked]="radioChecked" [(ngModel)]="radioModelName[radioName]">
        <i class="form-icon"></i> <ng-content></ng-content>
    </label>
    `
})
export class NgsRadioComponent {

    radioValue: any = '';
    radioName: string = '';
    radioModelName = {};
    radioChecked: boolean = false;

    @Output() upValue: EventEmitter<string> = new EventEmitter<string>();

    @Input('value')
    set val(value: any) {
        this.radioValue = value;
    }
    get val(): any {
        return this.radioValue;
    }

    @Input('name')
    set name(value: string) {
        this.radioName = value;
    }
    get name(): string {
        return this.radioName;
    }

    @Input('checked')
    set checked(value: boolean) {
        this.radioChecked = value;
        this.radioModelName[this.radioName] = this.radioValue;
    }
    get checked(): boolean {
        return this.radioChecked;
    }

    @HostListener('window: load')
    @HostListener('change')
    change() {
        this.upValue.emit(this.radioModelName[this.radioName]);
    }


}
