import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})
export class AccordionsComponent implements OnInit {

  data: any = [{accordionTitle: 'hello', mutuallyExclusive: true, arrowIcon: false, accordionBody: 'Testing Multiple 1'},
    {accordionTitle: 'hi', mutuallyExclusive: true, arrowIcon: false, accordionBody: 'Testing Multiple 2'}];

  constructor() {
  }

  ngOnInit() {
  }

}
