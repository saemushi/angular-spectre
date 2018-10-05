import {Component, Directive, HostBinding, Input} from '@angular/core';


@Component({
  selector: '[ngs-menu-item],[ngsMenuItem]',
  exportAs: 'ngsMenuItem',
  templateUrl: 'menu-item.html',
})
export class NgsMenuItemComponent {
  @HostBinding('class') class = 'menu-item';
}

@Directive({
  selector: 'ngs-menu-divider,[ngsMenuDivider]',
})
export class NgsMenuDividerDirective {
  @HostBinding('class') class = 'divider';

  private _title: string;

  @HostBinding('attr.data-content')
  @Input('title')
  get title() {
    return this._title;
  }

  set title(value) {
    this._title = value;
  }
}

@Directive({
  selector: 'ngs-menu-badge,[ngsMenuBadge]',
})
export class NgsMenuBadgeDirective {
  @HostBinding('class') class = 'menu-badge';
}
