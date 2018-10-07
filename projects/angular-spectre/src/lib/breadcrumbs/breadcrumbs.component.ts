import { Directive, ElementRef, Input, Renderer2, Component, HostBinding } from '@angular/core';
import { consumeBinding } from '@angular/core/src/render3/instructions';

export interface BreadcrumbsObject {
  title: string;
  link: string;
  tooltip?: string;
}

/**
 * Example:
 * <ngs-breadcrumbs>
 *  <ngs-breadcrumb-item link="www.google.com" item-data="Home"></ngs-breadcrumb-item>
 *  <ngs-breadcrumb-item item-data="About"></ngs-breadcrumb-item>
 *  <ngs-breadcrumb-item item-data="Contact" ngsTooltipBasic [position]="'bottom'"
 *  data-tooltip="Testing tool tip Testing"></ngs-breadcrumb-item>
 * </ngs-breadcrumbs>
 */

@Component({
  selector: 'ngs-breadcrumb-item, [ngs-breadcrumb-item], ngsBreadcrumbItem, [ngsBreadcrumbItem] ',
  template: `
    <a href="{{link}}">{{itemData}}</a>
  `
})
export class NgsBreadcrumbItemComponent {

  /**
  * An @Input property that sets the value of the `link` attribute. Default value - #.
  *```html
  *<ngs-breadcrumb-item link="www.google.com" item-data="Home"></ngs-breadcrumb-item>
  *```
  */
  @Input('link') link: string = '#';

  /**
  * An @Input property that sets the value of the `item-data` attribute. Default value - empty.
  *```html
  *<ngs-breadcrumb-item item-data="Home"></ngs-breadcrumb-item>
  *```
  */
  @Input('item-data') itemData: string = '';

  /**
  * An @HostBinding property that adds breadcrum-item class to the tag.
  *```html
  *<ngs-breadcrumb-item link="www.google.com" item-data="Home"></ngs-breadcrumb-item>
  *```
  */
  @HostBinding('class.breadcrumb-item') item = true;
}

@Component({
  selector: 'ngs-breadcrumbs',
  templateUrl: './breadcrumbs.html'
})

export class NgsBreadcrumbComponent {

  /**
  * An @Input property that sets the value of the `breadcrum-data` attribute. Object has to be paased to it.
  *```html
  *<ngs-breadcrumbs [breadcrumb-data]="breadcrumbsData1"></ngs-breadcrumbs>
  *```
  */
  @Input('breadcrumb-data') breadcrumbsData: BreadcrumbsObject[];
}
