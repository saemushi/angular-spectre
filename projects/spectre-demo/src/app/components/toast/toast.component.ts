import {NgsToastService} from 'angular-spectre';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(private ngsToastService: NgsToastService) {
  }

  ngOnInit() {
  }

  openToast(v, h, type) {
    this.ngsToastService.add({
      title: 'Toast Title',
      message: 'Lorem ipsum dolor sit amet.',
      timeout: 6000000,
      horizontalPosition: h,
      verticalPosition: v
    }, type);
  }

}
