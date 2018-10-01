import { Component } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {

  radio1: any;
  radio2: any;

  getVal(val: any): void {
    this.radio1 = val;
  }

  getVal2(val: any): void {
    this.radio2 = val;
  }


}
