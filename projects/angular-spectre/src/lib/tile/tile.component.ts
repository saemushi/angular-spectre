import { Component, OnInit, Directive, HostBinding, Input, ElementRef } from '@angular/core';
import { P } from '@angular/cdk/keycodes';

@Directive({
  selector: 'ngs-tile-icon, ngsTileIcon, [ngs-tile-icon], [ngsTileIcon]',
})
export class NgsTileIconDirective {
  @HostBinding('class') class = 'tile-icon';
}

@Directive({
  selector: 'ngs-tile-title, ngsTileTitle, [ngs-tile-title], [ngsTileTitle]',
})
export class NgsTileTitleDirective {
  @HostBinding('class') class = 'tile-title';
}

@Directive({
  selector: 'ngs-tile-subtitle, ngsTileSubtitle, [ngs-tile-subtitle], [ngsTileSubtitle]',
})
export class NgsTileSubtitleDirective {
  @HostBinding('class') class = 'tile-subtitle';
}

@Directive({
  selector: 'ngs-tile-content, ngsTileContent, [ngs-tile-content], [ngsTileContent]',
})
export class NgsTileContentDirective {
  @HostBinding('class') class = 'tile-content';
}

@Directive({
  selector: 'ngs-tile-action, ngsTileAction, [ngs-tile-action], [ngsTileAction]',
})
export class NgsTileActionDirective {
  @HostBinding('class') class = 'tile-action';
}


@Component({
  selector: 'ngs-tile',
  template: '<ng-content></ng-content>'
})
export class NgsTileComponent implements OnInit {
  private _compact: boolean = false;
  @Input('compact-tile')
  set getCompact(value: boolean) {
    console.log(value);
    this._compact = value;
  }
  get getCompact(): boolean {
    return this._compact;
  }

  constructor(private _elementRef: ElementRef<HTMLElement>) { }

  ngOnInit() {
    console.log(this._compact);
    this._elementRef.nativeElement.classList.add('tile');
    if (this._compact) {
      this._elementRef.nativeElement.classList.add('tile-centered');
    }
  }

}
