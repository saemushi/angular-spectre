import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'angular-spectre';
import { AutoCompleteModule } from 'angular-spectre';
import { FormInputModule } from 'angular-spectre';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LandingComponent } from './landing/landing.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';

@NgModule({
  declarations: [
    AppComponent, PaginationComponent, LandingComponent, AutoCompleteComponent
  ],
  imports: [
    BrowserModule, PaginationModule, AppRoutingModule, FormInputModule, AutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
