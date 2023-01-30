import { Component, HostListener, Optional, Inject, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CustomImageEvent } from './models/custom-image-event-model';
import { CdkDrag } from '@angular/cdk/drag-drop';
import * as i0 from "@angular/core";
import * as i1 from "./directives/full-screen.directive";
import * as i2 from "@angular/common";
import * as i3 from "@angular/cdk/drag-drop";
const DEFAULT_CONFIG = {
    btnClass: 'default',
    zoomFactor: 0.1,
    containerBackgroundColor: '#e4dede',
    primaryColor: '',
    wheelZoom: false,
    allowFullscreen: true,
    allowKeyboardNavigation: true,
    btnShow: {
        zoomIn: true,
        zoomOut: true,
        rotateClockwise: true,
        rotateCounterClockwise: true,
        next: true,
        prev: true
    },
    btnIcons: {
        zoomIn: 'fa fa-plus',
        zoomOut: 'fa fa-minus',
        rotateClockwise: 'fa fa-refresh',
        rotateCounterClockwise: 'fa fa-undo',
        next: 'fa fa-chevron-right',
        prev: 'fa fa-chevron-left',
        fullscreen: 'fa fa-arrows-alt',
    }
};
export class AngularImageViewerComponent {
    constructor(moduleConfig) {
        this.moduleConfig = moduleConfig;
        this.src = [];
        this.screenHeightOccupied = 0; // In Px
        this.index = 0;
        this.footerTexts = [
            'Image',
            'of',
            'View previous or next image',
            'using < > on the keyboard'
        ];
        this.indexChange = new EventEmitter();
        this.configChange = new EventEmitter();
        this.customImageEvent = new EventEmitter();
        this.styleHeight = '98vh';
        this.style = { transform: '', msTransform: '', oTransform: '', webkitTransform: '' };
        this.fullscreen = false;
        this.loading = true;
        this.isDragOn = false;
        this.scale = 1;
        this.rotation = 0;
        this.hovered = false;
        this.unwrap = (n) => n ? n : 0;
    }
    ngOnChanges(changes) {
        if (changes['screenHeightOccupied']) {
            this.styleHeight = 'calc(98vh - ' + this.screenHeightOccupied + 'px)';
        }
        else if (changes['index']) {
            this.reset();
        }
    }
    ngOnInit() {
        const merged = this.mergeConfig(DEFAULT_CONFIG, this.moduleConfig);
        this.config = this.mergeConfig(merged, this.config);
        this.triggerConfigBinding();
    }
    nextImage(event) {
        if (this.canNavigate(event) && this.index < this.src.length - 1) {
            this.loading = true;
            this.index++;
            this.triggerIndexBinding();
            this.fireCustomEvent('next', this.index);
            this.reset();
        }
    }
    prevImage(event) {
        if (this.canNavigate(event) && this.index > 0) {
            this.loading = true;
            this.index--;
            this.triggerIndexBinding();
            this.fireCustomEvent('prev', this.index);
            this.reset();
        }
    }
    zoomIn() {
        this.scale *= (1 + this.unwrap(this.config.zoomFactor));
        this.fireCustomEvent('zoomIn', this.scale);
        this.updateStyle();
    }
    zoomOut() {
        if (this.scale > this.unwrap(this.config.zoomFactor)) {
            this.scale /= (1 + this.unwrap(this.config.zoomFactor));
        }
        this.fireCustomEvent('zoomOut', this.scale);
        this.updateStyle();
    }
    scrollZoom(evt) {
        if (this.config.wheelZoom) {
            evt.deltaY > 0 ? this.zoomOut() : this.zoomIn();
            return false;
        }
        return true;
    }
    rotateClockwise() {
        this.rotation += 90;
        this.fireCustomEvent('rotateClockwise', this.rotation);
        this.updateStyle();
    }
    rotateCounterClockwise() {
        this.rotation -= 90;
        this.updateStyle();
    }
    onLoad() {
        this.loading = false;
    }
    onLoadStart() {
        this.loading = true;
    }
    imageNotFound() {
    }
    onDragStart(evt) {
        if (evt.source._dragRef._initialTransform && evt.source._dragRef._initialTransform.length > 0) {
            const myTranslate = evt.source._dragRef._initialTransform.split(' rotate')[0];
            const myRotate = this.style.transform.split(' rotate')[1];
            evt.source._dragRef._initialTransform = `${myTranslate} rotate${myRotate}`;
        }
        else {
            evt.source._dragRef._initialTransform = this.style.transform;
        }
    }
    toggleFullscreen() {
        this.fullscreen = !this.fullscreen;
        if (!this.fullscreen) {
            this.reset();
        }
    }
    triggerIndexBinding() {
        this.indexChange.emit(this.index);
    }
    triggerConfigBinding() {
        this.configChange.next(this.config);
    }
    fireCustomEvent(name, imageIndex) {
        this.customImageEvent.emit(new CustomImageEvent(name, imageIndex));
    }
    reset() {
        this.scale = 1;
        this.rotation = 0;
        this.updateStyle();
        this.cdkDrag.reset();
    }
    onMouseOver() {
        this.hovered = true;
    }
    onMouseLeave() {
        this.hovered = false;
    }
    canNavigate(event) {
        if (event.type === 'keyup') {
            return (this.config.allowKeyboardNavigation && this.hovered);
        }
        else if (event.type === 'click') {
            return this.hovered;
        }
        return null;
    }
    updateStyle() {
        this.style.transform = `rotate(${this.rotation}deg) scale(${this.scale})`;
    }
    mergeConfig(defaultValues, overrideValues) {
        let result = { ...defaultValues };
        if (overrideValues) {
            result = { ...defaultValues, ...overrideValues };
            if (overrideValues.btnIcons) {
                result.btnIcons = { ...defaultValues.btnIcons, ...overrideValues.btnIcons };
            }
        }
        return result;
    }
}
AngularImageViewerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AngularImageViewerComponent, deps: [{ token: 'config', optional: true }], target: i0.ɵɵFactoryTarget.Component });
AngularImageViewerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: AngularImageViewerComponent, selector: "angular-image-viewer", inputs: { src: "src", config: "config", screenHeightOccupied: "screenHeightOccupied", index: "index", imageName: "imageName", footerTexts: "footerTexts" }, outputs: { indexChange: "indexChange", configChange: "configChange", customImageEvent: "customImageEvent" }, host: { listeners: { "window:keyup.ArrowRight": "nextImage($event)", "window:keyup.ArrowLeft": "prevImage($event)", "mouseover": "onMouseOver()", "mouseleave": "onMouseLeave()" } }, viewQueries: [{ propertyName: "cdkDrag", first: true, predicate: CdkDrag, descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div [appScreenfull]=\"fullscreen\" class=\"img-container\" [style.backgroundColor]=\"config.containerBackgroundColor\"\r\n    (wheel)=\"scrollZoom($event)\">\r\n    <div class=\"image-name\" *ngIf=\"imageName\">\r\n      <span>{{imageName}}</span>\r\n    </div>\r\n\r\n    <div cdkDrag class=\"drag-element\">\r\n        <img [src]=\"src[index]\" [ngStyle]=\"style\" alt=\"\"\r\n            (cdkDragStarted)=\"onDragStart($event)\"\r\n            (load)=\"onLoad()\" (loadstart)=\"onLoadStart()\" (error)=\"imageNotFound()\" />\r\n    </div>\r\n\r\n    <div class=\"spinner-container\" *ngIf=\"loading\">\r\n        <div class=\"spinner\"></div>\r\n    </div>\r\n\r\n    <div class=\"button-container\">\r\n        <button type=\"button\" id=\"ngx-fs-btn\" [class]=\"config.btnClass\" (click)=\"toggleFullscreen()\"\r\n        [style.color]=\"config.primaryColor\" *ngIf=\"config.allowFullscreen\">\r\n            <span [class]=\"config.btnIcons?.fullscreen\"></span>\r\n        </button>\r\n\r\n        <div class=\"button-container-bottom\">\r\n            <button type=\"button\" [class]=\"config.btnClass\" *ngFor=\"let cBtn of config.customBtns\"\r\n            [style.color]=\"config.primaryColor\" (click)=\"fireCustomEvent(cBtn.name, index)\">\r\n                <span [class]=\"cBtn.icon\"></span>\r\n            </button>\r\n\r\n            <button type=\"button\" [class]=\"config.btnClass\" *ngIf=\"config.btnShow?.rotateCounterClockwise\"\r\n            [style.color]=\"config.primaryColor\" (click)=\"rotateCounterClockwise()\">\r\n                <span [class]=\"config.btnIcons?.rotateCounterClockwise\"></span>\r\n            </button>\r\n            <button type=\"button\" [class]=\"config.btnClass\" *ngIf=\"config.btnShow?.rotateClockwise\"\r\n            [style.color]=\"config.primaryColor\" (click)=\"rotateClockwise()\">\r\n                <span [class]=\"config.btnIcons?.rotateClockwise\"></span>\r\n            </button>\r\n\r\n            <div class=\"button-zoom-in-out-container\">\r\n                <button type=\"button\" [class]=\"config.btnClass\" *ngIf=\"config.btnShow?.zoomIn\"\r\n                [style.color]=\"config.primaryColor\" (click)=\"zoomIn()\">\r\n                    <span [class]=\"config.btnIcons?.zoomIn\"></span>\r\n                </button>\r\n                <button type=\"button\" [class]=\"config.btnClass\" *ngIf=\"config.btnShow?.zoomOut\"\r\n                [style.color]=\"config.primaryColor\" (click)=\"zoomOut()\">\r\n                    <span [class]=\"config.btnIcons?.zoomOut\"></span>\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"nav-button-container\" *ngIf=\"src.length > 1\">\r\n        <button type=\"button\" #prevImg [class]=\"config.btnClass\" (click)=\"prevImage($event); prevImg.blur()\"\r\n        [style.color]=\"config.primaryColor\"  [disabled]=\"index === 0\">\r\n            <span [class]=\"config.btnIcons?.prev\"></span>\r\n        </button>\r\n        <button type=\"button\" #nextImg [class]=\"config.btnClass\" (click)=\"nextImage($event); nextImg.blur()\"\r\n        [style.color]=\"config.primaryColor\"  [disabled]=\"index === src.length - 1\">\r\n            <span [class]=\"config.btnIcons?.next\"></span>\r\n        </button>\r\n    </div>\r\n    <div class=\"footer-section\">\r\n        <div class=\"image-txt-count-left-align\"><span>{{footerTexts[0]}} {{index + 1}} {{footerTexts[1]}} {{src.length}}</span></div>\r\n        <div class=\"footer-txt-right-align\">\r\n            <span class=\"footer-txt-right-align-title\" [style.color]=\"config.primaryColor\">{{footerTexts[2]}}</span>\r\n            <span class=\"footer-txt-right-align-note\">{{footerTexts[3]}}</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n", styles: [".img-container{position:relative;width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden}.img-container .drag-element{position:absolute;top:35px;right:78px;width:calc(100% - 156px);height:calc(100% - 85px);cursor:grab;text-align:center}.img-container .drag-element img{padding:0;max-width:100%;max-height:100%}.img-container .drag-element:active{cursor:grabbing}.img-container button{z-index:99}.img-container button:not(:disabled){cursor:pointer}#ngx-fs-btn{top:15px}button.default{height:24px;width:24px;opacity:.9;transition:opacity .2s;font-size:12px;background:inherit;background-color:#fff;border:none;border-radius:31px;box-shadow:0 0 5px #00000059}button.default:focus{outline:none;opacity:1}button.default:hover{opacity:1}button.default:disabled{opacity:.3}.nav-button-container>button{position:relative;right:0;margin:0 10px}.nav-button-container{text-align:right;position:absolute;z-index:98;bottom:60px;left:0;right:10px}.nav-button-container button.default{height:30px;margin:0;font-size:14px}.nav-button-container button.default:first-child{border-radius:4px 0 0 4px}.nav-button-container button.default:last-child{margin-left:10px;border-radius:0 4px 4px 0}.button-container{position:absolute;top:10px;right:10px;width:24px;height:calc(100% - 115px);z-index:98}.button-container .button-container-bottom{position:absolute;bottom:0}.button-container .button-container-bottom button.default{margin-top:10px}.button-container .button-container-bottom .button-zoom-in-out-container{margin-top:15px}.button-container .button-container-bottom .button-zoom-in-out-container button.default{margin:0;border-radius:0;height:30px}.button-container .button-container-bottom .button-zoom-in-out-container button.default:first-child{margin-bottom:1px}.spinner-container{position:absolute;inset:0;width:60px;height:60px;margin:auto;padding:10px;background-color:#0006;border-radius:25%}.spinner{border-width:7px;border-style:solid;border-color:#ccc;border-bottom-color:#222;border-radius:50%;height:100%;width:100%;box-sizing:border-box;animation:rotation 2s linear infinite}.footer-section{position:absolute;bottom:10px;left:0;width:100%;line-height:18px;z-index:98}.footer-section .image-txt-count-left-align{float:left;padding:0 10px;font-family:Source Sans Pro SemiBold;font-size:14;color:#333}.footer-section .footer-txt-right-align{float:right;padding:0 10px;text-align:right}.footer-section .footer-txt-right-align span.footer-txt-right-align-title{display:block;font-family:Source Sans Pro SemiBold;font-size:14}.footer-section .footer-txt-right-align span.footer-txt-right-align-note{color:#767676;font-family:Source Sans Pro;font-size:12}.image-name{position:absolute;top:10px;left:10px;z-index:98;font-family:Source Sans Pro SemiBold;font-size:16;color:#333}@keyframes rotation{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(359deg)}}\n"], directives: [{ type: i1.FullScreenDirective, selector: "[appScreenfull]", inputs: ["appScreenfull"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AngularImageViewerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'angular-image-viewer', template: "<div [appScreenfull]=\"fullscreen\" class=\"img-container\" [style.backgroundColor]=\"config.containerBackgroundColor\"\r\n    (wheel)=\"scrollZoom($event)\">\r\n    <div class=\"image-name\" *ngIf=\"imageName\">\r\n      <span>{{imageName}}</span>\r\n    </div>\r\n\r\n    <div cdkDrag class=\"drag-element\">\r\n        <img [src]=\"src[index]\" [ngStyle]=\"style\" alt=\"\"\r\n            (cdkDragStarted)=\"onDragStart($event)\"\r\n            (load)=\"onLoad()\" (loadstart)=\"onLoadStart()\" (error)=\"imageNotFound()\" />\r\n    </div>\r\n\r\n    <div class=\"spinner-container\" *ngIf=\"loading\">\r\n        <div class=\"spinner\"></div>\r\n    </div>\r\n\r\n    <div class=\"button-container\">\r\n        <button type=\"button\" id=\"ngx-fs-btn\" [class]=\"config.btnClass\" (click)=\"toggleFullscreen()\"\r\n        [style.color]=\"config.primaryColor\" *ngIf=\"config.allowFullscreen\">\r\n            <span [class]=\"config.btnIcons?.fullscreen\"></span>\r\n        </button>\r\n\r\n        <div class=\"button-container-bottom\">\r\n            <button type=\"button\" [class]=\"config.btnClass\" *ngFor=\"let cBtn of config.customBtns\"\r\n            [style.color]=\"config.primaryColor\" (click)=\"fireCustomEvent(cBtn.name, index)\">\r\n                <span [class]=\"cBtn.icon\"></span>\r\n            </button>\r\n\r\n            <button type=\"button\" [class]=\"config.btnClass\" *ngIf=\"config.btnShow?.rotateCounterClockwise\"\r\n            [style.color]=\"config.primaryColor\" (click)=\"rotateCounterClockwise()\">\r\n                <span [class]=\"config.btnIcons?.rotateCounterClockwise\"></span>\r\n            </button>\r\n            <button type=\"button\" [class]=\"config.btnClass\" *ngIf=\"config.btnShow?.rotateClockwise\"\r\n            [style.color]=\"config.primaryColor\" (click)=\"rotateClockwise()\">\r\n                <span [class]=\"config.btnIcons?.rotateClockwise\"></span>\r\n            </button>\r\n\r\n            <div class=\"button-zoom-in-out-container\">\r\n                <button type=\"button\" [class]=\"config.btnClass\" *ngIf=\"config.btnShow?.zoomIn\"\r\n                [style.color]=\"config.primaryColor\" (click)=\"zoomIn()\">\r\n                    <span [class]=\"config.btnIcons?.zoomIn\"></span>\r\n                </button>\r\n                <button type=\"button\" [class]=\"config.btnClass\" *ngIf=\"config.btnShow?.zoomOut\"\r\n                [style.color]=\"config.primaryColor\" (click)=\"zoomOut()\">\r\n                    <span [class]=\"config.btnIcons?.zoomOut\"></span>\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"nav-button-container\" *ngIf=\"src.length > 1\">\r\n        <button type=\"button\" #prevImg [class]=\"config.btnClass\" (click)=\"prevImage($event); prevImg.blur()\"\r\n        [style.color]=\"config.primaryColor\"  [disabled]=\"index === 0\">\r\n            <span [class]=\"config.btnIcons?.prev\"></span>\r\n        </button>\r\n        <button type=\"button\" #nextImg [class]=\"config.btnClass\" (click)=\"nextImage($event); nextImg.blur()\"\r\n        [style.color]=\"config.primaryColor\"  [disabled]=\"index === src.length - 1\">\r\n            <span [class]=\"config.btnIcons?.next\"></span>\r\n        </button>\r\n    </div>\r\n    <div class=\"footer-section\">\r\n        <div class=\"image-txt-count-left-align\"><span>{{footerTexts[0]}} {{index + 1}} {{footerTexts[1]}} {{src.length}}</span></div>\r\n        <div class=\"footer-txt-right-align\">\r\n            <span class=\"footer-txt-right-align-title\" [style.color]=\"config.primaryColor\">{{footerTexts[2]}}</span>\r\n            <span class=\"footer-txt-right-align-note\">{{footerTexts[3]}}</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n", styles: [".img-container{position:relative;width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden}.img-container .drag-element{position:absolute;top:35px;right:78px;width:calc(100% - 156px);height:calc(100% - 85px);cursor:grab;text-align:center}.img-container .drag-element img{padding:0;max-width:100%;max-height:100%}.img-container .drag-element:active{cursor:grabbing}.img-container button{z-index:99}.img-container button:not(:disabled){cursor:pointer}#ngx-fs-btn{top:15px}button.default{height:24px;width:24px;opacity:.9;transition:opacity .2s;font-size:12px;background:inherit;background-color:#fff;border:none;border-radius:31px;box-shadow:0 0 5px #00000059}button.default:focus{outline:none;opacity:1}button.default:hover{opacity:1}button.default:disabled{opacity:.3}.nav-button-container>button{position:relative;right:0;margin:0 10px}.nav-button-container{text-align:right;position:absolute;z-index:98;bottom:60px;left:0;right:10px}.nav-button-container button.default{height:30px;margin:0;font-size:14px}.nav-button-container button.default:first-child{border-radius:4px 0 0 4px}.nav-button-container button.default:last-child{margin-left:10px;border-radius:0 4px 4px 0}.button-container{position:absolute;top:10px;right:10px;width:24px;height:calc(100% - 115px);z-index:98}.button-container .button-container-bottom{position:absolute;bottom:0}.button-container .button-container-bottom button.default{margin-top:10px}.button-container .button-container-bottom .button-zoom-in-out-container{margin-top:15px}.button-container .button-container-bottom .button-zoom-in-out-container button.default{margin:0;border-radius:0;height:30px}.button-container .button-container-bottom .button-zoom-in-out-container button.default:first-child{margin-bottom:1px}.spinner-container{position:absolute;inset:0;width:60px;height:60px;margin:auto;padding:10px;background-color:#0006;border-radius:25%}.spinner{border-width:7px;border-style:solid;border-color:#ccc;border-bottom-color:#222;border-radius:50%;height:100%;width:100%;box-sizing:border-box;animation:rotation 2s linear infinite}.footer-section{position:absolute;bottom:10px;left:0;width:100%;line-height:18px;z-index:98}.footer-section .image-txt-count-left-align{float:left;padding:0 10px;font-family:Source Sans Pro SemiBold;font-size:14;color:#333}.footer-section .footer-txt-right-align{float:right;padding:0 10px;text-align:right}.footer-section .footer-txt-right-align span.footer-txt-right-align-title{display:block;font-family:Source Sans Pro SemiBold;font-size:14}.footer-section .footer-txt-right-align span.footer-txt-right-align-note{color:#767676;font-family:Source Sans Pro;font-size:12}.image-name{position:absolute;top:10px;left:10px;z-index:98;font-family:Source Sans Pro SemiBold;font-size:16;color:#333}@keyframes rotation{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(359deg)}}\n"] }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['config']
                }] }]; }, propDecorators: { cdkDrag: [{
                type: ViewChild,
                args: [CdkDrag, { static: true }]
            }], src: [{
                type: Input
            }], config: [{
                type: Input
            }], screenHeightOccupied: [{
                type: Input
            }], index: [{
                type: Input
            }], imageName: [{
                type: Input
            }], footerTexts: [{
                type: Input
            }], indexChange: [{
                type: Output
            }], configChange: [{
                type: Output
            }], customImageEvent: [{
                type: Output
            }], nextImage: [{
                type: HostListener,
                args: ['window:keyup.ArrowRight', ['$event']]
            }], prevImage: [{
                type: HostListener,
                args: ['window:keyup.ArrowLeft', ['$event']]
            }], onMouseOver: [{
                type: HostListener,
                args: ['mouseover']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1pbWFnZS12aWV3ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1pbWFnZS12aWV3ZXIvc3JjL2xpYi9hbmd1bGFyLWltYWdlLXZpZXdlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyLWltYWdlLXZpZXdlci9zcmMvbGliL2FuZ3VsYXItaW1hZ2Utdmlld2VyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFDdkUsWUFBWSxFQUE0QixTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7OztBQUVqRCxNQUFNLGNBQWMsR0FBc0I7SUFDeEMsUUFBUSxFQUFFLFNBQVM7SUFDbkIsVUFBVSxFQUFFLEdBQUc7SUFDZix3QkFBd0IsRUFBRSxTQUFTO0lBQ25DLFlBQVksRUFBRSxFQUFFO0lBQ2hCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLHVCQUF1QixFQUFFLElBQUk7SUFDN0IsT0FBTyxFQUFFO1FBQ1AsTUFBTSxFQUFFLElBQUk7UUFDWixPQUFPLEVBQUUsSUFBSTtRQUNiLGVBQWUsRUFBRSxJQUFJO1FBQ3JCLHNCQUFzQixFQUFFLElBQUk7UUFDNUIsSUFBSSxFQUFFLElBQUk7UUFDVixJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsTUFBTSxFQUFFLFlBQVk7UUFDcEIsT0FBTyxFQUFFLGFBQWE7UUFDdEIsZUFBZSxFQUFFLGVBQWU7UUFDaEMsc0JBQXNCLEVBQUUsWUFB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QUFFLENBQUMsUUFBUSxDQUFDO2dCQTZGbEQsV0FBVztzQkFEVixZQUFZO3VCQUFDLFdBQVc7Z0JBTXpCLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEhvc3RMaXN0ZW5lciwgT3B0aW9uYWwsIEluamVjdCwgSW5wdXQsIE91dHB1dCxcclxuICBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEltYWdlVmlld2VyQ29uZmlnIH0gZnJvbSAnLi9tb2RlbHMvaW1hZ2Utdmlld2VyLWNvbmZpZy5tb2RlbCc7XHJcbmltcG9ydCB7IEN1c3RvbUltYWdlRXZlbnQgfSBmcm9tICcuL21vZGVscy9jdXN0b20taW1hZ2UtZXZlbnQtbW9kZWwnO1xyXG5pbXBvcnQgeyBDZGtEcmFnIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XHJcblxyXG5jb25zdCBERUZBVUxUX0NPTkZJRzogSW1hZ2VWaWV3ZXJDb25maWcgPSB7XHJcbiAgYnRuQ2xhc3M6ICdkZWZhdWx0JyxcclxuICB6b29tRmFjdG9yOiAwLjEsXHJcbiAgY29udGFpbmVyQmFja2dyb3VuZENvbG9yOiAnI2U0ZGVkZScsXHJcbiAgcHJpbWFyeUNvbG9yOiAnJyxcclxuICB3aGVlbFpvb206IGZhbHNlLFxyXG4gIGFsbG93RnVsbHNjcmVlbjogdHJ1ZSxcclxuICBhbGxvd0tleWJvYXJkTmF2aWdhdGlvbjogdHJ1ZSxcclxuICBidG5TaG93OiB7XHJcbiAgICB6b29tSW46IHRydWUsXHJcbiAgICB6b29tT3V0OiB0cnVlLFxyXG4gICAgcm90YXRlQ2xvY2t3aXNlOiB0cnVlLFxyXG4gICAgcm90YXRlQ291bnRlckNsb2Nrd2lzZTogdHJ1ZSxcclxuICAgIG5leHQ6IHRydWUsXHJcbiAgICBwcmV2OiB0cnVlXHJcbiAgfSxcclxuICBidG5JY29uczoge1xyXG4gICAgem9vbUluOiAnZmEgZmEtcGx1cycsXHJcbiAgICB6b29tT3V0OiAnZmEgZmEtbWludXMnLFxyXG4gICAgcm90YXRlQ2xvY2t3aXNlOiAnZmEgZmEtcmVmcmVzaCcsXHJcbiAgICByb3RhdGVDb3VudGVyQ2xvY2t3aXNlOiAnZmEgZmEtdW5kbycsXHJcbiAgICBuZXh0OiAnZmEgZmEtY2hldnJvbi1yaWdodCcsXHJcbiAgICBwcmV2OiAnZmEgZmEtY2hldnJvbi1sZWZ0JyxcclxuICAgIGZ1bGxzY3JlZW46ICdmYSBmYS1hcnJvd3MtYWx0JyxcclxuICB9XHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICdhbmd1bGFyLWltYWdlLXZpZXdlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FuZ3VsYXItaW1hZ2Utdmlld2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hbmd1bGFyLWltYWdlLXZpZXdlci5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFySW1hZ2VWaWV3ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcblxyXG4gIEBWaWV3Q2hpbGQoQ2RrRHJhZywgeyBzdGF0aWM6IHRydWUgfSkgY2RrRHJhZyE6IENka0RyYWc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgc3JjOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGNvbmZpZyE6IEltYWdlVmlld2VyQ29uZmlnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNjcmVlbkhlaWdodE9jY3VwaWVkID0gMDsgICAgICAgICAgICAgLy8gSW4gUHhcclxuXHJcbiAgQElucHV0KClcclxuICBpbmRleCA9IDA7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgaW1hZ2VOYW1lITogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGZvb3RlclRleHRzID0gW1xyXG4gICAgJ0ltYWdlJyxcclxuICAgICdvZicsXHJcbiAgICAnVmlldyBwcmV2aW91cyBvciBuZXh0IGltYWdlJyxcclxuICAgICd1c2luZyA8ID4gb24gdGhlIGtleWJvYXJkJ1xyXG4gIF07XHJcblxyXG4gIEBPdXRwdXQoKVxyXG4gIGluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgY29uZmlnQ2hhbmdlOiBFdmVudEVtaXR0ZXI8SW1hZ2VWaWV3ZXJDb25maWc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBAT3V0cHV0KClcclxuICBjdXN0b21JbWFnZUV2ZW50OiBFdmVudEVtaXR0ZXI8Q3VzdG9tSW1hZ2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHN0eWxlSGVpZ2h0ID0gJzk4dmgnO1xyXG5cclxuICBwdWJsaWMgc3R5bGUgPSB7IHRyYW5zZm9ybTogJycsIG1zVHJhbnNmb3JtOiAnJywgb1RyYW5zZm9ybTogJycsIHdlYmtpdFRyYW5zZm9ybTogJycgfTtcclxuICBwdWJsaWMgZnVsbHNjcmVlbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyBsb2FkaW5nID0gdHJ1ZTtcclxuICBwdWJsaWMgaXNEcmFnT24gPSBmYWxzZTtcclxuICBwcml2YXRlIHNjYWxlID0gMTtcclxuICBwcml2YXRlIHJvdGF0aW9uID0gMDtcclxuICBwcml2YXRlIGhvdmVyZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdCgnY29uZmlnJykgcHVibGljIG1vZHVsZUNvbmZpZzogSW1hZ2VWaWV3ZXJDb25maWcpIHsgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlc1snc2NyZWVuSGVpZ2h0T2NjdXBpZWQnXSkge1xyXG4gICAgICB0aGlzLnN0eWxlSGVpZ2h0ID0gJ2NhbGMoOTh2aCAtICcgKyB0aGlzLnNjcmVlbkhlaWdodE9jY3VwaWVkICsgJ3B4KSc7XHJcbiAgICB9IGVsc2UgaWYgKGNoYW5nZXNbJ2luZGV4J10pIHtcclxuICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBjb25zdCBtZXJnZWQgPSB0aGlzLm1lcmdlQ29uZmlnKERFRkFVTFRfQ09ORklHLCB0aGlzLm1vZHVsZUNvbmZpZyk7XHJcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMubWVyZ2VDb25maWcobWVyZ2VkLCB0aGlzLmNvbmZpZyk7XHJcbiAgICB0aGlzLnRyaWdnZXJDb25maWdCaW5kaW5nKCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5dXAuQXJyb3dSaWdodCcsIFsnJGV2ZW50J10pXHJcbiAgbmV4dEltYWdlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5jYW5OYXZpZ2F0ZShldmVudCkgJiYgdGhpcy5pbmRleCA8IHRoaXMuc3JjLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pbmRleCsrO1xyXG4gICAgICB0aGlzLnRyaWdnZXJJbmRleEJpbmRpbmcoKTtcclxuICAgICAgdGhpcy5maXJlQ3VzdG9tRXZlbnQoJ25leHQnLCB0aGlzLmluZGV4KTtcclxuICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OmtleXVwLkFycm93TGVmdCcsIFsnJGV2ZW50J10pXHJcbiAgcHJldkltYWdlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5jYW5OYXZpZ2F0ZShldmVudCkgJiYgdGhpcy5pbmRleCA+IDApIHtcclxuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pbmRleC0tO1xyXG4gICAgICB0aGlzLnRyaWdnZXJJbmRleEJpbmRpbmcoKTtcclxuICAgICAgdGhpcy5maXJlQ3VzdG9tRXZlbnQoJ3ByZXYnLCB0aGlzLmluZGV4KTtcclxuICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgem9vbUluKCkge1xyXG4gICAgdGhpcy5zY2FsZSAqPSAoMSArIHRoaXMudW53cmFwKHRoaXMuY29uZmlnLnpvb21GYWN0b3IpKTtcclxuICAgIHRoaXMuZmlyZUN1c3RvbUV2ZW50KCd6b29tSW4nLCB0aGlzLnNjYWxlKTtcclxuICAgIHRoaXMudXBkYXRlU3R5bGUoKTtcclxuICB9XHJcblxyXG4gIHpvb21PdXQoKSB7XHJcbiAgICBpZiAodGhpcy5zY2FsZSA+IHRoaXMudW53cmFwKHRoaXMuY29uZmlnLnpvb21GYWN0b3IpKSB7XHJcbiAgICAgIHRoaXMuc2NhbGUgLz0gKDEgKyB0aGlzLnVud3JhcCh0aGlzLmNvbmZpZy56b29tRmFjdG9yKSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZpcmVDdXN0b21FdmVudCgnem9vbU91dCcsIHRoaXMuc2NhbGUpO1xyXG4gICAgdGhpcy51cGRhdGVTdHlsZSgpO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsWm9vbShldnQ6IFdoZWVsRXZlbnQpIHtcclxuICAgIGlmICh0aGlzLmNvbmZpZy53aGVlbFpvb20pIHtcclxuICAgICAgZXZ0LmRlbHRhWSA+IDAgPyB0aGlzLnpvb21PdXQoKSA6IHRoaXMuem9vbUluKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJvdGF0ZUNsb2Nrd2lzZSgpIHtcclxuICAgIHRoaXMucm90YXRpb24gKz0gOTA7XHJcbiAgICB0aGlzLmZpcmVDdXN0b21FdmVudCgncm90YXRlQ2xvY2t3aXNlJywgdGhpcy5yb3RhdGlvbik7XHJcbiAgICB0aGlzLnVwZGF0ZVN0eWxlKCk7XHJcbiAgfVxyXG5cclxuICByb3RhdGVDb3VudGVyQ2xvY2t3aXNlKCkge1xyXG4gICAgdGhpcy5yb3RhdGlvbiAtPSA5MDtcclxuICAgIHRoaXMudXBkYXRlU3R5bGUoKTtcclxuICB9XHJcblxyXG4gIG9uTG9hZCgpIHtcclxuICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgb25Mb2FkU3RhcnQoKSB7XHJcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaW1hZ2VOb3RGb3VuZCgpIHtcclxuICB9XHJcblxyXG4gIG9uRHJhZ1N0YXJ0KGV2dDogYW55KSB7XHJcbiAgICBpZiAoZXZ0LnNvdXJjZS5fZHJhZ1JlZi5faW5pdGlhbFRyYW5zZm9ybSAmJiBldnQuc291cmNlLl9kcmFnUmVmLl9pbml0aWFsVHJhbnNmb3JtLmxlbmd0aCA+IDApIHtcclxuICAgICAgY29uc3QgbXlUcmFuc2xhdGUgPSBldnQuc291cmNlLl9kcmFnUmVmLl9pbml0aWFsVHJhbnNmb3JtLnNwbGl0KCcgcm90YXRlJylbMF07XHJcbiAgICAgIGNvbnN0IG15Um90YXRlID0gdGhpcy5zdHlsZS50cmFuc2Zvcm0uc3BsaXQoJyByb3RhdGUnKVsxXTtcclxuICAgICAgZXZ0LnNvdXJjZS5fZHJhZ1JlZi5faW5pdGlhbFRyYW5zZm9ybSA9IGAke215VHJhbnNsYXRlfSByb3RhdGUke215Um90YXRlfWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBldnQuc291cmNlLl9kcmFnUmVmLl9pbml0aWFsVHJhbnNmb3JtID0gdGhpcy5zdHlsZS50cmFuc2Zvcm07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGdWxsc2NyZWVuKCkge1xyXG4gICAgdGhpcy5mdWxsc2NyZWVuID0gIXRoaXMuZnVsbHNjcmVlbjtcclxuICAgIGlmICghdGhpcy5mdWxsc2NyZWVuKSB7XHJcbiAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRyaWdnZXJJbmRleEJpbmRpbmcoKSB7XHJcbiAgICB0aGlzLmluZGV4Q2hhbmdlLmVtaXQodGhpcy5pbmRleCk7XHJcbiAgfVxyXG5cclxuICB0cmlnZ2VyQ29uZmlnQmluZGluZygpIHtcclxuICAgIHRoaXMuY29uZmlnQ2hhbmdlLm5leHQodGhpcy5jb25maWcpO1xyXG4gIH1cclxuXHJcbiAgZmlyZUN1c3RvbUV2ZW50KG5hbWU6IHN0cmluZywgaW1hZ2VJbmRleDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmN1c3RvbUltYWdlRXZlbnQuZW1pdChuZXcgQ3VzdG9tSW1hZ2VFdmVudChuYW1lLCBpbWFnZUluZGV4KSk7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMuc2NhbGUgPSAxO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IDA7XHJcbiAgICB0aGlzLnVwZGF0ZVN0eWxlKCk7XHJcbiAgICB0aGlzLmNka0RyYWcucmVzZXQoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3ZlcicpXHJcbiAgb25Nb3VzZU92ZXIoKSB7XHJcbiAgICB0aGlzLmhvdmVyZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXHJcbiAgb25Nb3VzZUxlYXZlKCkge1xyXG4gICAgdGhpcy5ob3ZlcmVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhbk5hdmlnYXRlKGV2ZW50OiBhbnkpIHtcclxuICAgIGlmIChldmVudC50eXBlID09PSAna2V5dXAnKSB7XHJcbiAgICAgIHJldHVybiAodGhpcy5jb25maWcuYWxsb3dLZXlib2FyZE5hdmlnYXRpb24gJiYgdGhpcy5ob3ZlcmVkKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ2NsaWNrJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5ob3ZlcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVTdHlsZSgpIHtcclxuICAgIHRoaXMuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RoaXMucm90YXRpb259ZGVnKSBzY2FsZSgke3RoaXMuc2NhbGV9KWA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1lcmdlQ29uZmlnKGRlZmF1bHRWYWx1ZXM6IEltYWdlVmlld2VyQ29uZmlnLCBvdmVycmlkZVZhbHVlczogSW1hZ2VWaWV3ZXJDb25maWcpOiBJbWFnZVZpZXdlckNvbmZpZyB7XHJcbiAgICBsZXQgcmVzdWx0OiBJbWFnZVZpZXdlckNvbmZpZyA9IHsgLi4uZGVmYXVsdFZhbHVlcyB9O1xyXG4gICAgaWYgKG92ZXJyaWRlVmFsdWVzKSB7XHJcbiAgICAgIHJlc3VsdCA9IHsgLi4uZGVmYXVsdFZhbHVlcywgLi4ub3ZlcnJpZGVWYWx1ZXMgfTtcclxuXHJcbiAgICAgIGlmIChvdmVycmlkZVZhbHVlcy5idG5JY29ucykge1xyXG4gICAgICAgIHJlc3VsdC5idG5JY29ucyA9IHsgLi4uZGVmYXVsdFZhbHVlcy5idG5JY29ucywgLi4ub3ZlcnJpZGVWYWx1ZXMuYnRuSWNvbnMgfTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgdW53cmFwID0gKG46IG51bWJlcnx1bmRlZmluZWQpOiBudW1iZXIgPT4gbj9uOjA7XHJcbn1cclxuIiwiPGRpdiBbYXBwU2NyZWVuZnVsbF09XCJmdWxsc2NyZWVuXCIgY2xhc3M9XCJpbWctY29udGFpbmVyXCIgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJjb25maWcuY29udGFpbmVyQmFja2dyb3VuZENvbG9yXCJcclxuICAgICh3aGVlbCk9XCJzY3JvbGxab29tKCRldmVudClcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1uYW1lXCIgKm5nSWY9XCJpbWFnZU5hbWVcIj5cclxuICAgICAgPHNwYW4+e3tpbWFnZU5hbWV9fTwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2RrRHJhZyBjbGFzcz1cImRyYWctZWxlbWVudFwiPlxyXG4gICAgICAgIDxpbWcgW3NyY109XCJzcmNbaW5kZXhdXCIgW25nU3R5bGVdPVwic3R5bGVcIiBhbHQ9XCJcIlxyXG4gICAgICAgICAgICAoY2RrRHJhZ1N0YXJ0ZWQpPVwib25EcmFnU3RhcnQoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChsb2FkKT1cIm9uTG9hZCgpXCIgKGxvYWRzdGFydCk9XCJvbkxvYWRTdGFydCgpXCIgKGVycm9yKT1cImltYWdlTm90Rm91bmQoKVwiIC8+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lci1jb250YWluZXJcIiAqbmdJZj1cImxvYWRpbmdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic3Bpbm5lclwiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1jb250YWluZXJcIj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cIm5neC1mcy1idG5cIiBbY2xhc3NdPVwiY29uZmlnLmJ0bkNsYXNzXCIgKGNsaWNrKT1cInRvZ2dsZUZ1bGxzY3JlZW4oKVwiXHJcbiAgICAgICAgW3N0eWxlLmNvbG9yXT1cImNvbmZpZy5wcmltYXJ5Q29sb3JcIiAqbmdJZj1cImNvbmZpZy5hbGxvd0Z1bGxzY3JlZW5cIj5cclxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImNvbmZpZy5idG5JY29ucz8uZnVsbHNjcmVlblwiPjwvc3Bhbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1jb250YWluZXItYm90dG9tXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtjbGFzc109XCJjb25maWcuYnRuQ2xhc3NcIiAqbmdGb3I9XCJsZXQgY0J0biBvZiBjb25maWcuY3VzdG9tQnRuc1wiXHJcbiAgICAgICAgICAgIFtzdHlsZS5jb2xvcl09XCJjb25maWcucHJpbWFyeUNvbG9yXCIgKGNsaWNrKT1cImZpcmVDdXN0b21FdmVudChjQnRuLm5hbWUsIGluZGV4KVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImNCdG4uaWNvblwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcblxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbY2xhc3NdPVwiY29uZmlnLmJ0bkNsYXNzXCIgKm5nSWY9XCJjb25maWcuYnRuU2hvdz8ucm90YXRlQ291bnRlckNsb2Nrd2lzZVwiXHJcbiAgICAgICAgICAgIFtzdHlsZS5jb2xvcl09XCJjb25maWcucHJpbWFyeUNvbG9yXCIgKGNsaWNrKT1cInJvdGF0ZUNvdW50ZXJDbG9ja3dpc2UoKVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImNvbmZpZy5idG5JY29ucz8ucm90YXRlQ291bnRlckNsb2Nrd2lzZVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIFtjbGFzc109XCJjb25maWcuYnRuQ2xhc3NcIiAqbmdJZj1cImNvbmZpZy5idG5TaG93Py5yb3RhdGVDbG9ja3dpc2VcIlxyXG4gICAgICAgICAgICBbc3R5bGUuY29sb3JdPVwiY29uZmlnLnByaW1hcnlDb2xvclwiIChjbGljayk9XCJyb3RhdGVDbG9ja3dpc2UoKVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImNvbmZpZy5idG5JY29ucz8ucm90YXRlQ2xvY2t3aXNlXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b24tem9vbS1pbi1vdXQtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbY2xhc3NdPVwiY29uZmlnLmJ0bkNsYXNzXCIgKm5nSWY9XCJjb25maWcuYnRuU2hvdz8uem9vbUluXCJcclxuICAgICAgICAgICAgICAgIFtzdHlsZS5jb2xvcl09XCJjb25maWcucHJpbWFyeUNvbG9yXCIgKGNsaWNrKT1cInpvb21JbigpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImNvbmZpZy5idG5JY29ucz8uem9vbUluXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbY2xhc3NdPVwiY29uZmlnLmJ0bkNsYXNzXCIgKm5nSWY9XCJjb25maWcuYnRuU2hvdz8uem9vbU91dFwiXHJcbiAgICAgICAgICAgICAgICBbc3R5bGUuY29sb3JdPVwiY29uZmlnLnByaW1hcnlDb2xvclwiIChjbGljayk9XCJ6b29tT3V0KClcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY29uZmlnLmJ0bkljb25zPy56b29tT3V0XCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cIm5hdi1idXR0b24tY29udGFpbmVyXCIgKm5nSWY9XCJzcmMubGVuZ3RoID4gMVwiPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiICNwcmV2SW1nIFtjbGFzc109XCJjb25maWcuYnRuQ2xhc3NcIiAoY2xpY2spPVwicHJldkltYWdlKCRldmVudCk7IHByZXZJbWcuYmx1cigpXCJcclxuICAgICAgICBbc3R5bGUuY29sb3JdPVwiY29uZmlnLnByaW1hcnlDb2xvclwiICBbZGlzYWJsZWRdPVwiaW5kZXggPT09IDBcIj5cclxuICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImNvbmZpZy5idG5JY29ucz8ucHJldlwiPjwvc3Bhbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAjbmV4dEltZyBbY2xhc3NdPVwiY29uZmlnLmJ0bkNsYXNzXCIgKGNsaWNrKT1cIm5leHRJbWFnZSgkZXZlbnQpOyBuZXh0SW1nLmJsdXIoKVwiXHJcbiAgICAgICAgW3N0eWxlLmNvbG9yXT1cImNvbmZpZy5wcmltYXJ5Q29sb3JcIiAgW2Rpc2FibGVkXT1cImluZGV4ID09PSBzcmMubGVuZ3RoIC0gMVwiPlxyXG4gICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY29uZmlnLmJ0bkljb25zPy5uZXh0XCI+PC9zcGFuPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLXNlY3Rpb25cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtdHh0LWNvdW50LWxlZnQtYWxpZ25cIj48c3Bhbj57e2Zvb3RlclRleHRzWzBdfX0ge3tpbmRleCArIDF9fSB7e2Zvb3RlclRleHRzWzFdfX0ge3tzcmMubGVuZ3RofX08L3NwYW4+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvb3Rlci10eHQtcmlnaHQtYWxpZ25cIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmb290ZXItdHh0LXJpZ2h0LWFsaWduLXRpdGxlXCIgW3N0eWxlLmNvbG9yXT1cImNvbmZpZy5wcmltYXJ5Q29sb3JcIj57e2Zvb3RlclRleHRzWzJdfX08L3NwYW4+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZm9vdGVyLXR4dC1yaWdodC1hbGlnbi1ub3RlXCI+e3tmb290ZXJUZXh0c1szXX19PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=