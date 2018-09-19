import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  Directive,
  ElementRef,
  Input,
  NgModule,
} from '@angular/core';


let nextId = 0;

export type BadgePosition = 'above after' | 'above before' | 'below before' | 'below after';
export type BadgeSize = 'small' | 'medium' | 'large';
export type Color = 'primary' | 'secondary';
/** Directive to display a text badge. */

@Directive({
  selector: '[ngsBadge]',
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    'class': 'ngs-badge',
    '[class.ngs-badge-overlap]': 'overlap',
    '[class.ngs-badge-above]': 'isAbove()',
    '[class.ngs-badge-below]': '!isAbove()',
    '[class.ngs-badge-before]': '!isAfter()',
    '[class.ngs-badge-after]': 'isAfter()',
    '[class.ngs-badge-small]': 'size === "small"',
    '[class.ngs-badge-medium]': 'size === "medium"',
    '[class.ngs-badge-large]': 'size === "large"',
    '[class.ngs-badge-hidden]': 'hidden',
    '[class.ngs-badge-empty]': '!_hasContent'
  }
})
export class NgsBadgeDirective {
  _hasContent = false;

  /** The color of the badge. Can be `primary`, `accent`, or `warn`. */
  @Input('ngsBadgeColor')
  get color(): Color { return this._color; }
  set color(value: Color) {
    this._setColor(value);
    this._color = value;
  }
  private _color: Color = 'primary';

  /** Whether the badge should overlap its contents or not */
  @Input('ngsBadgeOverlap')
  get overlap(): boolean { return this._overlap; }
  set overlap(val: boolean) {
    this._overlap = coerceBooleanProperty(val);
  }
  private _overlap: boolean = true;

  /**
   * Position the badge should reside.
   * Accepts any combination of 'above'|'below' and 'before'|'after'
   */
  @Input('ngsBadgePosition') position: BadgePosition = 'above after';

  /** The content for the badge */
  @Input('ngsBadge')
  get content(): string { return this._content; }
  set content(value: string) {
    this._content = value;
    this._hasContent = value != null && `${value}`.trim().length > 0;
    this._updateTextContent();
  }
  private _content: string;

  /** Size of the badge. Can be 'small', 'medium', or 'large'. */
  @Input() size: BadgeSize = 'medium';

  /** Whether the badge is hidden. */
  @Input('ngsBadgeHidden')
  get hidden(): boolean { return this._hidden; }
  set hidden(val: boolean) {
    this._hidden = coerceBooleanProperty(val);
  }
  private _hidden: boolean;

  /** Unique id for the badge */
  _id: number = nextId++;


  constructor(
      private _elementRef: ElementRef<HTMLElement>) {}

  /** Whether the badge is above the host or not */
  isAbove(): boolean {
    return this.position.indexOf('below') === -1;
  }

  /** Whether the badge is after the host or not */
  isAfter(): boolean {
    return this.position.indexOf('before') === -1;
  }

  /** Injects a span element into the DOM with the content. */
  private _updateTextContent() {
    if (this._elementRef) {
      this._elementRef.nativeElement.setAttribute('data-badge', this._content);
    }
  }

  /** Adds css theme class given the color to the component host */
  private _setColor(color) {
    if (color !== this._color) {
      if (this._color) {
        this._elementRef.nativeElement.classList.remove(`ngs-badge-${this._color}`);
      }
      if (color) {
        this._elementRef.nativeElement.classList.add(`ngs-badge-${color}`);
      }
    }
  }

}


@NgModule({
  declarations: [NgsBadgeDirective],
  exports: [NgsBadgeDirective]
})
export class NgsBadgeModule { }
