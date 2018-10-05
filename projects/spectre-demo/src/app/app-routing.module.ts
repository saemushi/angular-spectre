import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AccordionsComponent} from './components/accordions/accordions.component';
import {AutoCompleteComponent} from './experimentals/auto-complete/auto-complete.component';
import {AvatarComponent} from './components/avatar/avatar.component';
import {BadgeComponent} from './components/badge/badge.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {ButtonComponent} from './elements/button/button.component';
import {CardComponent} from './components/card/card.component';
import {ChipComponent} from './components/chip/chip.component';
import {EmptyStateComponent} from './components/empty-state/empty-state.component';
import {IconsComponent} from './elements/icons/icons.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {TooltipBasicComponent} from './extra/tooltipBasic/tooltipBasic.component';
import {TooltipComponent} from './components/tooltip/tooltip.component';
import {ModalComponent} from './components/modal/modal.component';
import {MenuComponent} from './components/menu/menu.component';
import {ToastComponent} from './components/toast/toast.component';
import {SpinnerComponent} from './extra/spinner/spinner.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: '', redirectTo: 'intro', pathMatch: 'full'},
  {path: 'spectre', component: AppComponent},
  {path: 'accordion', component: AccordionsComponent},
  {path: 'auto-complete', component: AutoCompleteComponent},
  {path: 'form-input', component: AutoCompleteComponent},
  {path: 'avatar', component: AvatarComponent},
  {path: 'badge', component: BadgeComponent},
  {path: 'breadcrumbs', component: BreadcrumbsComponent},
  {path: 'button', component: ButtonComponent},
  {path: 'card', component: CardComponent},
  {path: 'chip', component: ChipComponent},
  {path: 'empty-state', component: EmptyStateComponent},
  {path: 'icons', component: IconsComponent},
  {path: 'pagination', component: PaginationComponent},
  {path: 'tooltip', component: TooltipComponent},
  {path: 'tooltipBasic', component: TooltipBasicComponent},
  {path: 'modal', component: ModalComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'toast', component: ToastComponent},
  {path: 'spinner', component: SpinnerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
