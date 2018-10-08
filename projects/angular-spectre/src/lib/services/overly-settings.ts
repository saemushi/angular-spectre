import { ViewContainerRef, ElementRef } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { ScrollStrategy, PositionStrategy, NoopScrollStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

export type MenuPositionX = 'before' | 'after';

export type MenuPositionY = 'above' | 'below';

export const DEFAULT_PANEL_TOP_PADDING = 8;

export interface DialogPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export class OverlaySettings<D = any> {

  viewContainerRef?: ViewContainerRef;
  elementRef?: ElementRef;
  portal?: TemplatePortal;
  id?: string;
  panelClass?: string | string[] = '';
  hasBackdrop?: boolean = true;
  backdropClass?: string = '';
  disableClose?: boolean = false;
  width?: string = '';
  height?: string = '';
  xPosition?: MenuPositionX = 'after';
  yPosition?: MenuPositionY = 'below';
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
  scrollStrategy?: ScrollStrategy = new NoopScrollStrategy();
  positionStrategy?: PositionStrategy;
  closeOnNavigation?: boolean = true;
  closeOnBackdropClick?: boolean = true;
  overlapTrigger?: boolean = false;
  constructor(settings: Object = {}) {
    Object.assign(this, settings);
  }
}
