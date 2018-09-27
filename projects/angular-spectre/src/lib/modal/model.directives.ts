import {
    Directive,
    HostBinding,
} from '@angular/core';

/**
 * Title of a modal element. Stays fixed to the top of the modal when scrolling.
 */
@Directive({
    selector: '[ngs-modal-title], [ngsModalTitle]',
    exportAs: 'ngsModalTitle'
})
export class NgsModalTitleDirective {
    @HostBinding('class') class = 'modal-title';
}


/**
 * Scrollable content container of a modal.
 */
@Directive({
    selector: `[ngs-modal-content], ngs-modal-content, [ngsModalContent]`,
})
export class NgsModalContentDirective {
    @HostBinding('class') class = 'modal-body';
}


/**
 * Container for the bottom action buttons in a modal.
 * Stays fixed to the bottom when scrolling.
 */
@Directive({
    selector: `[ngs-modal-actions], ngs-modal-actions, [ngsModalActions]`,
})
export class NgsModalActionsDirective {
    @HostBinding('class') class = 'modal-footer';
}
