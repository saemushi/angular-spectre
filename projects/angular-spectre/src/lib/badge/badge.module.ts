import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgsBadgeDirective } from './badge.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgsBadgeDirective],
  exports: [NgsBadgeDirective]
})
export class NgsBadgeModule { }
