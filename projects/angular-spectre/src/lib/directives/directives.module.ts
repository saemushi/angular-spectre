import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgsTooltipDirective } from './tooltip/tooltip.directive';
import { NgsBadgeDirective } from './badge/badge.directive';
// import { NgsButtonDirective } from './button/button.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgsBadgeDirective, NgsTooltipDirective],
  exports: [NgsBadgeDirective, NgsTooltipDirective]
})
export class NgsDirectivesModule { }
