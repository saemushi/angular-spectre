import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgsEmptyStateComponent,
  NgsEmptyStateActionDirective,
  NgsEmptyStateIconDirective,
  NgsEmptyStateSubtitleDirective,
  NgsEmptyStateTitleDirective
} from './emptyState';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgsEmptyStateComponent,
    NgsEmptyStateActionDirective,
    NgsEmptyStateIconDirective,
    NgsEmptyStateSubtitleDirective,
    NgsEmptyStateTitleDirective
  ],
  exports: [
    NgsEmptyStateComponent,
    NgsEmptyStateActionDirective,
    NgsEmptyStateIconDirective,
    NgsEmptyStateSubtitleDirective,
    NgsEmptyStateTitleDirective
  ]
})
export class NgsEmptyStateModule { }
