import { Directive, ElementRef, Input, Renderer2, Component } from '@angular/core';
import { consumeBinding } from '@angular/core/src/render3/instructions';

export interface BreadcrumbsObject {
  title: string;
  link: string;
  tooltip?: string;
}

@Component({
  selector: 'ngs-breadcrumb-item, [ngs-breadcrumb-item], ngsBreadcrumbItem, [ngsBreadcrumbItem] ',
  template: `
    <li class="breadcrumb-item">
      <a href="{{link}}"><ng-content></ng-content></a>
    </li>
  `
})
export class NgsBreadcrumbItemComponent {
  @Input('link') link: string = '#';
}

@Component({
  selector: 'ngs-breadcrumbs',
  templateUrl: './breadcrumbs.html'
})

export class NgsBreadcrumbComponent {
  @Input('data') breadcrumbsData: BreadcrumbsObject[];
}
