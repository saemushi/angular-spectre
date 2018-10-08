import { Component, Output, EventEmitter, Directive, HostBinding, Input, HostListener } from '@angular/core';
import { NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { forwardRef } from '@angular/core';

@Component({
    selector: 'ngs-radio',
    template: `
    <label class="form-radio">
        <input type="radio" name="{{rName}}" value="{{rValue}}" [checked]="changeValue === rValue ? true : false " (change)=changeRadioValue(rValue) >
        <i class="form-icon"></i> <ng-content></ng-content>
    </label>
    `
})
export class NgsRadioComponent  {

    changeValue: string = '';
    rValue: string = '';
    rName: string = '';
    rModelName = {};
    rChecked: boolean = false;

    @Output() upValue: EventEmitter<string> = new EventEmitter<string>();

    @Input('value')
    set radioVale(value: string) {
        this.rValue = value;
    }
    get radioVale(): string {
        return this.rValue;
    }

    @Input('name')
    set radioName(value: string) {
        this.rName = value;
    }
    get radioName(): string {
        return this.rName;
    }

    @Input('checked')
    set radioChecked(value: boolean) {
        this.rChecked = value;
        if (this.rChecked === true) {
            this.changeValue = this.rValue;
        }
    }
    get radioChecked(): boolean {
        return this.rChecked;
    }


    changeRadioValue(value: string) {
        console.log('newVal:' + value);
        this.upValue.emit(value);
        this.changeValue = value;
    }


}

@NgModule({
    imports: [
    ],
    declarations: [
        NgsRadioComponent
    ],
    exports: [
        NgsRadioComponent,
    ]
})

export class NgsRadioModule { }
