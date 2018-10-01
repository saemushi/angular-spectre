import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgModule,
  Output,
  ViewChild,
  AfterContentInit
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgsButtonModule } from '../button/button.module';
import { NgsModalActionsDirective, NgsModalTitleDirective, NgsModalContentDirective } from './model.directives';
import { NgsToggleModule, NgsToggleDirective } from '../toggle/toggle.directive';
import { OverlaySettings } from '../services/overly-settings';
import {
  Overlay,
} from '@angular/cdk/overlay';
import { Size } from '../avatar/avatar.component';
import { checkBooleanProperty } from '../core/utils';

let MODAL_ID = 0;
/**
 * **Ignite UI for Angular Modal Window** -
 * [Documentation](https://www.infragistics.com/products/ignite-ui-angular/angular/components/modal.html)
 *
 * The Ignite UI Modal Window presents a modal window to the user which can simply display messages or display
 * more complicated visuals such as a user sign-in form.  It also provides a right and left button
 * which can be used for custom actions.
 *
 * Example:
 * ```html
 * <button (click)="form.open()">Show Modal</button>
 * <ngs-modal #form title="Sign In" rightButtonLabel="OK">
 *   <div>
 *     <input type="text" ngsInput/>
 *     <label ngsLabel>Username</label>
 *   </div>
 *   <div>
 *     <input type="password" ngsInput/>
 *     <label ngsLabel>Password</label>
 *   </div>
 * </ngs-modal>
 * ```
 */
@Component({
  selector: 'ngs-modal',
  templateUrl: 'modal.component.html'
})
export class NgsModalComponent implements AfterContentInit {
  private static NEXT_ID = 1;
  private static readonly MODAL_CLASS = 'ngs-modal';
  private static readonly MODAL_OVERLAY_CLASS = 'modal-overlay';
  private _size;

  @ViewChild(NgsToggleDirective)
  public toggleRef: NgsToggleDirective;

  @ViewChild('modal')
  public modalRef: ElementRef;
  /**
  * An @Input property that sets the value of the `id` attribute. If not provided it will be automatically generated.
  *```html
  *<ngs-modal [id]="'ngs-modal-56'" #alert title="Notification" leftButtonLabel="OK" (onLeftButtonSelect)="alert.close()"></ngs-modal>
  *```
  */
  @HostBinding('attr.id')
  @Input()
  public id = `ngs-modal-${MODAL_ID++}`;

  @Input()
  get isModal() {
    return this._isModal;
  }

  set isModal(val: boolean) {
    // this._overlayDefaultSettings.modal = val;
    this._isModal = val;
  }

  /**
  * An @Input property controlling the `title` of the modal.
  *```html
  *<ngs-modal title="Notification" #alert leftButtonLabel="OK" (onLeftButtonSelect)="alert.close()"></ngs-modal>
  *```
  */
  @Input()
  public title = '';

  /**
   *  An @Input property controlling the `message` of the modal.
   *```html
   *<ngs-modal message="Your email was sent!" #alert leftButtonLabel="OK" (onLeftButtonSelect)="alert.close()"></ngs-modal>
   *```
   */
  @Input()
  public message = '';

  /**
   * An @Input property to set the `label` of the left button of the modal.
   *```html
   *<ngs-modal leftButtonLabel="OKAY" #alert title="Notification"  (onLeftButtonSelect)="alert.close()"></ngs-modal>
   *```
   */
  @Input()
  public leftButtonLabel = '';

  /**
   * An @Input property to set the left button color. The property accepts all valid CSS color property values.
   *```html
   *<ngs-modal leftButtonColor="yellow" leftButtonLabel="OKAY" #alert (onLeftButtonSelect)="alert.close()"></ngs-modal>
   *```
   */
  @Input()
  public leftButtonColor = '';

  /**
   * An @Input property to set the left button `background-color`. The property accepts all valid CSS color property values.
   *```html
   *<ngs-modal leftButtonBackgroundColor="black" leftButtonLabel="OKAY" #alert (onLeftButtonSelect)="alert.close()"></ngs-modal>
   *```
   */
  @Input()
  public leftButtonBackgroundColor = '';

  /**
   * An @Input property to set the `label` of the right button of the modal.
   *```html
   *<ngs-modal rightButtonLabel="OKAY" #alert title="Notification"  (onLeftButtonSelect)="alert.close()"></ngs-modal>
   *```
   */
  @Input()
  public rightButtonLabel = '';

  /**
   * An @Input property to set the right button `color`. The property accepts all valid CSS color property values.
   *```html
   *<ngs-modal rightButtonColor="yellow" rightButtonLabel="OKAY" #alert (onLeftButtonSelect)="alert.close()"></ngs-modal>
   *```
   */
  @Input()
  public rightButtonColor = '';

  /**
   * An @Input property to set the right button `background-color`. The property accepts all valid CSS color property values.
   *```html
   *<ngs-modal rightButtonBackgroundColor="black" rightButtonLabel="OKAY" #alert (onLeftButtonSelect)="alert.close()"></ngs-modal>
   *```
   */
  @Input()
  public rightButtonBackgroundColor = '';

  /**
   * An @Input property to set the modal `size`. The valid values are `sm`, `lg`
   *```html
   *<ngs-modal size="sm" #alert></ngs-modal>
   *```
   */
  @Input()
  public set size(value: string | Size) {
    switch (value) {
      case 'sm':
      case 'lg':
        this._size = value;
        break;
      default:
        this._size = undefined;
    }
  }

  get classes(): string {
    return this._size ? `modal modal-${this._size}` : 'modal';
  }

  /**
   * An @Input property that allows you to enable the "close on click outside the modal". By default it's disabled.
   *```html
   *<ngs-modal closeOnBackdropClick="true" leftButtonLabel="Cancel" (onLeftButtonSelect)="modal.close()"
   *rightButtonLabel="OK" rightButtonRipple="#4CAF50" (onRightButtonSelect)="onModalOKSelected($event)">
   *</ngs-modal>
   *```
   */
  @Input()
  get closeOnBackdropClick() {
    return this._closeOnBackdropClick;
  }

  set closeOnBackdropClick(val: boolean) {
    this._overlayDefaultSettings.closeOnBackdropClick = val;
    this._closeOnBackdropClick = checkBooleanProperty(val);
  }

  /**
   * An event that is emitted when the modal is opened.
   *```html
   *<ngs-modal (onOpen)="onModalOpenHandler($event)" (onLeftButtonSelect)="modal.close()" rightButtonLabel="OK">
   *</ngs-modal>
   *```
   */
  @Output()
  public onOpen = new EventEmitter<NgsModalEventArgs>();

  /**
   * An event that is emitted when the modal is closed.
   *```html
   *<ngs-modal (onClose)="onModalCloseHandler($event)" title="Confirmation" leftButtonLabel="Cancel" rightButtonLabel="OK">
   *</ngs-modal>
   *```
   */
  @Output()
  public onClose = new EventEmitter<NgsModalEventArgs>();

  /**
   * An event that is emitted when the left button is clicked.
   *```html
   *<ngs-modal (onLeftButtonSelect)="onModalOKSelected($event)" #modal leftButtonLabel="OK" rightButtonLabel="Cancel">
   *</ngs-modal>
   *```
   */
  @Output()
  public onLeftButtonSelect = new EventEmitter<NgsModalEventArgs>();

  /**
   * An event that is emitted when the right button is clicked.
   * ```html
   *<ngs-modal (onRightButtonSelect)="onModalOKSelected($event)"
   *#modal title="Confirmation" (onLeftButtonSelect)="modal.close()" rightButtonLabel="OK"
   *rightButtonRipple="#4CAF50" closeOnBackdropClick="true">
   *</ngs-modal>
   *```
   */
  @Output()
  public onRightButtonSelect = new EventEmitter<NgsModalEventArgs>();

  // private _animaitonSettings: PositionSettings = {
  //     openAnimation: useAnimation(slideInBottom, {params: {fromPosition: 'translateY(100%)'}}),
  //     closeAnimation: useAnimation(slideOutTop, {params: {toPosition: 'translateY(-100%)'}})
  // };

  private _overlayDefaultSettings: OverlaySettings;
  private _closeOnBackdropClick = false;
  private _isModal = true;
  protected destroy$ = new Subject<boolean>();

  /**
   * @hidden
   */
  public get element() {
    return this.modalRef.nativeElement;
  }

  /**
   * The default `tabindex` attribute for the component
   *
   * @hidden
   */
  @HostBinding('attr.tabindex')
  public tabindex = -1;

  private _titleId: string;

  /**
   * Returns the value of state. Possible state values are "open" or "close".
   *```typescript
   *@ViewChild("MyModal")
   *public modal: NgsModalComponent;
   *ngAfterViewInit() {
   *    let modalState = this.modal.state;
   *}
   *```
   */
  get state(): string {
    return this.isOpen ? 'open' : 'close';
  }

  get isOpen() {
    return !this.toggleRef.collapsed;
  }

  @HostBinding('class.ngs-hidden')
  get isCollapsed() {
    return this.toggleRef.collapsed;
  }

  /**
   *Returns the value of the role of the modal. The valid values are `modal`, `alertmodal`, `alert`.
   *```typescript
   *@ViewChild("MyModal")
   *public modal: NgsModalComponent;
   *ngAfterViewInit() {
   *    let modalRole = this.modal.role;
   *}
   * ```
   */
  @Input()
  get role() {
    if (this.leftButtonLabel !== '' && this.rightButtonLabel !== '') {
      return 'modal';
    } else if (
      this.leftButtonLabel !== '' ||
      this.rightButtonLabel !== ''
    ) {
      return 'alertmodal';
    } else {
      return 'alert';
    }
  }

  /**
   *Returns the value of the title id.
   *```typescript
   *@ViewChild("MyModal")
   *public modal: NgsModalComponent;
   *ngAfterViewInit() {
   *    let modalTitle = this.modal.titleId;
   *}
   * ```
   */
  @Input()
  get titleId() {
    return this._titleId;
  }

  constructor(
    private overlay: Overlay
  ) {
    this._titleId = NgsModalComponent.NEXT_ID++ + '_title';

    this._overlayDefaultSettings = {
      positionStrategy: this.overlay.position().global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      closeOnBackdropClick: this.closeOnBackdropClick
    };
  }

  ngAfterContentInit() {
    this.toggleRef.onClosing.pipe(takeUntil(this.destroy$)).subscribe(() => this.emitCloseFromModal());
  }

  private emitCloseFromModal() {
    this.onClose.emit({ modal: this, event: null });
  }

  /**
   * A method that opens the modal.
   * @memberOf {@link NgsModalComponent}
   *```html
   *<button (click)="modal.open() ngsButton="raised" ngsButtonColor="white" ngsRipple="white">Trigger Modal</button>
   *<ngs-modal #modal></ngs-modal>
   *```
   */
  public open(overlaySettings: OverlaySettings = this._overlayDefaultSettings) {
    if (this.isOpen) {
      return;
    }

    this.toggleRef.open(overlaySettings);
    this.onOpen.emit({ modal: this, event: null });
  }

  /**
   *A method that that closes the modal.
   *@memberOf {@link NgsModalComponent}
   *```html
   *<button (click)="modal.close() ngsButton="raised" ngsButtonColor="white" ngsRipple="white">Trigger Modal</button>
   *<ngs-modal #modal></ngs-modal>
   *```
   */
  public close() {
    if (!this.isOpen) {
      return;
    }
    this.toggleRef.close();
  }


  /**
   * A method that opens/closes the modal.
   *@memberOf {@link NgsModalComponent}
   *```html
   *<button (click)="modal.toggle() ngsButton="raised" ngsButtonColor="white" ngsRipple="white">Trigger Modal</button>
   *<ngs-modal #modal></ngs-modal>
   *```
   */
  public toggle() {
    this.isOpen ? this.close() : this.open();
  }

  /**
   * @hidden
   */
  public onModalSelected(event) {
    event.stopPropagation();
    if (
      this.isOpen &&
      this.closeOnBackdropClick &&
      (event.target.classList.contains(NgsModalComponent.MODAL_CLASS) ||
      event.target.classList.contains(NgsModalComponent.MODAL_OVERLAY_CLASS))
    ) {
      this.close();
    }
  }

  /**
   * @hidden
   */
  public onInternalLeftButtonSelect(event) {
    this.onLeftButtonSelect.emit({ modal: this, event });
  }

  /**
   * @hidden
   */
  public onInternalRightButtonSelect(event) {
    this.onRightButtonSelect.emit({ modal: this, event });
  }

}

export interface NgsModalEventArgs {
  modal: NgsModalComponent;
  event: Event;
}

/**
 * The NgsModalComponent provides {@link NgsModalComponent} inside your application.
 */

@NgModule({
  declarations: [NgsModalComponent, NgsModalActionsDirective, NgsModalTitleDirective, NgsModalContentDirective],
  exports: [NgsModalComponent, NgsModalActionsDirective, NgsModalTitleDirective, NgsModalContentDirective],
  imports: [CommonModule, NgsButtonModule, NgsToggleModule]
})
export class NgsModalModule { }
