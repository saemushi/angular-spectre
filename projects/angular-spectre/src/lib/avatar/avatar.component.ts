import {CommonModule} from '@angular/common';
import {Component, ElementRef, HostBinding, Input, NgModule, TemplateRef, ViewChild} from '@angular/core';

export enum Size {
  XLARGE = 'xl',
  SMALL = 'sm',
  XSMALL = 'xs',
  LARGE = 'lg'
}

export enum Status {
  ONLINE = 'online',
  BUSY = 'busy',
  AWAY = 'away',
}

let _uniqueIdCounter = 0;

/**
 * **Spectre CSS UI for Angular Avatar** -
 *
 * The Spectre CSS UI Avatar provides an easy way to add an avatar icon to your application.  This icon can be an
 * image, someone's initials or a material icon from the google material icon set.
 *
 * Example:
 * ```html
 * <ngs-avatar initials="MS" roundShape="true" size="large">
 * </ngs-avatar>
 * ```
 */
@Component({
  selector: 'ngs-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class NgsAvatarComponent {

  @ViewChild('image')
  public image: ElementRef;
  /**
   * Returns the `aria-label` of the avatar.
   *
   * ```typescript
   * let ariaLabel = this.avatar.ariaLabel;
   * ```
   *
   */
  @HostBinding('attr.aria-label')
  public ariaLabel = 'avatar';
  /**
   * Returns the `role` attribute of the avatar.
   *
   * ```typescript
   * let avatarRole = this.avatar.role;
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  @HostBinding('attr.role')
  public role = 'img';
  /**
   * Returns the type of the avatar.
   * The avatar can be: `"initials type avatar"`, `"icon type avatar"` or `"image type avatar"`.
   *
   * ```typescript
   * let avatarDescription = this.avatar.roleDescription;
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  public roleDescription: string;
  /**
   * Sets the `id` of the avatar. If not set, the first avatar component will have `id` = `"ngs-avatar-0"`.
   *
   * ```html
   * <ngs-avatar id="my-first-avatar"></ngs-avatar>
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  @HostBinding('attr.id')
  @Input()
  public id = `ngs-avatar-${_uniqueIdCounter++}`;
  /**
   * Sets the avatar's `initials`/`icon` color.
   *
   *```html
   *<ngs-avatar color="blue"></ngs-avatar>
   *```
   *
   * @memberof NgsAvatarComponent
   */
  @Input()
  public color;
  /**
   * Sets the avatar image as background.
   *
   *```html
   *<ngs-avatar background="true"></ngs-avatar>
   *```
   *
   * @memberof NgsAvatarComponent
   */
  @Input()
  public background = false;
  /**
   * Sets the background color of the avatar.
   *
   * ```html
   * <ngs-avatar bgColor="yellow"></ngs-avatar>
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  @Input()
  public bgColor: string;
  /**
   * Sets an `icon` to the avatar. All icons from the material icon set are supported.
   *
   * ```html
   * <ngs-avatar icon="phone"></ngs-avatar>
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  @Input()
  public icon: string;
  /**
   * Sets the `image` source of the avatar.
   *
   * ```html
   * <ngs-avatar src="images/picture.jpg"></ngs-avatar>
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  @Input()
  public src: string;
  /**
   * Sets the `status`  of the avatar.
   * It can be set to `"online"` or `"busy"` or `"busy"`.
   *
   * ```html
   * <ngs-avatar src="images/picture.jpg" statusImage="images/picture.jpg"></ngs-avatar>
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  @Input()
  public status: Status;
  @ViewChild('imageTemplate', {read: TemplateRef})
  protected imageTemplate: TemplateRef<any>;

  constructor() {
  }

  /**
   * @hidden
   */
  private _size: string | Size;

  /**
   * Sets the `size`  of the avatar.
   * By default the `size` is `"medium"`. It can be set to `"lg"` or `"xl"` or `"sm"` or `"xs"`.
   *
   * ```
   * <ngs-avatar size="lg"></ngs-avatar>
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  @Input()
  public set size(value: string | Size) {
    switch (value) {
      case 'sm':
      case 'xs':
      case 'xl':
      case 'lg':
        this._size = value;
        break;
      default:
        this._size = undefined;
    }
  }

  public _initials: string;

  /**
   * Sets `initials` to the avatar.
   *
   * ```html
   * <ngs-avatar initials="MN"></ngs-avatar>
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  @Input()
  get initials() {
    return this._initials && this._initials.substring(0, 2);
  }

  set initials(value) {
    this._initials = value;
  }

  public _statusImage: string;

  /**
   * Sets the `statusImage` source of the avatar status icon.
   *
   * ```html
   * <ngs-avatar src="images/picture.jpg" statusImage="images/picture.jpg"></ngs-avatar>
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  @Input()
  get statusImage() {
    return this._statusImage || null;
  }

  set statusImage(value) {
    this._statusImage = value;
  }

  public _squareShape: boolean | number;

  /**
   * Sets a square shape to the avatar if `squareShape` is `"true"`.
   * By default the shape of the avatar is a round.
   *
   * ```html
   * <ngs-avatar squareShape = "true" ></ngs-avatar>
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  @Input()
  get squareShape() {
    return this._squareShape && 0;
  }

  set squareShape(value) {
    this._squareShape = value;
  }

  /**
   * Returns the `size` of the avatar.
   *
   * ```typescript
   *let avatarSize =  this.avatar.size;
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  get classes(): string {
    return this._size ? `avatar avatar-${this._size}` : 'avatar';
  }

  /**
   * Returns the template of the avatar.
   *
   * ```typescript
   * let template = this.avatar.template;
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  get template() {
    return this.imageTemplate;
  }

  /**
   * Returns the template of the avatar.
   *
   * ```typescript
   * let imageSourceUrl = this.avatar.getSrcUrl();
   * ```
   *
   * @memberof NgsAvatarComponent
   */
  public getSrcUrl() {
    return `url(${this.src})`;
  }

}

/**
 * The `NgsAvatarModule` provides the {@link NgsAvatarComponent} inside your application.
 */

@NgModule({
  declarations: [NgsAvatarComponent],
  exports: [NgsAvatarComponent],
  imports: [CommonModule]
})
export class NgsAvatarModule {
}
