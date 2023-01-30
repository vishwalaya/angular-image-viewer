import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
// import * as screenfull from 'screenfull';
export class FullScreenDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbC1zY3JlZW4uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1pbWFnZS12aWV3ZXIvc3JjL2xpYi9kaXJlY3RpdmVzL2Z1bGwtc2NyZWVuLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBZ0QsTUFBTSxlQUFlLENBQUM7O0FBQy9GLDRDQUE0QztBQUs1QyxNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLFlBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUksQ0FBQztJQUV2QyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsOENBQThDO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUUvQyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3hCLE1BQU0sT0FBTyxHQUFRLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUUzQyw0Q0FBNEM7Z0JBQzVDLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxPQUFPLENBQUMsdUJBQXVCLElBQUksT0FBTyxDQUFDLG9CQUFvQixJQUFJLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztnQkFFbEosSUFBSSxhQUFhLEVBQUUsRUFBRSxzQkFBc0I7b0JBQ3pDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzdCO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsMERBQTBELENBQUMsQ0FBQztpQkFDekU7YUFDRjtpQkFBTTtnQkFDTCxNQUFNLE9BQU8sR0FBUSxRQUFRLENBQUM7Z0JBRTlCLDRDQUE0QztnQkFDNUMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixJQUFJLE9BQU8sQ0FBQyxvQkFBb0IsSUFBSSxPQUFPLENBQUMsc0JBQXNCLElBQUksT0FBTyxDQUFDLG1CQUFtQixJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztnQkFFNUssSUFBSSxhQUFhLEVBQUUsRUFBRSw2QkFBNkI7b0JBQ2hELGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzdCO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUZBQXVGLENBQUMsQ0FBQztpQkFDeEc7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7aUhBbENVLG1CQUFtQjtxR0FBbkIsbUJBQW1COzRGQUFuQixtQkFBbUI7a0JBSC9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtpQkFDNUI7aUdBR3lCLGVBQWU7c0JBQXRDLEtBQUs7dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIE9uQ2hhbmdlcywgT25Jbml0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8vIGltcG9ydCAqIGFzIHNjcmVlbmZ1bGwgZnJvbSAnc2NyZWVuZnVsbCc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thcHBTY3JlZW5mdWxsXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEZ1bGxTY3JlZW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG5cclxuICBASW5wdXQoJ2FwcFNjcmVlbmZ1bGwnKSBmdWxsc2NyZWVuU3RhdGUhOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7IH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1zdHJpbmctbGl0ZXJhbFxyXG4gICAgaWYgKCFjaGFuZ2VzWydmdWxsc2NyZWVuU3RhdGUnXS5pc0ZpcnN0Q2hhbmdlKCkpIHtcclxuXHJcbiAgICAgIGlmICh0aGlzLmZ1bGxzY3JlZW5TdGF0ZSkge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQ6IGFueSA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcclxuICAgICAgICBjb25zdCByZXF1ZXN0TWV0aG9kID0gZWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbiB8fCBlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIHx8IGVsZW1lbnQubW96UmVxdWVzdEZ1bGxTY3JlZW4gfHwgZWxlbWVudC5tc1JlcXVlc3RGdWxsU2NyZWVuO1xyXG5cclxuICAgICAgICBpZiAocmVxdWVzdE1ldGhvZCkgeyAvLyBOYXRpdmUgZnVsbCBzY3JlZW4uXHJcbiAgICAgICAgICByZXF1ZXN0TWV0aG9kLmNhbGwoZWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdGdWxsU2NyZWVuIFJlcXVlc3QgTWV0aG9kIE5vdCBTdXBwb3J0ZWQgb24gdGhpcyBicm93c2VyLicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50OiBhbnkgPSBkb2N1bWVudDtcclxuXHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBtYXgtbGluZS1sZW5ndGhcclxuICAgICAgICBjb25zdCByZXF1ZXN0TWV0aG9kID0gZWxlbWVudC5jYW5jZWxGdWxsc2NyZWVuIHx8IGVsZW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4gfHwgZWxlbWVudC53ZWJraXRDYW5jZWxGdWxsU2NyZWVuIHx8IGVsZW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbiB8fCBlbGVtZW50Lm1zRXhpdEZ1bGxTY3JlZW47XHJcblxyXG4gICAgICAgIGlmIChyZXF1ZXN0TWV0aG9kKSB7IC8vIE5hdGl2ZSBDYW5jZWwgZnVsbCBzY3JlZW4uXHJcbiAgICAgICAgICByZXF1ZXN0TWV0aG9kLmNhbGwoZWxlbWVudCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FuZ3VsYXIgSW1hZ2UgVmlld2VyOiBGdWxsU2NyZWVuIENhbmNlbCBSZXF1ZXN0IE1ldGhvZCBOb3QgU3VwcG9ydGVkIG9uIHRoaXMgYnJvd3Nlci4nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19