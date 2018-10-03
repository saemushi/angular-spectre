import { CommonModule } from '@angular/common'; 
import { Component, OnInit, Directive, HostBinding, Input, Output, NgModule, EventEmitter, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
    selector: 'ngs-tab',
    templateUrl: 'tab.component.html'
})
export class NgsTabComponent {
    fullWidth: boolean = false;
    tabContent: any = '';
    @Input('fullWidth')
    get tabBlock(): boolean{
        return this.fullWidth;
    }
    set tabBlock(value: boolean){
        this.fullWidth = value;
    }

    getTabContent($event){
        this.tabContent = $event;
        console.log(this.tabContent);
    }

}

@Component({
    selector: 'ngs-tab-item',
    templateUrl: 'tabItem.component.html'
})
export class NgsTabItemComponent implements OnInit{

    static tabCount: number = 0;
    title: string = '';
    tabContent: string = '';

    @Output() tabEvent: EventEmitter<string> = new EventEmitter<string>();

    @HostBinding('class.tab-item') tabItem = true;
    @HostBinding('class.active') @Input('active') active = false;
    @HostBinding('class.tab-action') @Input('tabAction') action = false;
    @HostListener('click')
    changeTabContent(){
        this.tabEvent.emit(this.ele.nativeElement.id);
    }

    @Input('title') 
    set tabTitle(value: string){
        this.title = value;
    }
    get tabTitle(): string{
        return this.title;
    }
    
    constructor(private ele: ElementRef, private renderer: Renderer2) { }

    ngOnInit(){
        this.renderer.setAttribute(this.ele.nativeElement, 'id', `ngsTab_${NgsTabItemComponent.tabCount}`);
        NgsTabItemComponent.tabCount++;
    }

}


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgsTabComponent,
        NgsTabItemComponent
    ],
    exports: [
        NgsTabComponent,
        NgsTabItemComponent
    ]
})

export class NgsTabModule { }
