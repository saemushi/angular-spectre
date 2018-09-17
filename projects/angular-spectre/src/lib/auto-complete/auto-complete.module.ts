import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteComponent } from './auto-complete.component';
import { NGSLabelModule } from './../directives/label.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NGSLabelModule
  ],
  declarations: [AutoCompleteComponent],
  exports: [AutoCompleteComponent]
})
export class AutoCompleteModule { }
