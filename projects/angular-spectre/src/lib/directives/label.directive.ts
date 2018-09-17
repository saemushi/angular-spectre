import { Directive, HostBinding, NgModule } from '@angular/core';

@Directive({
    selector: 'ngs-label'
})
export class LabelDirective {
    @HostBinding('class')
    public defaultClass = 'form-label';
}

@NgModule({
    declarations: [LabelDirective],
    exports: [LabelDirective]
})
export class NGSLabelModule { }
