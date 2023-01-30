import * as i0 from '@angular/core';
import { Injectable, Directive, Input, EventEmitter, Component, Optional, Inject, ViewChild, Output, HostListener, NgModule } from '@angular/core';
import * as i3 from '@angular/cdk/drag-drop';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class AngularImageViewerService {
    constructor() { }
}
AngularImageViewerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AngularImageViewerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AngularImageViewerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AngularImageViewerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AngularImageViewerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class CustomImageEvent {
    constructor(name, imageIndex) {
        this.name = name;
        this.imageIndex = imageIndex;
    }
}

// import * as screenfull from 'screenfull';
class FullScreenDirective {
    constructor(el) {
        this.el = el;
    }
    ngOnChanges(changes) {
        // tslint:disable-next-line: no-string-literal
        if (!changes['fullscreenState'].isFirstChange()) {
            if (this.fullscreenState) {
                const element = this.el.nativeElement;
                // tslint:disable-next-line: max-line-length
                const requestMethod = element.requestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
                if (requestMethod) { // Native full screen.
                    requestMethod.call(element);
                }
                else {
                    console.log('FullScreen Request Method Not Supported on this browser.');
                }
            }
            else {
                const element = document;
                // tslint:disable-next-line: max-line-length
                const requestMethod = element.cancelFullscreen || element.webkitExitFullscreen || element.webkitCancelFullScreen || element.mozCancelFullScreen || element.msExitFullScreen;
                if (requestMethod) { // Native Cancel full screen.
                    requestMethod.call(element);
                }
                else {
                    console.error('Angular Image Viewer: FullScreen Cancel Request Method Not Supported on this browser.');
                }
            }
        }
    }
}
FullScreenDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FullScreenDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
FullScreenDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FullScreenDirective, selector: "[appScreenfull]", inputs: { fullscreenState: ["appScreenfull", "fullscreenState"] }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FullScreenDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appScreenfull]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { fullscreenState: [{
                type: Input,
                args: ['appScreenfull']
            }] } });

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
class AngularImageViewerComponent {
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
AngularImageViewerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: AngularImageViewerComponent, selector: "angular-image-viewer", inputs: { src: "src", config: "config", screenHeightOccupied: "screenHeightOccupied", index: "index", imageName: "imageName", footerTexts: "footerTexts" }, outputs: { indexChange: "indexChange", configChange: "configChange", customImageEvent: "customImageEvent" }, host: { listeners: { "window:keyup.ArrowRight": "nextImage($event)", "window:keyup.ArrowLeft": "prevImage($event)", "mouseover": "onMouseOver()", "mouseleave": "onMouseLeave()" } }, viewQueries: [{ propertyName: "cdkDrag", first: true, predicate: CdkDrag, descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div [appScreenfull]=\"fullscreen\" class=\"img-container\" [style.backgroundColor]=\"config.containerBackgroundColor\"\r\n    (wheel)=\"scrollZoom($event)\">\r\n    <div class=\"image-name\" *ngIf=\"imageName\">\r\n      <span>{{imageName}}</span>\r\n    </div>\r\n\r\n    <div cdkDrag class=\"drag-element\">\r\n        <img [src]=\"src[index]\" [ngStyle]=\"style\" alt=\"\"\r\n            (cdkDragStarted)=\"onDragStart($event)\"\r\n            (load)=\"onLoad()\" (loadstart)=\"onLoadStart()\" (error)=\"imageNotFound()\" />\r\n    </div>\r\n\r\n    <div class=\"spinner-container\" *ngIf=\"loading\">\r\n        <div class=\"spinner\"></div>\r\n    </div>\r\n\r\n    <div class=\"button-container\">\r\n        <button type=\"button\" id=\"ngx-fs-btn\" [class]=\"config.btnClass\" (click)=\"toggleFullscreen()\"\r\n        [style.color]=\"config.primaryColor\" *ngIf=\"config.allowFullscreen\">\r\n            <span [class]=\"config.btnIcons?.fullscreen\"></span>\r\n        </button>\r\n\r\n        <div class=\"button-container-bottom\">\r\n            <button type=\"button\" [class]=\"config.btnClass\" *ngFor=\"let cBtn of config.customBtns\"\r\n            [style.color]=\"config.primaryColor\" (click)=\"fireCustomEvent(cBtn.name, index)\">\r\n                <span [class]=\"cBtn.icon\"></span>\r\n            </button>\r\n\r\n            <button type=\"button\" [class]=\"config.btnClass\" *ngIf=\"config.btnShow?.rotateCounterClockwise\"\r\n            [style.color]=\"config.primaryColor\" (click)=\"rotateCounterClockwise()\">\r\n                <span [class]=\"config.btnIcons?.rotateCounterClockwise\"></span>\r\n            </button>\r\n            <button type=\"button\" [class]=\"config.btnClass\" *ngIf=\"config.btnShow?.rotateClockwise\"\r\n            [style.color]=\"config.primaryColor\" (click)=\"rotateClockwise()\">\r\n                <span [class]=\"config.btnIcons?.rotateClockwise\"></span>\r\n            </button>\r\n\r\n            <div class=\"button-zoom-in-out-container\">\r\n                <button type=\"button\" [class]=\"config.btnClass\" *ngIf=\"config.btnShow?.zoomIn\"\r\n                [style.color]=\"config.primaryColor\" (click)=\"zoomIn()\">\r\n                    <span [class]=\"config.btnIcons?.zoomIn\"></span>\r\n                </button>\r\n                <button type=\"button\" [class]=\"config.btnClass\" *ngIf=\"config.btnShow?.zoomOut\"\r\n                [style.color]=\"config.primaryColor\" (click)=\"zoomOut()\">\r\n                    <span [class]=\"config.btnIcons?.zoomOut\"></span>\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"nav-button-container\" *ngIf=\"src.length > 1\">\r\n        <button type=\"button\" #prevImg [class]=\"config.btnClass\" (click)=\"prevImage($event); prevImg.blur()\"\r\n        [style.color]=\"config.primaryColor\"  [disabled]=\"index === 0\">\r\n            <span [class]=\"config.btnIcons?.prev\"></span>\r\n        </button>\r\n        <button type=\"button\" #nextImg [class]=\"config.btnClass\" (click)=\"nextImage($event); nextImg.blur()\"\r\n        [style.color]=\"config.primaryColor\"  [disabled]=\"index === src.length - 1\">\r\n            <span [class]=\"config.btnIcons?.next\"></span>\r\n        </button>\r\n    </div>\r\n    <div class=\"footer-section\">\r\n        <div class=\"image-txt-count-left-align\"><span>{{footerTexts[0]}} {{index + 1}} {{footerTexts[1]}} {{src.length}}</span></div>\r\n        <div class=\"footer-txt-right-align\">\r\n            <span class=\"footer-txt-right-align-title\" [style.color]=\"config.primaryColor\">{{footerTexts[2]}}</span>\r\n            <span class=\"footer-txt-right-align-note\">{{footerTexts[3]}}</span>\r\n        </div>\r\n    </div>\r\n</div>\r\n", styles: [".img-container{position:relative;width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden}.img-container .drag-element{position:absolute;top:35px;right:78px;width:calc(100% - 156px);height:calc(100% - 85px);cursor:grab;text-align:center}.img-container .drag-element img{padding:0;max-width:100%;max-height:100%}.img-container .drag-element:active{cursor:grabbing}.img-container button{z-index:99}.img-container button:not(:disabled){cursor:pointer}#ngx-fs-btn{top:15px}button.default{height:24px;width:24px;opacity:.9;transition:opacity .2s;font-size:12px;background:inherit;background-color:#fff;border:none;border-radius:31px;box-shadow:0 0 5px #00000059}button.default:focus{outline:none;opacity:1}button.default:hover{opacity:1}button.default:disabled{opacity:.3}.nav-button-container>button{position:relative;right:0;margin:0 10px}.nav-button-container{text-align:right;position:absolute;z-index:98;bottom:60px;left:0;right:10px}.nav-button-container button.default{height:30px;margin:0;font-size:14px}.nav-button-container button.default:first-child{border-radius:4px 0 0 4px}.nav-button-container button.default:last-child{margin-left:10px;border-radius:0 4px 4px 0}.button-container{position:absolute;top:10px;right:10px;width:24px;height:calc(100% - 115px);z-index:98}.button-container .button-container-bottom{position:absolute;bottom:0}.button-container .button-container-bottom button.default{margin-top:10px}.button-container .button-container-bottom .button-zoom-in-out-container{margin-top:15px}.button-container .button-container-bottom .button-zoom-in-out-container button.default{margin:0;border-radius:0;height:30px}.button-container .button-container-bottom .button-zoom-in-out-container button.default:first-child{margin-bottom:1px}.spinner-container{position:absolute;inset:0;width:60px;height:60px;margin:auto;padding:10px;background-color:#0006;border-radius:25%}.spinner{border-width:7px;border-style:solid;border-color:#ccc;border-bottom-color:#222;border-radius:50%;height:100%;width:100%;box-sizing:border-box;animation:rotation 2s linear infinite}.footer-section{position:absolute;bottom:10px;left:0;width:100%;line-height:18px;z-index:98}.footer-section .image-txt-count-left-align{float:left;padding:0 10px;font-family:Source Sans Pro SemiBold;font-size:14;color:#333}.footer-section .footer-txt-right-align{float:right;padding:0 10px;text-align:right}.footer-section .footer-txt-right-align span.footer-txt-right-align-title{display:block;font-family:Source Sans Pro SemiBold;font-size:14}.footer-section .footer-txt-right-align span.footer-txt-right-align-note{color:#767676;font-family:Source Sans Pro;font-size:12}.image-name{position:absolute;top:10px;left:10px;z-index:98;font-family:Source Sans Pro SemiBold;font-size:16;color:#333}@keyframes rotation{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(359deg)}}\n"], directives: [{ type: FullScreenDirective, selector: "[appScreenfull]", inputs: ["appScreenfull"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
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

class AngularImageViewerModule {
}
AngularImageViewerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AngularImageViewerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AngularImageViewerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AngularImageViewerModule, declarations: [AngularImageViewerComponent, FullScreenDirective], imports: [CommonModule,
        DragDropModule], exports: [AngularImageViewerComponent, FullScreenDirective, DragDropModule] });
AngularImageViewerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AngularImageViewerModule, imports: [[
            CommonModule,
            DragDropModule
        ], DragDropModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AngularImageViewerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AngularImageViewerComponent, FullScreenDirective
                    ],
                    imports: [
                        CommonModule,
                        DragDropModule
                    ],
                    exports: [
                        AngularImageViewerComponent, FullScreenDirective, DragDropModule
                    ]
                }]
        }] });

/*
 * Public API Surface of angular-image-viewer
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AngularImageViewerComponent, AngularImageViewerModule, AngularImageViewerService, CustomImageEvent, FullScreenDirective };
//# sourceMappingURL=angular-image-viewer.mjs.map
