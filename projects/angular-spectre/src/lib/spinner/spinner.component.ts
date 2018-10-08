import { NgModule, Component, OnInit, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngs-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class NgsSpinnerComponent implements OnInit {

  private _size: string;

  @Input('size')
  get size() {
    return this._size;
  }
  set size(value) {
    this._size = value;
  }

  constructor() { }

  ngOnInit() {
  }

}


@NgModule({
  imports: [CommonModule],
  declarations: [NgsSpinnerComponent],
  exports: [NgsSpinnerComponent]
})
export class NgsSpinnerModule { }
