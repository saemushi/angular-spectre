import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ngs-icon',
    templateUrl: 'icons.component.html',
})

export class IconsComponent implements OnInit {
    private _name: string = '';
    private _size: string = '';
    classNames: string = '';

    @Input('name')
    get name(): string { return this._name; }
    set name(value: string) {
        this._name = value;
    }

    @Input('size')
    get size(): string { return this._size; }
    set size(value: string) {
        if (value !== '1') {
            this._size = value;
        }
    }

    ngOnInit() {
        this.classNames = `icon icon-${this._size}x icon-${this._name}`;
    }
}
