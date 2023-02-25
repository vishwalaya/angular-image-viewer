import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appScreenfull]'
})
export class FullScreenDirective implements OnChanges {

  @Input('appScreenfull') fullscreenState!: boolean;

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    // tslint:disable-next-line: no-string-literal
    if (!changes['fullscreenState'].isFirstChange()) {

      if (this.fullscreenState) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const element: any = this.el.nativeElement;

        // tslint:disable-next-line: max-line-length
        const requestMethod = element.requestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

        if (requestMethod) { // Native full screen.
          requestMethod.call(element);
        } else {
          console.error('FullScreen Request Method Not Supported on this browser.');
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const element: any = document;

        // tslint:disable-next-line: max-line-length
        const requestMethod = element.cancelFullscreen || element.webkitExitFullscreen || element.webkitCancelFullScreen || element.mozCancelFullScreen || element.msExitFullScreen;

        if (requestMethod) { // Native Cancel full screen.
          requestMethod.call(element);
        } else {
          console.error('Angular Image Viewer: FullScreen Cancel Request Method Not Supported on this browser.');
        }
      }
    }
  }
}
