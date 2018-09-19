import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const range = (start, length) => {
  const a = Array(length);
  return [...Array(length)].map((_, i) => start + i);
};
const MAX_VISIBLE_PAGES = 7;
const PAGER_ICONS = true;

export class PagerText {
  prev: string = 'Prev';
  next: string = 'Next';
}

@Component({
  selector: 'ngs-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: []
})
export class PaginationComponent {

  _count: number = 0;
  _page: number = 1;
  _size: number = 0;
  _pagerText: PagerText = new PagerText();
  pages: any;
  rowCount: number = 0;

  @Input() pagerLeftArrowIcon: string = 'icon icon-arrow-left';
  @Input() pagerRightArrowIcon: string = 'icon icon-arrow-right';
  @Input() pagerPreviousIcon: string = 'icon icon-back';
  @Input() pagerNextIcon: string = 'icon icon-forward';
  @Input() visiblePages: number = MAX_VISIBLE_PAGES;
  @Input() pagerIcons: boolean = PAGER_ICONS;
  @Input() pageEnds: boolean = false;
  @Output() change: EventEmitter<any> = new EventEmitter();

  @Input()
  set pagerText(val: PagerText) {
    this._pagerText = val;
  }

  get pagerText(): PagerText {
    return this._pagerText;
  }

  @Input()
  set size(val: number) {
    this._size = val;
    this.pages = this.calcPages();
  }

  get size(): number {
    return this._size;
  }

  @Input()
  set count(val: number) {
    this._count = val;
    this.pages = this.calcPages();
  }

  get count(): number {
    return this._count;
  }

  @Input()
  set page(val: number) {
    this._page = val;
    this.pages = this.calcPages();
  }

  get page(): number {
    return this._page;
  }

  get totalPages(): number {
    const count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
    return Math.max(count || 0, 1);
  }

  canPrevious(): boolean {
    return this.page > 1;
  }

  canNext(): boolean {
    return this.page < this.totalPages;
  }

  prevPage(): void {
    this.selectPage(this.page - 1);
  }

  nextPage(): void {
    this.selectPage(this.page + 1);
  }

  selectPage(page: number): void {
    if (page > 0 && page <= this.totalPages && page !== this.page) {
      this.page = page;

      this.change.emit({
        page
      });
    }
  }

  calcPages(page?: number): any[] {
    if (this.visiblePages < 7 ) {
      return this.pageRange(MAX_VISIBLE_PAGES, this.page, this.totalPages);
    }

    const pages = [];
    let startPage = 1;
    let endPage = this.totalPages;
    const maxSize = 5;
    const isMaxSized = maxSize < this.totalPages;

    page = page || this.page;

    if (isMaxSized) {
      startPage = page - Math.floor(maxSize / 2);
      endPage = page + Math.floor(maxSize / 2);

      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(startPage + maxSize - 1, this.totalPages);
      } else if (endPage > this.totalPages) {
        startPage = Math.max(this.totalPages - maxSize + 1, 1);
        endPage = this.totalPages;
      }
    }

    for (let num = startPage; num <= endPage; num++) {
      pages.push(num);
    }

    return pages;
  }

  pageRange(
    visible: number,
    current: number,
    total: number,
  ): Array<number | '...'> {

    let pageCount;
    const needEllipsis = total > visible;
    const hasStartEllipsis = needEllipsis && visible - 3 < current;

    const hasEndEllipsis = needEllipsis && current < total - visible + 4;
    if (!needEllipsis) {
      return range(1, total);
    } else if (hasStartEllipsis && !hasEndEllipsis) {
      pageCount = visible - 2;
      return [1, '...', ...range(total - pageCount + 1, pageCount)];
    } else if (!hasStartEllipsis && hasEndEllipsis) {
      pageCount = visible - 2;
      return [...range(1, pageCount), '...', total];
    }

    pageCount = visible - 4;
    return [
      1,
      '...',
      ...range(current - Math.floor(pageCount / 2), pageCount),
      '...',
      total,
    ];
  }

}
