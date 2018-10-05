import {CommonModule} from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  NgModule,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {NgsMenuBadgeDirective, NgsMenuDividerDirective, NgsMenuItemComponent} from './menu.directives';
import {Overlay, OverlayRef, ScrollStrategy} from '@angular/cdk/overlay';
import {Subject, Subscription} from 'rxjs';
import {TemplatePortal} from '@angular/cdk/portal';
import {NgsToggleDirective, NgsToggleModule} from '../toggle/toggle.directive';
import {OverlaySettings} from '../services/overly-settings';
import {OverlayService} from './../services/overlay-service';
import {takeUntil} from 'rxjs/operators';

/** Injection token that determines the scroll handling while the menu is open. */
export const MAT_MENU_SCROLL_STRATEGY =
  new InjectionToken<() => ScrollStrategy>('mat-menu-scroll-strategy');

/** @docs-private */
export function MAT_MENU_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: MAT_MENU_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: MAT_MENU_SCROLL_STRATEGY_FACTORY,
};

@Component({
  selector: 'ngs-menu',
  exportAs: 'ngsMenu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class NgsMenuComponent implements OnInit, AfterContentInit, OnDestroy {
  @ViewChild(NgsToggleDirective)
  public toggleRef: NgsToggleDirective;
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
  /** Event emitted when the associated menu is opened. */
  @Output() readonly menuOpened: EventEmitter<void> = new EventEmitter<void>();
  /** Event emitted when the associated menu is closed. */
  @Output() readonly menuClosed: EventEmitter<void> = new EventEmitter<void>();
  protected destroy$ = new Subject<boolean>();
  private backdropClass: string = 'cdk-overlay-transparent-backdrop';
  private _closeSubscription = Subscription.EMPTY;
  private _hoverSubscription = Subscription.EMPTY;
  private _defaultOverlaySettings: OverlaySettings;
  private _element: ElementRef;

  constructor(private _overlay: Overlay,
              private _viewContainerRef: ViewContainerRef,
              @Inject(MAT_MENU_SCROLL_STRATEGY) private _scrollStrategy,
              private overlayService: OverlayService) {
    this._defaultOverlaySettings = this.overlayService.getDefaultSettings();
  }

  private _overlayRef: OverlayRef | null = null;

  get overlayRef(): OverlayRef {
    return this.toggleRef._overlayRef;
  }

  get menuOpen(): boolean {
    return !this.toggleRef.collapsed;
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.toggleRef.onClosing.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitCloseFromMenu());
  }

  emitCloseFromMenu() {
    this.menuClosed.emit();
  }

  ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }

    this._cleanUpSubscriptions();
  }

  triggersSubmenu(): boolean {
    return true;
    // return !!(this._menuItemInstance && this._parentMenu);
  }

  openMenu(settings: OverlaySettings = this._defaultOverlaySettings, targetElement?: ElementRef): void {
    if (this.menuOpen) {
      return;
    }
    let positionConfig: OverlaySettings;
    if (targetElement) {
      this._element = targetElement;
      positionConfig = this.getOverlayConfig(targetElement);
    }
    const config = this.overlayService.getOverlaySettings(positionConfig, settings);

    config.portal = new TemplatePortal(this.templateRef, this._viewContainerRef);
    this.menuOpened.emit();
    this.toggleRef.toggle(config);
    // const overlayRef = this.createOverlay(config);
    // this._setPosition(this.overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy);
    // overlayRef.attach(this._portal);
  }

  // createOverlay(config) {
  //   if (!this._overlayRef) {
  //     this._portal = new TemplatePortal(this.templateRef, this._viewContainerRef);
  //     // this._subscribeToPositions(config.positionStrategy as FlexibleConnectedPositionStrategy);
  //     this._overlayRef = this.overlayService.createOverlay(config);
  //   }

  //   return this._overlayRef;
  // }

  getOverlayConfig(elementRef: ElementRef) {
    return new OverlaySettings({
      positionStrategy: this._overlay.position()
        .flexibleConnectedTo(this._element)
        .withTransformOriginOn('.ngs-menu')
        .withFlexibleDimensions(false)
        .withViewportMargin(8)
        .withPush(false),
      elementRef,
      scrollStrategy: this._scrollStrategy(),
      backdropClass: this.backdropClass,
    });
  }

  /** Closes the menu. */
  closeMenu(): void {
    this.menuClosed.emit();
    this.toggleRef.close();
  }

  toggleMenu(): void {
    return this.menuOpen ? this.closeMenu() : this.openMenu();
  }

  /**
   * Toggles the menu
   *
   * ```typescript
   * this.menu.toggle();
   * ```
   */
  toggle(overlaySettings?: OverlaySettings) {
    if (!this.menuOpen) {
      this.openMenu(overlaySettings);
    } else {
      this.closeMenu();
    }
  }

  /** Cleans up the active subscriptions. */
  private _cleanUpSubscriptions(): void {
    this._closeSubscription.unsubscribe();
    this._hoverSubscription.unsubscribe();
  }

}


@NgModule({
  declarations: [NgsMenuComponent, NgsMenuDividerDirective, NgsMenuItemComponent, NgsMenuBadgeDirective],
  exports: [NgsMenuComponent, NgsMenuDividerDirective, NgsMenuItemComponent, NgsMenuBadgeDirective],
  providers: [MAT_MENU_SCROLL_STRATEGY_FACTORY_PROVIDER],
  imports: [CommonModule, NgsToggleModule]
})
export class NgsMenuModule {
}
