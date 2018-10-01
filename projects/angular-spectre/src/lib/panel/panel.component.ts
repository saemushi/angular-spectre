import { Component, OnInit, Directive, HostBinding } from '@angular/core';

@Component({
    selector: 'ngs-panel',
    templateUrl: 'panel.component.html'
})
export class NgsPanelComponent { }

@Directive({
    selector: 'ngsPanelHeader, [ngsPanelHeader], ngs-panel-header, [ngs-panel-header]'
})
export class NgsPanelHeaderDirective {
    @HostBinding('class') class = 'panel-header';
}

@Directive({
    selector: 'ngsPanelTitle, [ngsPanelTitle], ngs-panel-title, [ngs-panel-titile]'
})
export class NgsPanelTitleDirective {
    @HostBinding('class') class = 'panel-title';
}

@Directive({
    selector: 'ngsPanelNav, [ngsPanelNav], ngs-panel-nav, [ngs-panel-nav]'
})
export class NgsPanelNavDirective {
    @HostBinding('class') class = 'panel-nav';
}

@Directive({
    selector: 'ngsPanelBody, [ngsPanelBody], ngs-panel-body, [ngs-panel-body]'
})
export class NgsPanelBodyDirective {
    @HostBinding('class') class = 'panel-header';
}

@Directive({
    selector: 'ngsPanelFooter, [ngsPanelFooter], ngs-panel-footer, [ngs-panel-footer]'
})
export class NgsPanelFooterDirective {
    @HostBinding('class') class = 'panel-footer';
}
