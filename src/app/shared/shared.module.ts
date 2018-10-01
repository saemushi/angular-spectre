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
    NgsEmptyStateModule,
    NgsIconsModule,
    NgsPaginationModule,
    FormInputModule,
    NgsTooltipModule,
    TooltipModule,
    NgsModalModule,
    NgsToggleModule,
    NgsMenuModule
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
    NgsEmptyStateModule,
    NgsIconsModule,
    NgsPaginationModule,
    FormInputModule,
    NgsTooltipModule,
    TooltipModule,
    NgsModalModule,
    NgsToggleModule,
    NgsMenuModule
];

@NgModule({
    imports: ngsModules,
    exports: ngsModules
})
export class SharedModule {}
