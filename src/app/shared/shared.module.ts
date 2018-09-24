import { NgModule } from '@angular/core';
import {
    PaginationModule,
    FormInputModule,
    AutoCompleteModule,
    ChipModule,
    TooltipModule,
    NgsDirectivesModule,
    NgsAvatarModule
} from 'angular-spectre';

const ngsModules = [
    PaginationModule,
    FormInputModule,
    AutoCompleteModule,
    ChipModule,
    TooltipModule,
    NgsDirectivesModule,
    NgsAvatarModule
];

@NgModule({
    imports: ngsModules,
    exports: ngsModules
})
export class SharedModule {}
