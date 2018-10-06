import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LandingComponent } from './landing/landing.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { AvatarComponent } from './avatar/avatar.component';
import { BadgeComponent } from './badge/badge.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './button/button.component';
import { ChipComponent } from './chip/chip.component';
import { CardComponent } from './card/card.component';
import { DividerComponent } from './divider/divider.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { IconsComponent } from './icons/icons.component';
import { ModalComponent } from './modal/modal.component';
import { MenuComponent } from './menu/menu.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PanelComponent } from './panel/panel.component';
import { PopoverComponent } from './popover/popover.component';
import { TooltipBasicComponent } from './tooltipBasic/tooltipBasic.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { ToastComponent } from './toast/toast.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AccordionComponent,
    AutoCompleteComponent,
    AvatarComponent,
    BadgeComponent,
    ButtonComponent,
    BreadcrumbsComponent,
    ChipComponent,
    CardComponent,
    DividerComponent,
    EmptyStateComponent,
    IconsComponent,
    ModalComponent,
    MenuComponent,
    PaginationComponent,
    PanelComponent,
    PopoverComponent,
    ToastComponent,
    TooltipBasicComponent,
    TooltipComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
