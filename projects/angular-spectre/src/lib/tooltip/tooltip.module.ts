import {OverlayModule} from '@angular/cdk/overlay';
import {A11yModule} from '@angular/cdk/a11y';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
//import {MatCommonModule} from '@angular/material/core';
import {
  ngsTooltip,
  TooltipComponent,
  NGS_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
} from './tooltip';

@NgModule({
  imports: [
    A11yModule,
    CommonModule,
    OverlayModule,
    //MatCommonModule,
  ],
  exports: [ngsTooltip, TooltipComponent, /*MatCommonModule*/ ],
  declarations: [ngsTooltip, TooltipComponent],
  entryComponents: [TooltipComponent],
  providers: [NGS_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
export class TooltipModule{}