import { Component, OnInit, ViewChild } from '@angular/core';
import { NgsToggleDirective, NgsModalComponent } from 'angular-spectre';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @ViewChild(NgsToggleDirective) toggle: NgsToggleDirective;

  constructor() {}

  toggleContent() {
    if (this.toggle.collapsed) {
      this.toggle.open({hasBackdrop: true, closeOnNavigation: true});
    } else {
      this.toggle.close();
    }
  }

  onDialogOKSelected(event) {
    console.log(event);
    event.modal.close();
  }

}
