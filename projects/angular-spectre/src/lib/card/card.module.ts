import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgsCardComponent,
    NgsCardHeaderDirective,
    NgsCardBodyDirective,
    NgsCardFooterDirective,
    NgsCardTitleDirective,
    NgsCardSubtitleDirective,
    NgsCardImgDirective
} from './card';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgsCardComponent,
    NgsCardHeaderDirective,
    NgsCardBodyDirective,
    NgsCardFooterDirective,
    NgsCardTitleDirective,
    NgsCardSubtitleDirective,
    NgsCardImgDirective
  ],
  exports: [
    NgsCardComponent,
    NgsCardHeaderDirective,
    NgsCardBodyDirective,
    NgsCardFooterDirective,
    NgsCardTitleDirective,
    NgsCardSubtitleDirective,
    NgsCardImgDirective
  ]
})
export class NgsCardModule { }
