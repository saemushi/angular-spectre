import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[ngsTooltipBasic]'
})

export class NgsTooltipDirective {

  tooltipPosition: string;
  previous: string = '';
  @HostBinding('class.tooltip') tooltip = true;

  constructor(private ele: ElementRef, private renderer: Renderer2) {
  }

  @Input('position')
  get pos(): string {
    return this.tooltipPosition;
  }

  set pos(pos: string) {
    this.tooltipPosition = pos;
    this.changePosition(pos);
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onScroll(event: Event) {

    const windowYOffset: number = window.pageYOffset,
      screenHeight: number = window.innerHeight,
      tooltipYOffset: number = this.ele.nativeElement.offsetTop,
      elementHeight: number = this.ele.nativeElement.clientHeight,
      tooltipHeight: number = parseInt(window.getComputedStyle(this.ele.nativeElement, ':after').height, 10),
      windowXOffset: number = window.pageXOffset,
      screenWidth: number = window.innerWidth,
      tooltipXOffset: number = this.ele.nativeElement.offsetLeft,
      elementWidth: number = this.ele.nativeElement.clientWidth,
      tooltipWidth: number = parseInt(window.getComputedStyle(this.ele.nativeElement, ':after').width, 10);

    if (windowYOffset >= (tooltipYOffset - tooltipHeight)) {
      if (tooltipYOffset + tooltipHeight - windowYOffset > 0) {
        if (this.tooltipPosition === 'top') {
          this.tooltipPosition = 'bottom';
        }
      }
    } else if (windowYOffset + screenHeight > tooltipYOffset &&
      windowYOffset + screenHeight < tooltipYOffset + tooltipHeight + elementHeight) {
      if (this.tooltipPosition === 'bottom') {
        this.tooltipPosition = 'top';
      }
    }

    if (windowXOffset >= (tooltipXOffset - tooltipWidth)) {
      if (tooltipXOffset + tooltipWidth - windowXOffset > 0) {
        if (this.tooltipPosition === 'left') {
          this.tooltipPosition = 'right';
        }
      }
    } else if (windowXOffset + screenWidth > tooltipXOffset &&
      windowXOffset + screenWidth < tooltipXOffset + tooltipWidth + elementWidth) {
      if (this.tooltipPosition === 'right') {
        this.tooltipPosition = 'left';
      }
    }
    this.changePosition(this.tooltipPosition);
    this.previous = this.tooltipPosition;
  }

  changePosition(position) {
    this.renderer.removeClass(this.ele.nativeElement, 'tooltip-' + this.previous);
    this.renderer.addClass(this.ele.nativeElement, 'tooltip-' + position);
  }
}
