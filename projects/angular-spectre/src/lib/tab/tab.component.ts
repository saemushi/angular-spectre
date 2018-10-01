import { CommonModule } from '@angular/common'; 
import { Component, OnInit, Directive, HostBinding, Input, NgModule } from '@angular/core';

/**
 * Example:
 * <ngs-tab>
 *      <ngs-tab-item active="true">
 *        <a href="#" ngsBadge="8">Music</a>
 *      </ngs-tab-item>
 *      <ngs-tab-item>
 *        <a href="#">Art</a>
 *      </ngs-tab-item>
 *      <ngs-tab-item>
 *        <a href="#">Dance</a>
 *      </ngs-tab-item>
 *    </ngs-tab>
 */

@Component({
    selector: 'ngs-tab',
    template: '<ng-content></ng-content>'
})
export class NgsTabComponent {
    
    /**
    * An @HostBinding property that adds tab class to the tag.
    *```html
    *<ngs-tab>
    *   <ngs-tab-item active="true">
    *       <a href="#" ngsBadge="8">Music</a>
    *   </ngs-tab-item>
    * </ngs-tab>
    *```
    */
    @HostBinding('class.tab') tab = true;


    /**
    * An @HostBinding property that adds tab-block class to the tag.
    *```html
    *<ngs-tab fullWidth="true">
    *   <ngs-tab-item active="true">
    *       <a href="#" ngsBadge="8">Music</a>
    *   </ngs-tab-item>
    * </ngs-tab>
    *```
    */
    @HostBinding('class.tab-block') @Input('fullWidth') fullWidth: boolean = false;
}

@Component({
    selector: 'ngs-tab-item',
    template: '<ng-content></ng-content>'
})
export class NgsTabItemComponent {

    // link: string = '';
    // linkExists: boolean = false;


    /**
    * An @HostBinding property that adds tab-item class to the tag.
    *```html
    *<ngs-tab>
    *   <ngs-tab-item>
    *       <a href="#" ngsBadge="8">Music</a>
    *   </ngs-tab-item>
    * </ngs-tab>
    *```
    */
    @HostBinding('class.tab-item') tabItem = true;


    /**
    * An @HostBinding property that adds active class to the tag. Represents the active tab item.
    *```html
    *<ngs-tab>
    *   <ngs-tab-item active="true">
    *       <a href="#" ngsBadge="8">Music</a>
    *   </ngs-tab-item>
    * </ngs-tab>
    *```
    */
    @HostBinding('class.active') @Input('active') activeItem: boolean = false;


    /**
    * An @HostBinding property that adds tab-action class to the tag.
    *```html
    *<ngs-tab>
    *   <ngs-tab-item>
    *       <a href="#" ngsBadge="8">Music</a>
    *   </ngs-tab-item>
    * </ngs-tab>
    *```
    */
    @HostBinding('class.tab-action') @Input('tabAction') tabAction: boolean = false;
    
    // @Input('link')
    // get addLink(): string{
    //     return this.link;
    // } 
    // set addLink(value: string){
    //     this.link = value;
    //     if(value != "")
    //         this.linkExists = true;
    // }

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
