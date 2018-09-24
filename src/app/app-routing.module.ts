import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccordionComponent } from './accordion/accordion.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BadgeComponent } from './badge/badge.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './button/button.component';
import { ChipComponent } from './chip/chip.component';
import { IconsComponent } from './icons/icons.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LandingComponent } from './landing/landing.component';
import { TooltipBasicComponent } from './tooltipBasic/tooltipBasic.component';
import { TooltipComponent } from './tooltip/tooltip.component';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'intro', component: LandingComponent },
  { path: 'accordion', component: AccordionComponent },
  { path: 'auto-complete', component: AutoCompleteComponent },
  { path: 'form-input', component: AutoCompleteComponent },
  { path: 'avatar', component: AvatarComponent },
  { path: 'badge', component: BadgeComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'button', component: ButtonComponent },
  { path: 'chip', component: ChipComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'tooltip', component: TooltipComponent },
  { path: 'tooltipBasic', component: TooltipBasicComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
