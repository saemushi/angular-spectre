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
import { BarComponent } from './bar/bar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './button/button.component';
import { ChipComponent } from './chip/chip.component';
import { CardComponent } from './card/card.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { IconsComponent } from './icons/icons.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PanelComponent } from './panel/panel.component';
import { RadioComponent } from './radio/radio.component';
import { TooltipBasicComponent } from './tooltipBasic/tooltipBasic.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { ModalComponent } from './modal/modal.component';
import { TileComponent } from './tile/tile.component';
import { NavComponent } from './nav/nav.component';
import { StepComponent } from './step/step.component';
import { PopoverComponent } from './popover/popover.component';
import { TabComponent } from './tab/tab.component';
import { DividerComponent } from './divider/divider.component';
import { FormsModule } from '@angular/forms';

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
    EmptyStateComponent,
    IconsComponent,
    PaginationComponent,
    PanelComponent,
    RadioComponent,
    TooltipBasicComponent,
    TooltipComponent,
    ModalComponent,
    TileComponent,
    NavComponent,
    StepComponent,
    PopoverComponent,
    TabComponent,
    BarComponent,
    DividerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
