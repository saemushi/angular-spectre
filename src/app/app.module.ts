import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgsAutoCompleteModule, NgsBadgeModule, NgsButtonModule, NgsChipModule,
FormInputModule, NgsIconsModule, NgsPaginationModule, NgsTooltipModule, TooltipModule } from 'angular-spectre';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LandingComponent } from './landing/landing.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { ChipComponent } from './chip/chip.component';

import { TooltipBasicComponent } from './tooltipBasic/tooltipBasic.component';
import { TooltipComponent } from './tooltip/tooltip.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { IconsComponent } from './icons/icons.component';

@NgModule({
  declarations: [
    AppComponent, PaginationComponent, LandingComponent, TooltipBasicComponent,
    TooltipComponent, BadgeComponent, AutoCompleteComponent, ChipComponent, ButtonComponent, IconsComponent
  ],
  imports: [
    BrowserModule, NgsPaginationModule, AppRoutingModule, BrowserAnimationsModule, FormInputModule,
    NgsAutoCompleteModule, NgsChipModule, NgsBadgeModule, NgsButtonModule, NgsIconsModule, NgsTooltipModule, TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
