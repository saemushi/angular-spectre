import { Component, HostBinding, Input, NgModule } from '@angular/core';

@Component({
    selector: 'ngs-step',
    template: '<ng-content></ng-content>'
})
export class NgsStepComponent {
    @HostBinding('class.step') class: boolean = true;
}

@Component({
    selector: 'ngs-step-item',
    template: '<a href="{{link}}"><ng-content></ng-content></a>'
})
export class NgsStepItemComponent {

    @Input('link') link: string = '#';
    @HostBinding('class.step-item') class: boolean = true;
    @HostBinding('class.active') @Input() active: boolean = false;
}

@NgModule({
    declarations: [
        NgsStepComponent,
        NgsStepItemComponent
    ],
    exports: [
        NgsStepComponent,
        NgsStepItemComponent
    ]
})

export class NgsStepModule { }
