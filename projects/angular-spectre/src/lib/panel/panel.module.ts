import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgsPanelComponent,
    NgsPanelNavDirective,
    NgsPanelHeaderDirective,
    NgsPanelTitleDirective,
    NgsPanelBodyDirective,
    NgsPanelFooterDirective
} from './panel.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgsPanelComponent,
        NgsPanelNavDirective,
        NgsPanelTitleDirective,
        NgsPanelHeaderDirective,
        NgsPanelBodyDirective,
        NgsPanelFooterDirective
    ],
    exports: [
        NgsPanelComponent,
        NgsPanelNavDirective,
        NgsPanelTitleDirective,
        NgsPanelHeaderDirective,
        NgsPanelBodyDirective,
        NgsPanelFooterDirective
    ]
})

export class NgsPanelModule { }
