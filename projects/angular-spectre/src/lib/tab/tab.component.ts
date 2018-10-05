import { CommonModule } from '@angular/common';
import { Component, OnInit, Directive, Input, Output, NgModule, EventEmitter, ContentChildren, QueryList, AfterContentChecked, TemplateRef } from '@angular/core';

let next = 0;

export interface NgsTabChangeEvent {
    activeId: string;
    next: string;
}

@Directive({
    selector: 'ng-template[ngsTabContent]'
})
export class NgsTabContent {
    constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({
    selector: 'ngs-tab-item, ngsTabItem, [ngs-tab-item], [ngsTabItem]',
})
export class NgsTabItem {

    tabContent: NgsTabContent | null;

    @Input() id = `ngs-tab-${next++}`;

    @Input() title: string;

    @ContentChildren(NgsTabContent, { descendants: false }) tabsContent: QueryList<NgsTabContent>;

    ngAfterContentChecked() {
        this.tabContent = this.tabsContent.first;
    }
}

@Component({
    selector: 'ngs-tab',
    templateUrl: 'tab.component.html'
})
export class NgsTabComponent {

    @Input() destroyOnHide = true;

    @Input() activeId: string;

    @ContentChildren(NgsTabItem) tabs: QueryList<NgsTabItem>;

    @Output() tabChange = new EventEmitter<NgsTabChangeEvent>();

    selectTab(id: string) {
        let selectedTab = this._getTabById(id);
        if (selectedTab && this.activeId !== selectedTab.id) {
            let defaultPrevented = false;
            this.tabChange.emit({ activeId: this.activeId, next: selectedTab.id });
            this.activeId = selectedTab.id;
        }
    }

    ngAfterContentChecked() {
        let activeTab = this._getTabById(this.activeId);
        this.activeId = activeTab ? activeTab.id : (this.tabs.length ? this.tabs.first.id : null);
    }

    private _getTabById(id: string): NgsTabItem {
        let tabsId: NgsTabItem[] = this.tabs.filter(tab => tab.id === id);
        return tabsId.length ? tabsId[0] : null;
    }

}


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgsTabContent,
        NgsTabComponent,
        NgsTabItem
    ],
    exports: [
        NgsTabContent,
        NgsTabComponent,
        NgsTabItem
    ]
})

export class NgsTabModule { }
