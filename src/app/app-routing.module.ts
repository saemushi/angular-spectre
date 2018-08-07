import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginationComponent } from './pagination/pagination.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'intro', component: LandingComponent },
  { path: 'pagination', component: PaginationComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
