import { Directive, ElementRef, OnInit, Input, Renderer2, Component } from '@angular/core';

export class BreadcrumbsObject {
  title: string;
  link: string;
  tooltip: string;
}

@Component({
  selector: 'ngs-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})

export class NgsBreadcrumbsComponent {
  @Input('data') ngsData: BreadcrumbsObject[];
}
