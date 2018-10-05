import { NgModule } from '@angular/core';
import {
    NgsAccordionModule,
    NgsAutoCompleteModule,
    NgsAvatarModule,
    NgsBadgeModule,
    NgsBarModule,
    NgsBreadcrumbsModule,
    NgsButtonModule,
    NgsCardModule,
    NgsChipModule,
    NgsDividerModule,
    NgsEmptyStateModule,
    NgsIconsModule,
    NgsModalModule,
    NgsNavModule,
    NgsPaginationModule,
    NgsPanelModule,
    NgsPopoverModule,
    NgsRadioModule,
    FormInputModule,
    NgsStepModule,
    NgsTabModule,
    NgsTileModule,
    NgsToggleModule,
    NgsTooltipModule,
    TooltipModule,
} from 'angular-spectre';

const ngsModules = [
    NgsAccordionModule,
    NgsAutoCompleteModule,
    NgsAvatarModule,
    NgsBadgeModule,
    NgsBarModule,
    NgsBreadcrumbsModule,
    NgsButtonModule,
    NgsCardModule,
    NgsChipModule,
    NgsDividerModule,
    NgsEmptyStateModule,
    NgsIconsModule,
    NgsModalModule,
    NgsNavModule,
    NgsPaginationModule,
    NgsPanelModule,
    NgsPopoverModule,
    NgsRadioModule,
    FormInputModule,
    NgsStepModule,
    NgsTabModule,
    NgsTileModule,
    NgsToggleModule,
    NgsTooltipModule,
    TooltipModule
];

@NgModule({
    imports: ngsModules,
    exports: ngsModules
})
export class SharedModule { }
