import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionsComponent } from './accordions.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AccordionsComponent],
  exports: [AccordionsComponent]
})
export class NgsAccordionsModule { }
