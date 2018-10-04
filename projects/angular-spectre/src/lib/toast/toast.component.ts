import { Component, OnInit, NgModule } from '@angular/core';

import {
  NgsToastService, NgsToastData, NgsToastConfig,
  NgsToastEvent, NgsToastEventType,
} from './toast.service';
import { CommonModule } from '@angular/common';

export function TOAST_SERVICE_FACTORY(config: NgsToastConfig): NgsToastService {
  return new NgsToastService(config);
}

export const NGS_TOAST_CONFIG_FACTORY_PROVIDER = {
  provide: NgsToastService,
  deps: [NgsToastConfig],
  useFactory: TOAST_SERVICE_FACTORY,
};

/**
 * Toast is container for Toast components
 */
@Component({
  selector: 'ngs-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class NgsToastComponent implements OnInit {

  // The storage for toasts.
  toasts: Array<NgsToastData> = [];

  constructor(private config: NgsToastConfig, private toastService: NgsToastService) {
  }

  /**
   * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
   * first time, and before any of its children have been checked. It is invoked only once when the
   * directive is instantiated.
   */
  ngOnInit(): any {
    // We listen events from our service
    this.toastService.events.subscribe((event: NgsToastEvent) => {
      if (event.type === NgsToastEventType.ADD) {
        // Add the new one
        const toast: NgsToastData = event.value;
        this.add(toast);
      } else if (event.type === NgsToastEventType.CLEAR) {
        // Clear the one by number
        const id: number = event.value;
        this.clear(id);
      } else if (event.type === NgsToastEventType.CLEAR_ALL) {
        // Lets clear all toasts
        this.clearAll();
      }
    });
  }

  /**
   * Event listener of 'closeToast' event comes from ToastComponent.
   * This method removes ToastComponent assosiated with this Toast.
   */
  closeToast(toast: NgsToastData) {
    this.clear(toast.id);
  }

  /**
   * Add new Toast
   */
  add(toast: NgsToastData) {
    // If we've gone over our limit, remove the earliest
    // one from the array
    if (this.toasts.length >= this.config.limit) {
      this.toasts.shift();
    }
    // Add toast to array
    this.toasts.push(toast);
    //
    // If there's a timeout individually or globally,
    // set the toast to timeout
    if (toast.timeout) {
      this._setTimeout(toast);
    }
  }

  /**
   * Clear individual toast by id
   * @param id is unique identifier of Toast
   */
  clear(id: number) {
    if (id) {
      this.toasts.forEach((value: any, key: number) => {
        if (value.id === id) {
          if (value.onRemove && this.toastService.isFunction(value.onRemove)) {
            value.onRemove.call(this, value);
          }
          this.toasts.splice(key, 1);
        }
      });
    } else {
      throw new Error('Please provide id of Toast to close');
    }
  }

  /**
   * Clear all toasts
   */
  clearAll() {
    this.toasts.forEach((value: any) => {
      if (value.onRemove && this.toastService.isFunction(value.onRemove)) {
        value.onRemove.call(this, value);
      }
    });
    this.toasts = [];
  }

  /**
   * Custom setTimeout function for specific setTimeouts on individual toasts.
   */
  private _setTimeout(toast: NgsToastData) {
    window.setTimeout(() => {
      this.clear(toast.id);
    }, toast.timeout);
  }

}

@NgModule({
  declarations: [NgsToastComponent],
  exports: [NgsToastComponent],
  providers: [NgsToastConfig, NGS_TOAST_CONFIG_FACTORY_PROVIDER],
  imports: [CommonModule]
})
export class NgsToastModule { }
