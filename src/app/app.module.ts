import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'angular-spectre';
import { NgsBadgeModule } from 'angular-spectre';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
  declarations: [
    AppComponent, PaginationComponent, LandingComponent
  ],
  imports: [
    BrowserModule, PaginationModule, AppRoutingModule, NgsBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
