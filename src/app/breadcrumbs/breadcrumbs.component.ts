import { Component } from '@angular/core';
import { BreadcrumbsObject } from 'projects/angular-spectre/src';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

  breadcrumbsData1: BreadcrumbsObject[] =  [ {title: 'Home', link: 'https://google.com'},
  {title: 'About', link: 'https://google.com', tooltip: 'About Us'} ];

  breadcrumbsData2: BreadcrumbsObject[] =  [ {title: 'Home', link: 'https://google.com'}, {title: 'About', link: 'https://google.com'},
  {title: 'Contact', link: 'https://google.com', tooltip: 'Contact Us'} ];

}
