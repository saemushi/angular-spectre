import {EventEmitter, Injectable} from '@angular/core';

import {Observable, Subject} from 'rxjs';


export enum NgsToastType {
  DEAFULT = 'default',
  PRIMARY = 'primary',
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error',
}

/**
 * Options to configure specific Toast
 */
@Injectable()
export class NgsToastOptions {
  title?: string;
  message?: string;
  showClose?: boolean;
  timeout?: number;
  horizontalPosition?: string;
  verticalPosition?: string;
  onAdd?: Function;
  onRemove?: Function;
}

/**
 * Structrure of Toast
 */
@Injectable()
export class NgsToastData {
  id: number;
  title: string;
  message: string;
  showClose: boolean;
  type: string;
  timeout: number;
  horizontalPosition?: string;
  verticalPosition?: string;
  onAdd: Function;
  onRemove: Function;
  onClick: Function;
}

/**
 * Default configuration foa all toats and toast container
 */
@Injectable()
export class NgsToastConfig {

  // Maximum number of toasties to show at once
  limit: number = 5;

  // Whether to show the 'X' icon to close the toast
  showClose: boolean = true;

  // The window position where the toast pops up
  horizontalPosition?: 'right' | 'left' | 'center' = 'right';
  verticalPosition?: 'top' | 'bottom' | 'center' = 'top';

  // How long (in miliseconds) the toast shows before it's removed. Set to null/0 to turn off.
  timeout: number = 5000;
}

export enum NgsToastEventType {
  ADD,
  CLEAR,
  CLEAR_ALL
}

export class NgsToastEvent {
  constructor(public type: NgsToastEventType, public value?: any) {
  }
}

/**
 * Toast service helps create different kinds of Toasts
 */
@Injectable({
  providedIn: 'root'
})
export class NgsToastService {
  // Allowed THEMES
  static THEMES: Array<string> = ['default', 'material', 'bootstrap'];
  // Init the counter
  uniqueCounter: number = 0;
  // NgsToastData event emitter
  private toastsEmitter: EventEmitter<NgsToastData> = new EventEmitter<NgsToastData>();
  // Clear event emitter
  private clearEmitter: EventEmitter<number> = new EventEmitter<number>();

  private eventSource: Subject<NgsToastEvent> = new Subject<NgsToastEvent>();
  public events: Observable<NgsToastEvent> = this.eventSource.asObservable();

  constructor(private config: NgsToastConfig) {
  }

  /**
   * Get list of toats
   */
  getToasts(): Observable<NgsToastData> {
    return this.toastsEmitter.asObservable();
  }

  getClear(): Observable<number> {
    return this.clearEmitter.asObservable();
  }

  // Add a new toast item
  add(options: NgsToastOptions | string | number, type?: NgsToastType) {
    let toastOptions: NgsToastOptions;

    if (this.isString(options) && options !== '' || this.isNumber(options)) {
      toastOptions = <NgsToastOptions>{
        title: options.toString()
      };
    } else {
      toastOptions = <NgsToastOptions>options;
    }

    if (!toastOptions || !toastOptions.title && !toastOptions.message) {
      throw new Error('ng2-toast: No toast title or message specified!');
    }

    type = type || NgsToastType.DEAFULT;

    // Set a unique counter for an id
    this.uniqueCounter++;

    // Set the local vs global config items
    const showClose = this._checkConfigItem(this.config, toastOptions, 'showClose');

    const toast: NgsToastData = <NgsToastData>{
      id: this.uniqueCounter,
      title: toastOptions.title,
      message: toastOptions.message,
      showClose: showClose,
      type: 'toast-' + type,
      horizontalPosition: toastOptions.horizontalPosition || 'right',
      verticalPosition: toastOptions.verticalPosition || 'top',
      onAdd: toastOptions.onAdd && this.isFunction(toastOptions.onAdd) ? toastOptions.onAdd : null,
      onRemove: toastOptions.onRemove && this.isFunction(toastOptions.onRemove) ? toastOptions.onRemove : null,
    };

    // If there's a timeout individually or globally, set the toast to timeout
    // Allows a caller to pass null/0 and override the default. Can also set the default to null/0 to turn off.
    toast.timeout = toastOptions.hasOwnProperty('timeout') ? toastOptions.timeout : this.config.timeout;

    // Push up a new toast item
    // this.toastsSubscriber.next(toast);
    // this.toastsEmitter.next(toast);
    this.emitEvent(new NgsToastEvent(NgsToastEventType.ADD, toast));
    // If we have a onAdd function, call it here
    if (toastOptions.onAdd && typeof toastOptions.onAdd === 'function') {
      toastOptions.onAdd.call(this, toast);
    }
  }

  // Clear all toasts
  clearAll() {
    // this.clearEmitter.next(null);
    this.emitEvent(new NgsToastEvent(NgsToastEventType.CLEAR_ALL));
  }

  // Clear the specific one
  clear(id: number) {
    // this.clearEmitter.next(id);
    this.emitEvent(new NgsToastEvent(NgsToastEventType.CLEAR, id));
  }

  // Checks whether the local option is set, if not,

  isFunction(obj: any) {
    return typeof obj === 'function';
  }

  isNumber(obj: any) {
    return typeof obj === 'number';
  }

  isString(obj: any) {
    return typeof obj === 'string';
  }

  // checks the global config
  private _checkConfigItem(config: any, options: any, property: string) {
    if (options[property] === false) {
      return false;
    } else if (!options[property]) {
      return config[property];
    } else {
      return true;
    }
  }

  private emitEvent(event: NgsToastEvent) {
    if (this.eventSource) {
      // Push up a new event
      this.eventSource.next(event);
    }
  }
}
