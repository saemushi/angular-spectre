import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  data: any = [ {accordionTitle: 'hello', mutuallyExclusive: true, arrowIcon: false, accordionBody: 'Testing Multiple 1'},
  {accordionTitle: 'hi', mutuallyExclusive: true, arrowIcon: false, accordionBody: 'Testing Multiple 2'} ];

  constructor() { }

  ngOnInit() {
  }

}
