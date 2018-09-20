import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginationComponent } from './pagination/pagination.component';
import { LandingComponent } from './landing/landing.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { ChipComponent } from './chip/chip.component';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'intro', component: LandingComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'auto-complete', component: AutoCompleteComponent },
  { path: 'form-input', component: AutoCompleteComponent },
  { path: 'chip', component: ChipComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
