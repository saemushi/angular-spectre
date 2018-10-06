import { NgModule } from '@angular/core';
import {
    NgsAccordionModule,
    NgsAutoCompleteModule,
    NgsAvatarModule,
    NgsBadgeModule,
    NgsBreadcrumbsModule,
    NgsButtonModule,
    NgsCardModule,
    NgsChipModule,
    NgsDividerModule,
    NgsEmptyStateModule,
    NgsIconsModule,
    FormInputModule,
    NgsModalModule,
    NgsMenuModule,
    NgsPaginationModule,
    NgsPanelModule,
    NgsPopoverModule,
    NgsToastModule,
    NgsToggleModule,
    NgsTooltipModule,
    TooltipModule,
    NgsSpinnerModule
} from 'angular-spectre';

const ngsModules = [
    NgsAccordionModule,
    NgsAutoCompleteModule,
    NgsAvatarModule,
    NgsBadgeModule,
    NgsBreadcrumbsModule,
    NgsButtonModule,
    NgsCardModule,
    NgsChipModule,
    NgsDividerModule,
    NgsEmptyStateModule,
    NgsIconsModule,
    FormInputModule,
    NgsModalModule,
    NgsMenuModule,
    NgsPaginationModule,
    NgsPanelModule,
    NgsPopoverModule,
    NgsToastModule,
    NgsToggleModule,
    NgsTooltipModule,
    TooltipModule,
    NgsSpinnerModule
];

@NgModule({
    imports: ngsModules,
    exports: ngsModules
})
export class SharedModule {}
