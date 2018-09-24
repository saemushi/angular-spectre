import { Component, OnInit, Input, ElementRef } from '@angular/core';

export interface accordionObject{
  accordionTitle:string;
  mutuallyExclusive:boolean;
  arrowIcon:boolean;
  _parent: boolean
  accordionBody:string;
}

@Component({
  selector: 'ngs-accordion',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})

export class AccordionsComponent implements OnInit{

  parentId: Array<number> = [];
  accordionCount: number = 0;
  static aCount:number = 0;

  @Input('accordionTitle') accordionTitle: string;
  @Input('mutuallyExclusive') mutuallyExclusive: boolean = false;
  @Input('arrowIcon') arrowIcon: boolean = true;
  @Input('parent') _parent: boolean = false;
  @Input('accordionObject') accordionObject:accordionObject;

  ngOnInit() {
    if(this._parent === true){
      console.log(AccordionsComponent.aCount);
      this.parentId.push(AccordionsComponent.aCount);
      console.log('p:'+this.parentId);
    }
    else{
      console.log('f');
    }
    this.accordionCount = AccordionsComponent.aCount++;
  }

}
