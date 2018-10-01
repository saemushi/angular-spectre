import { Component, OnInit, Directive, HostBinding } from '@angular/core';

@Component({
  selector: 'ngs-card',
  template: '<ng-content></ng-content>',
})
export class NgsCardComponent {
  @HostBinding('class') class = 'card';
}

@Directive({
  selector: 'ngs-card-title, ngsCardTitle, [ngsCardTitle], [ngs-card-title]',
})
export class NgsCardTitleDirective {
  @HostBinding('class') class = 'card-title';
}

@Directive({
  selector: 'ngs-card-subtitle, ngsCardSubtitle, [ngsCardSubtitle], [ngs-card-subtitle]',
})
export class NgsCardSubtitleDirective {
  @HostBinding('class') class = 'card-subtitle';
}

@Directive({
  selector: 'ngs-card-img, ngsCardImg, [ngsCardImg], [ngs-card-img]',
})
export class NgsCardImgDirective {
  @HostBinding('class') class = 'card-image';
}

@Directive({
  selector: 'ngs-card-header, ngsCardHeader, [ngsCardHeader], [ngs-card-header]',
})
export class NgsCardHeaderDirective {
  @HostBinding('class') class = 'card-header';
}

@Directive({
  selector: 'ngs-card-body, ngsCardBody, [ngsCardBody], [ngs-card-body]',
})
export class NgsCardBodyDirective {
  @HostBinding('class') class = 'card-body';
}

@Directive({
  selector: 'ngs-card-footer, ngsCardFooter, [ngsCardFooter], [ngs-card-footer]',
})
export class NgsCardFooterDirective {
  @HostBinding('class') class = 'card-footer';
}
