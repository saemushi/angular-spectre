import {ViewContainerRef} from '@angular/core';
import {Direction} from '@angular/cdk/bidi';
import {ScrollStrategy, PositionStrategy} from '@angular/cdk/overlay';

export interface DialogPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export class OverlaySettings<D = any> {

  viewContainerRef?: ViewContainerRef;
  id?: string;
  panelClass?: string | string[] = '';
  hasBackdrop?: boolean = true;
  backdropClass?: string = '';
  disableClose?: boolean = false;
  width?: string = '';
  height?: string = '';
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string = '80vw';
  maxHeight?: number | string;
  position?: DialogPosition;
  data?: D | null = null;
  direction?: Direction;
  ariaDescribedBy?: string | null = null;
  ariaLabel?: string | null = null;
  autoFocus?: boolean = true;
  restoreFocus?: boolean = true;
  scrollStrategy?: ScrollStrategy;
  positionStrategy?: PositionStrategy;
  closeOnNavigation?: boolean = true;
  closeOnBackdropClick?: boolean = true;
}
