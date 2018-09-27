import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    NgModule,
    OnDestroy,
    Optional,
    Output,
    Inject,
    ViewContainerRef,
    Component,
    Renderer2,
    InjectionToken
} from '@angular/core';
import { Location } from '@angular/common';
import {
    Overlay,
    OverlayConfig,
    OverlayRef,
    ScrollStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlaySettings } from '../services/overly-settings';

export const NGS_DIALOG_DEFAULT_OPTIONS =
    new InjectionToken<OverlaySettings>('mat-dialog-default-options');

export function SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
    () => ScrollStrategy {
    return () => overlay.scrollStrategies.block();
}

export const NGS_TOGGLE_SCROLL_STRATEGY =
    new InjectionToken<() => ScrollStrategy>('mat-dialog-scroll-strategy');

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

    @Input()
    set content(value) {
        this.renderer.appendChild(this.elementRef.nativeElement, value);
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    }
}

@Directive({
    exportAs: 'toggle',
    selector: '[ngsToggle]'
})
export class NgsToggleDirective implements OnDestroy {
    _overlayRef: OverlayRef | null;
    _toggleInstance: ToggleComponent | null;

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
     * @hidden
     */
    constructor(
        private elementRef: ElementRef,
        private _overlay: Overlay,
        @Optional() private _location: Location,
        private viewContainerRef: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        @Inject(NGS_TOGGLE_SCROLL_STRATEGY) private _scrollStrategy,
    ) {
    }

    /**
     * Opens the toggle.
     *
     * ```typescript
     * this.myToggle.open();
     * ```
     */
    public open(overlayConfig: OverlaySettings = {}) {
        this._collapsed = false;
        this.cdr.detectChanges();
        this._detach();
        this.onOpening.emit();
        this._overlayRef = this._createOverlay(overlayConfig);
        this._attachContainer(this._overlayRef);
        this._attachListeners(this._overlayRef, overlayConfig);
    }

    private _createOverlay(config: OverlaySettings): OverlayRef {
        const overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }

    private _getOverlayConfig(config: OverlaySettings): OverlayConfig {
        const state = new OverlayConfig({
            positionStrategy: this._overlay.position().global()
                .centerHorizontally()
                .centerVertically(),
            scrollStrategy: config.scrollStrategy || this._scrollStrategy(),
            hasBackdrop: config.hasBackdrop
        });
        return state;
    }

    private _attachContainer(overlay: OverlayRef) {
        const containerPortal =
            new ComponentPortal(ToggleComponent, this.viewContainerRef);
        this._toggleInstance = overlay.attach(containerPortal).instance;
        this._toggleInstance.content = this.elementRef.nativeElement;
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

}

@NgModule({
    declarations: [NgsToggleDirective, ToggleComponent],
    exports: [NgsToggleDirective],
    providers: [NGS_TOGGLE_SCROLL_STRATEGY_PROVIDER],
    entryComponents: [ToggleComponent]
})
export class NgsToggleModule { }
