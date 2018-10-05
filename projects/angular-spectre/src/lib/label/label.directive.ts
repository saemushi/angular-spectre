import {Directive, HostBinding, NgModule} from '@angular/core';

@Directive({
  selector: '[ngsLabel]'
})
export class LabelDirective {
  @HostBinding('class')
  public defaultClass = 'form-label';
}

@NgModule({
  declarations: [LabelDirective],
  exports: [LabelDirective]
})
export class NgsLabelModule {
}
