import { Component, HostBinding, Input, NgModule } from '@angular/core';

@Component({
    selector: 'ngs-nav',
    template: '<ng-content></ng-content>'
})
export class NgsNavComponent {
    @HostBinding('class.nav') class: boolean = true;
}

@Component({
    selector: 'ngs-nav-item',
    template: '<a href="{{link}}"><ng-content></ng-content></a>'
})
export class NgsNavItemComponent {

    @Input('link') link: string = '#';
    @HostBinding('class.nav-item') class: boolean = true;
    @HostBinding('class.active') @Input() active: boolean = false;
}

@NgModule({
    declarations: [
        NgsNavComponent,
        NgsNavItemComponent
    ],
    exports: [
        NgsNavComponent,
        NgsNavItemComponent
    ]
})

export class NgsNavModule { }
