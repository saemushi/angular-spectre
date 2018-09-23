import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LandingComponent } from './landing/landing.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { ChipComponent } from './chip/chip.component';
import { IconsComponent } from './icons/icons.component';

import { TooltipBasicComponent } from './tooltipBasic/tooltipBasic.component';
import { TooltipComponent } from './tooltip/tooltip.component';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'intro', component: LandingComponent },
  { path: 'badge', component: BadgeComponent },
  { path: 'button', component: ButtonComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'tooltip', component: TooltipComponent },
  { path: 'tooltipBasic', component: TooltipBasicComponent },
  { path: 'auto-complete', component: AutoCompleteComponent },
  { path: 'form-input', component: AutoCompleteComponent },
  { path: 'chip', component: ChipComponent },
  { path: 'icons', component: IconsComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
