import { NgsChipModule } from './../chip/chip.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteComponent } from './auto-complete.component';
import { NgsLabelModule } from './../label/label.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgsLabelModule,
    NgsChipModule
  ],
  declarations: [AutoCompleteComponent],
  exports: [AutoCompleteComponent]
})
export class NgsAutoCompleteModule { }
