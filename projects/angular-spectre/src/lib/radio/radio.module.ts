import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    NgsRadioComponent
} from './radio.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        NgsRadioComponent
    ],
    exports: [
        NgsRadioComponent,
    ]
})

export class NgsRadioModule { }
