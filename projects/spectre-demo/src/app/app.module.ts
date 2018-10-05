import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {AppComponent} from './app.component';

import {AccordionsComponent} from './components/accordions/accordions.component';
import {AutoCompleteComponent} from './experimentals/auto-complete/auto-complete.component';
import {AvatarComponent} from './components/avatar/avatar.component';
import {BadgeComponent} from './components/badge/badge.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {ButtonComponent} from './elements/button/button.component';
import {ChipComponent} from './components/chip/chip.component';
import {CardComponent} from './components/card/card.component';
import {EmptyStateComponent} from './components/empty-state/empty-state.component';
import {IconsComponent} from './elements/icons/icons.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {TooltipBasicComponent} from './extra/tooltipBasic/tooltipBasic.component';
import {TooltipComponent} from './components/tooltip/tooltip.component';
import {ModalComponent} from './components/modal/modal.component';
import {MenuComponent} from './components/menu/menu.component';
import {ToastComponent} from './components/toast/toast.component';
import {SpinnerComponent} from './extra/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    AccordionsComponent,
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
    TooltipBasicComponent,
    TooltipComponent,
    ModalComponent,
    MenuComponent,
    ToastComponent,
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
export class AppModule {
}
