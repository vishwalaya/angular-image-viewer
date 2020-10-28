import { Component } from '@angular/core';
import { ImageViewerConfig, CustomImageEvent } from '@clarivate/angular-image-viewer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-image-viewer';
  images = [
    'http://www.fillmurray.com/400/400',
    'http://www.fillmurray.com/600/550',
    'http://www.fillmurray.com/450/400',
    'http://www.fillmurray.com/510/500',

  ];
  imageIndex = 0;
  imageName: string;
  footerTexts = [
    'Image',
    'of',
    'View previous or next image',
    'using < > on the keyboard'
  ];
  config: ImageViewerConfig = {
    wheelZoom: true,
    allowKeyboardNavigation: true,
    primaryColor: '#008474',
    btnShow: {
      rotateClockwise: true,
      rotateCounterClockwise: true,
      zoomIn: true,
      zoomOut: true
    },
    btnIcons: {
      zoomIn: 'fa fa-plus',
      zoomOut: 'fa fa-minus',
      rotateClockwise: 'fa fa-refresh',
      rotateCounterClockwise: 'fa fa-undo',
      next: 'fa fa-chevron-right',
      prev: 'fa fa-chevron-left',
      fullscreen: 'fa fa-arrows-alt',
    },
    btnClass: 'default',
    customBtns: [{ name: 'print', icon: 'fa fa-print' }, { name: 'link', icon: 'fa fa-link' }]
  };

  handleEvent(event: CustomImageEvent) {
    // console.log(`${event.name} has been click on img ${event.imageIndex + 1}`);
    switch (event.name) {
      case 'print':
        // console.log('run print logic');
        break;
    }
  }
}
