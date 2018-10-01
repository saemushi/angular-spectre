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
    NgsEmptyStateModule,
    NgsIconsModule,
    NgsModalModule,
    NgsNavModule,
    NgsPaginationModule,
    NgsPanelModule,
    NgsPopoverModule,
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
    NgsEmptyStateModule,
    NgsIconsModule,
    NgsModalModule,
    NgsNavModule,
    NgsPaginationModule,
    NgsPanelModule,
    NgsPopoverModule,
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
