import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbsData1: any =  [ {title: 'Home', link: 'https://google.com'}, {title: 'About', link: 'https://google.com'} ];

  breadcrumbsData2: any =  [ {title: 'Home', link: 'https://google.com'}, {title: 'About', link: 'https://google.com'},
  {title: 'Contact', link: 'https://google.com'} ];

  constructor() { }

  ngOnInit() {
  }

}
