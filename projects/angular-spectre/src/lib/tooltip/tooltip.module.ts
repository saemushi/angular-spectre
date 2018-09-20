import {OverlayModule} from '@angular/cdk/overlay';
import {A11yModule} from '@angular/cdk/a11y';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
  TooltipDirective,
  TooltipComponent,
  NGS_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
} from './tooltip';

@NgModule({
  imports: [
    A11yModule,
    CommonModule,
    OverlayModule,
  ],
  exports: [TooltipDirective, TooltipComponent ],
  declarations: [TooltipDirective, TooltipComponent],
  entryComponents: [TooltipComponent],
  providers: [NGS_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
export class TooltipModule {}
