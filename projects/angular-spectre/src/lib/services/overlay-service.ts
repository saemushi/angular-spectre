import { OverlaySettings, DEFAULT_PANEL_TOP_PADDING } from './overly-settings';
import {
    Overlay,
    OverlayRef,
    FlexibleConnectedPositionStrategy,
    HorizontalConnectionPos,
    VerticalConnectionPos
} from '@angular/cdk/overlay';
import { Injectable, Component, TemplateRef, ElementRef, ComponentRef } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
    providedIn: 'root'
})
export class OverlayService {
    dafaultOverlaySettings: OverlaySettings = new OverlaySettings();

    constructor(private overlay: Overlay) { }

    createOverlay(settings: OverlaySettings = this.dafaultOverlaySettings): OverlayRef {
        return this.overlay.create(settings);
    }

    attachContainer(content: ElementRef | ComponentPortal<any> | TemplateRef<any>, overlayRef: OverlayRef,
        config: OverlaySettings) {
        return overlayRef.attach(content);
    }

    getDefaultSettings(settings?: OverlaySettings) {
        return new OverlaySettings(settings);
    }

    getOverlaySettings(defaultSettings: OverlaySettings, definedSettings: OverlaySettings) {
        return Object.assign({}, defaultSettings, definedSettings);
    }

    setPosition(positionStrategy: FlexibleConnectedPositionStrategy, settings: OverlaySettings) {
        const [originX, originFallbackX]: HorizontalConnectionPos[] =
            settings.xPosition === 'before' ? ['end', 'start'] : ['start', 'end'];

        const [overlayY, overlayFallbackY]: VerticalConnectionPos[] =
            settings.yPosition === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];

        let [originY, originFallbackY] = [overlayY, overlayFallbackY];
        const [overlayX, overlayFallbackX] = [originX, originFallbackX];
        const offsetY = 0;

        if (!settings.overlapTrigger) {
            originY = overlayY === 'top' ? 'bottom' : 'top';
            originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
        }

        positionStrategy.withPositions([
            { originX, originY, overlayX, overlayY, offsetY },
            { originX: originFallbackX, originY, overlayX: overlayFallbackX, overlayY, offsetY },
            {
                originX,
                originY: originFallbackY,
                overlayX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY
            },
            {
                originX: originFallbackX,
                originY: originFallbackY,
                overlayX: overlayFallbackX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY
            }
        ]);
    }
}
