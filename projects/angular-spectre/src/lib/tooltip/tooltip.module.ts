import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgsTooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgsTooltipDirective],
  exports: [NgsTooltipDirective]
})
export class NgsTooltipModule { }
