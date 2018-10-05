import {Component, Directive, HostBinding} from '@angular/core';

@Directive({
  selector: 'ngs-empty-state-icon, ngsEmptyStateIcon, [ngs-empty-state-icon], [ngsEmptyStateIcon]',
})
export class NgsEmptyStateIconDirective {
  @HostBinding('class') class = 'empty-icon';
}

@Directive({
  selector: 'ngs-empty-state-title, ngsEmptyStateTitle, [ngs-empty-state-title], [ngsEmptyStateTitle]',
})
export class NgsEmptyStateTitleDirective {
  @HostBinding('class') class = 'empty-title h5';
}

@Directive({
  selector: 'ngs-empty-state-subtitle, ngsEmptyStateSubtitle, [ngs-empty-state-subtitle], [ngsEmptyStateSubtitle]',
})
export class NgsEmptyStateSubtitleDirective {
  @HostBinding('class') class = 'empty-subtitle';
}

@Directive({
  selector: 'ngs-empty-state-action, ngsEmptyStateAction, [ngs-empty-state-action], [ngsEmptyStateAction]',
})
export class NgsEmptyStateActionDirective {
  @HostBinding('class') class = 'empty-action';
}

@Component({
  selector: 'ngs-empty-state',
  templateUrl: 'emptyState.html'
})
export class NgsEmptyStateComponent {
}
