import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW} from '../core/utils';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as _ from 'lodash';

/** The height of each autocomplete option. */
export const AUTOCOMPLETE_OPTION_HEIGHT = 35;

/** The total height of the autocomplete panel. */
export const AUTOCOMPLETE_PANEL_HEIGHT = 256;

let _uniqueAutocompleteIdCounter = 0;

export enum Position {
  TOP,
  BOTTOM,
  INLINE
}

@Component({
  selector: 'ngs-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'autocomplete'
})
export class AutoCompleteComponent implements OnInit, OnDestroy {
  formCtrl: FormControl;
  filteredData: Observable<any[]>;
  _previousValue: any;
  showPanel: boolean = false;
  activeOption: number = -1;
  selectedOptions: Array<any> = [];
  dataCopy: Array<any> = null;
  is_focused = 'is-focused';
  _position = Position;
  @Input() id: string = `ngs-autocomplete-${_uniqueAutocompleteIdCounter++}`;
  @Input() data: Array<any> = null;
  @Input() filterWith: string | null = 'name';
  @Input() displayWith: string | null = 'name';
  @Input() displayOptions: Position = Position.INLINE;
  @Input() multiple: boolean | null = true;
  @Input() uniqueKey: string | null = 'id';
  @Input() showDeleteOption: boolean | null = true;
  @Input() label: string | null = '';
  @Input() placeholder: string | null = '';
  @Output() readonly optionSelected: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() readonly panelOpened: EventEmitter<void> = new EventEmitter<void>();
  @Output() readonly panelClosed: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('panel') panel: ElementRef;
  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('form_autocomplete') form_autocomplete: ElementRef;
  private _filteredData: any = [];

  constructor(private renderer: Renderer2) {
    this.formCtrl = new FormControl();
    this.filteredData = this.formCtrl.valueChanges
      .pipe(
        startWith(''),
        map(item => this.filterData(item))
      );
    // console.log(this.filteredData);
  }

  @Input()
  set values(value) {
    this.selectedOptions = value || [];
  }

  ngOnInit() {
    this.dataCopy = _.clone(this.data);
    if (this.selectedOptions) {
      this.updateData();
    }
  }

  filterData(name: string) {
    if (name) {
      this._filteredData = this.data.filter(state =>
        state[this.filterWith].toLowerCase().indexOf(name.toLowerCase()) === 0);
    } else {
      this._filteredData = this.data.slice();
    }
    return this._filteredData;
  }

  openPanel() {
    this.showPanel = true;
    this.panelOpened.emit();
  }

  closePanel() {
    this.showPanel = false;
    this.activeOption = 0;
    this.panelClosed.emit();
  }

  handleFocus(): void {
    this.renderer.addClass(this.form_autocomplete.nativeElement, this.is_focused);
    if (this.canOpen()) {
      this._previousValue = this.inputElement.nativeElement.value;
      this.openPanel();
      // this._attachOverlay();
      // this._floatLabel(true);
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    if (keyCode === ESCAPE) {
      event.preventDefault();
    }
    if (this.showPanel && (keyCode === ESCAPE || (keyCode === UP_ARROW && event.altKey))) {
      this._resetActiveItem();
      event.stopPropagation();
    } else if (this.activeOption > -1 && keyCode === ENTER && this.showPanel) {
      this.selectViaInteraction(this.activeOption);
      event.preventDefault();
    } else if (this.activeOption > -1 && keyCode === TAB && this.showPanel) {
      this.closePanel();
      event.preventDefault();
    } else {
      const prevActiveItem = this.activeOption;
      const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;

      if (isArrowKey && this.canOpen()) {
        this.openPanel();
      }

      if (isArrowKey || this.activeOption !== prevActiveItem) {
        this.setActiveItem(keyCode);
      }
    }
  }

  onTouched(event): void {
    this.renderer.removeClass(this.form_autocomplete.nativeElement, this.is_focused);
    // this.closePanel();
  }

  updateData() {
    this.data = _.differenceBy(this.dataCopy, this.selectedOptions, this.uniqueKey);
    this.formCtrl.setValue('');
    this.optionSelected.emit(this.selectedOptions);
  }

  selectViaInteraction(index) {
    if (index >= 0) {
      const checkValue = this.selectedOptions.findIndex(item => item[this.displayWith] === this._filteredData[index][this.displayWith]);
      if (checkValue < 0) {
        this.selectedOptions.push(this._filteredData[index]);
        this.updateData();
      }
      this.activeOption = index;
    }
    if (!this.multiple) {
      this.closePanel();
    }
  }

  removeSelectedOption(index) {
    this.selectedOptions.splice(index, 1);
    this.updateData();
  }

  setActiveItem(keyCode) {
    if (keyCode === UP_ARROW) {
      this.activeOption = this.activeOption === 0 ? this.data.length - 1 : this.activeOption - 1;
    } else if (keyCode === DOWN_ARROW) {
      this.activeOption = this.data.length === this.activeOption ? 0 : this.activeOption + 1;
    }
    this.scrollToOption();
  }

  /** Returns the panel's scrollTop. */
  getScrollTop(): number {
    return this.panel ? this.panel.nativeElement.scrollTop : 0;
  }

  setScrollTop(scrollTop: number): void {
    if (this.panel) {
      this.panel.nativeElement.scrollTop = scrollTop;
    }
  }

  canOpen(): boolean {
    const element: HTMLInputElement = this.inputElement.nativeElement;
    return !element.readOnly && !element.disabled;
  }

  getOptionScrollPosition(optionIndex: number, optionHeight: number,
                          currentScrollPosition: number, panelHeight: number): number {
    const optionOffset = optionIndex * optionHeight;

    if (optionOffset < currentScrollPosition) {
      return optionOffset;
    }

    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
      return Math.max(0, optionOffset - panelHeight + optionHeight);
    }

    return currentScrollPosition;
  }

  ngOnDestroy() {
    this.showPanel = false;
  }

  private _resetActiveItem(): void {
    this.activeOption = 0;
  }

  private scrollToOption(): void {
    const index = this.activeOption || 0;

    const newScrollPosition = this.getOptionScrollPosition(
      index + 1,
      AUTOCOMPLETE_OPTION_HEIGHT,
      this.getScrollTop(),
      AUTOCOMPLETE_PANEL_HEIGHT
    );

    this.setScrollTop(newScrollPosition);
  }

}
