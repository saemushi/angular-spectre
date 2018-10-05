import {
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import {Location} from '@angular/common';
import {FlexibleConnectedPositionStrategy, Overlay, OverlayRef, ScrollStrategy,} from '@angular/cdk/overlay';
import {ComponentPortal, TemplatePortal} from '@angular/cdk/portal';
import {OverlaySettings} from '../services/overly-settings';
import {OverlayService} from './../services/overlay-service';

export const NGS_DIALOG_DEFAULT_OPTIONS =
  new InjectionToken<OverlaySettings>('mat-dialog-default-options');

export function SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
  () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

export const NGS_TOGGLE_SCROLL_STRATEGY =
  new InjectionToken<() => ScrollStrategy>('ngs-toggle-scroll-strategy');

export function NGS_TOGGLE_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
  () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

export const NGS_TOGGLE_SCROLL_STRATEGY_PROVIDER = {
  provide: NGS_TOGGLE_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: NGS_TOGGLE_SCROLL_STRATEGY_PROVIDER_FACTORY,
};

@Component({
  selector: 'ngs-toggle-component',
  template: ``,
})
export class ToggleComponent {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @Input()
  set content(value) {
    this.renderer.appendChild(this.elementRef.nativeElement, value);
  }
}

@Directive({
  exportAs: 'toggle',
  selector: '[ngsToggle]'
})
export class NgsToggleDirective implements OnDestroy {
  public _overlayRef: OverlayRef | null;
  _toggleInstance: ToggleComponent | null;
  _defaultOverlaySettings: OverlaySettings;
  /**
   * Emits an event after the toggle container is opened.
   *
   * ```typescript
   * onToggleOpened(event) {
   *    alert("Toggle opened!");
   * }
   * ```
   *
   * ```html
   * <div
   *   ngsToggle
   *   (onOpened)='onToggleOpened($event)'>
   * </div>
   * ```
   */
  @Output()
  public onOpened = new EventEmitter();

  /**
   * Emits an event before the toggle container is opened.
   *
   * ```typescript
   * onToggleOpening(event) {
   *  alert("Toggle opening!");
   * }
   * ```
   *
   * ```html
   * <div
   *   ngsToggle
   *   (onOpening)='onToggleOpening($event)'>
   * </div>
   * ```
   */
  @Output()
  public onOpening = new EventEmitter();

  /**
   * Emits an event after the toggle container is closed.
   *
   * ```typescript
   * onToggleClosed(event) {
   *  alert("Toggle closed!");
   * }
   * ```
   *
   * ```html
   * <div
   *   ngsToggle
   *   (onClosed)='onToggleClosed($event)'>
   * </div>
   * ```
   */
  @Output()
  public onClosed = new EventEmitter();

  /**
   * Emits an event before the toggle container is closed.
   *
   * ```typescript
   * onToggleClosing(event) {
   *  alert("Toggle closing!");
   * }
   * ```
   *
   * ```html
   * <div
   *  ngsToggle
   *  (onClosing)='onToggleClosing($event)'>
   * </div>
   * ```
   */
  @Output()
  public onClosing = new EventEmitter();

  /**
   * @hidden
   */
  constructor(
    private elementRef: ElementRef,
    private _overlay: Overlay,
    @Optional() private _location: Location,
    private overlayService: OverlayService,
    private viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    @Inject(NGS_TOGGLE_SCROLL_STRATEGY) private _scrollStrategy,
  ) {
    this._defaultOverlaySettings = new OverlaySettings({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this._scrollStrategy(),
    });
  }

  private _collapsed = true;

  /**
   * @hidden
   */
  public get collapsed(): boolean {
    return this._collapsed;
  }

  /**
   * @hidden
   */
  public get element() {
    return this.elementRef.nativeElement;
  }

  /**
   * @hidden
   */
  @HostBinding('class.ngs-hidden')
  public get hiddenClass() {
    return this.collapsed;
  }

  /**
   * @hidden
   */
  @HostBinding('class.ngs-toggle')
  public get defaultClass() {
    return !this.collapsed;
  }

  /**
   * Opens the toggle.
   *
   * ```typescript
   * this.myToggle.open();
   * ```
   */
  public open(overlayConfig: OverlaySettings = this._defaultOverlaySettings) {
    this._collapsed = false;
    this.cdr.detectChanges();
    this._detach();
    this.onOpening.emit();
    const settings = this.overlayService.getOverlaySettings(this._defaultOverlaySettings, overlayConfig);
    this._overlayRef = this._createOverlay(settings);
    this._attachContainer(this._overlayRef, settings);
    this._attachListeners(this._overlayRef, settings);
  }

  /**
   * Closes the toggle.
   *
   * ```typescript
   * this.myToggle.close();
   * ```
   */
  public close() {
    this.onClosing.emit();
    this._collapsed = true;
    this._detach();
  }

  /**
   * Opens or closes the toggle, depending on its current state.
   *
   * ```typescript
   * this.myToggle.toggle();
   * ```
   */
  public toggle(overlayConfig?: OverlaySettings) {
    this.collapsed ? this.open(overlayConfig) : this.close();
  }

  /**
   * @hidden
   */
  public ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._toggleInstance = null;
    }
  }

  private _createOverlay(config: OverlaySettings): OverlayRef {
    const overlayRef = this.overlayService.createOverlay(config);
    if (config.positionStrategy instanceof FlexibleConnectedPositionStrategy) {
      this.overlayService.setPosition(config.positionStrategy, config);
    }
    return overlayRef;
  }

  private _attachContainer(overlay: OverlayRef, settings: OverlaySettings) {
    if (settings.portal instanceof TemplatePortal) {
      overlay.attach(settings.portal);
    } else {
      const containerPortal =
        new ComponentPortal(ToggleComponent, this.viewContainerRef);
      this._toggleInstance = overlay.attach(containerPortal).instance;
      this._toggleInstance.content = this.elementRef.nativeElement;
    }
  }

  private _attachListeners(overlayRef: OverlayRef, config: OverlaySettings) {
    // When the toggle backdrop is clicked, we want to close it.
    if (config.hasBackdrop) {
      overlayRef.backdropClick().subscribe(() => {
        this.close();
      });
    }
    // When the route changes, we want to close it.
    // TODO: CDK gave option to closeOnNavigation in latest release need to change it
    this._location.subscribe(() => {
      if (config.closeOnNavigation) {
        this.close();
      }
    });
    this.onOpened.emit();
  }

  private _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._toggleInstance = null;
    this.onClosed.emit();
  }

}

@Directive({
  exportAs: 'toggle-action',
  selector: '[ngsToggleAction]'
})
export class NgsToggleActionDirective implements OnInit {
  _overlayDefaults: OverlaySettings;
  /**
   * Provide settings that control the toggle overlay positioning, interaction and scroll behavior.
   * ```typescript
   * const settings: OverlaySettings = {
   *      closeOnOutsideClick: false,
   *  }
   * ```
   * ---
   * ```html
   * <!--set-->
   * <div ngsToggleAction [overlaySettings]="settings"></div>
   * ```
   */
  @Input()
  public overlaySettings: OverlaySettings;

  constructor(private _elementRef: ElementRef, private _overlay: Overlay,) {
  }

  _target: any;

  /**
   * @hidden
   */
  get target(): any {
    return this._target;
  }

  /**
   * @hidden
   */
  @Input('ngsToggleAction')
  set target(target: any) {
    if (target !== null && target !== '') {
      this._target = target;
    }
  }

  public ngOnInit() {
    this._overlayDefaults = new OverlaySettings({
      elementRef: this._elementRef,
    });
  }

  @HostListener('click')
  public onClick() {
    if (this.target.toggle) {
      this._overlayDefaults.scrollStrategy = this._overlay.scrollStrategies.reposition();
      this._overlayDefaults.positionStrategy = this._overlay.position().flexibleConnectedTo(this._elementRef)
        .withFlexibleDimensions(false)
        .withPush(false);
      this.target.toggle(Object.assign({}, this._overlayDefaults, this.overlaySettings));
    }
  }

}

@NgModule({
  declarations: [NgsToggleDirective, ToggleComponent, NgsToggleActionDirective],
  exports: [NgsToggleDirective, NgsToggleActionDirective],
  providers: [NGS_TOGGLE_SCROLL_STRATEGY_PROVIDER],
  entryComponents: [ToggleComponent]
})
export class NgsToggleModule {
}
