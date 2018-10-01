import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgsTileComponent,
    NgsTileIconDirective,
    NgsTileContentDirective,
    NgsTileTitleDirective,
    NgsTileSubtitleDirective,
    NgsTileActionDirective,
} from './tile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgsTileComponent,
    NgsTileIconDirective,
    NgsTileContentDirective,
    NgsTileTitleDirective,
    NgsTileSubtitleDirective,
    NgsTileActionDirective,
  ],
  exports: [
    NgsTileComponent,
    NgsTileIconDirective,
    NgsTileContentDirective,
    NgsTileTitleDirective,
    NgsTileSubtitleDirective,
    NgsTileActionDirective,
  ]
})
export class NgsTileModule { }
