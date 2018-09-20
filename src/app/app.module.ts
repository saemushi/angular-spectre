import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PaginationModule, NgsDirectivesModule, TooltipModule } from 'angular-spectre';



import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LandingComponent } from './landing/landing.component';

import { TooltipBasicComponent } from './tooltipBasic/tooltipBasic.component';
import { TooltipComponent } from './tooltip/tooltip.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BadgeComponent } from './badge/badge.component';

@NgModule({
  declarations: [
    AppComponent, PaginationComponent, LandingComponent, TooltipBasicComponent, TooltipComponent, BadgeComponent
  ],
  imports: [
    BrowserModule, PaginationModule, AppRoutingModule, BrowserAnimationsModule, TooltipModule, NgsDirectivesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
