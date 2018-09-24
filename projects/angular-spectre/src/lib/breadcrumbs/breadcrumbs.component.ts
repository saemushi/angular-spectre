import { Directive, ElementRef, OnInit, Input, Renderer2, Component } from '@angular/core';

export interface breadcrumbsObject{
  title: string;
  link: string;
}

@Component({
  selector: '[ngsBreadcrumbs]',
  templateUrl: './breadcrumbs.component.html'
})

export class NgsBreadcrumbsComponent {
  @Input('data') ngsData:breadcrumbsObject;
}