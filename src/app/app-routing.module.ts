import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccordionComponent } from './accordion/accordion.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BarComponent } from './bar/bar.component';
import { BadgeComponent } from './badge/badge.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { ChipComponent } from './chip/chip.component';
import { DividerComponent } from './divider/divider.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { IconsComponent } from './icons/icons.component';
import { LandingComponent } from './landing/landing.component';
import { ModalComponent } from './modal/modal.component';
import { MenuComponent } from './menu/menu.component';
import { NavComponent } from './nav/nav.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PanelComponent } from './panel/panel.component';
import { PopoverComponent } from './popover/popover.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { StepComponent } from './step/step.component';
import { TabComponent } from './tab/tab.component';
import { TileComponent } from './tile/tile.component';
import { ToastComponent } from './toast/toast.component';
import { TooltipBasicComponent } from './tooltipBasic/tooltipBasic.component';
import { TooltipComponent } from './tooltip/tooltip.component';



const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { path: 'intro', component: LandingComponent },
  { path: 'accordion', component: AccordionComponent },
  { path: 'auto-complete', component: AutoCompleteComponent },
  { path: 'form-input', component: AutoCompleteComponent },
  { path: 'avatar', component: AvatarComponent },
  { path: 'bar', component: BarComponent },
  { path: 'badge', component: BadgeComponent },
  { path: 'breadcrumbs', component: BreadcrumbsComponent },
  { path: 'button', component: ButtonComponent },
  { path: 'card', component: CardComponent },
  { path: 'chip', component: ChipComponent },
  { path: 'divider', component: DividerComponent },
  { path: 'empty-state', component: EmptyStateComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'modal', component: ModalComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'nav', component: NavComponent },
  { path: 'pagination', component: PaginationComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'popover', component: PopoverComponent },
  { path: 'spinner', component: SpinnerComponent },
  { path: 'step', component: StepComponent },
  { path: 'tab', component: TabComponent },
  { path: 'tile', component: TileComponent },
  { path: 'toast', component: ToastComponent },
  { path: 'tooltip', component: TooltipComponent },
  { path: 'tooltipBasic', component: TooltipBasicComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
