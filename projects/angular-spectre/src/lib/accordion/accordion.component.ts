import { Component, OnInit, Input, ElementRef } from '@angular/core';

export interface AccordionObject {
  accordionTitle: string;
  mutuallyExclusive: boolean;
  arrowIcon: boolean;
  _parent: boolean;
  accordionBody: string;
}

@Component({
  selector: 'ngs-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})

export class AccordionComponent implements OnInit {

  static aCount: number = 0;
  parentId: Array<number> = [];
  accordionCount: number = 0;

  @Input('accordionTitle') accordionTitle: string;
  @Input('mutuallyExclusive') mutuallyExclusive: boolean = false;
  @Input('arrowIcon') arrowIcon: boolean = true;
  @Input('parent') _parent: boolean = false;
  @Input('accordionObject') accordionObject: AccordionObject;

  ngOnInit() {
    if (this._parent === true) {
      this.parentId.push(AccordionComponent.aCount);
    } else {

    }
    this.accordionCount = AccordionComponent.aCount++;
  }

}
