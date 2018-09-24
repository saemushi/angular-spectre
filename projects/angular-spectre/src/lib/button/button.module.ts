import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgsButtonDirective } from './button.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgsButtonDirective],
  exports: [NgsButtonDirective]
})
export class NgsButtonModule { }
