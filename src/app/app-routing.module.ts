import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BadgeComponent } from './badge/badge.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LandingComponent } from './landing/landing.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { ChipComponent } from './chip/chip.component';

import { TooltipBasicComponent } from './tooltipBasic/tooltipBasic.component';
import { TooltipComponent } from './tooltip/tooltip.component';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'intro', component: LandingComponent },
  { path: 'badge', component: BadgeComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'tooltip', component: TooltipComponent },
  { path: 'tooltipBasic', component: TooltipBasicComponent },
  { path: 'auto-complete', component: AutoCompleteComponent },
  { path: 'form-input', component: AutoCompleteComponent },
  { path: 'chip', component: ChipComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
