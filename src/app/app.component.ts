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
    'http://www.fillmurray.com/400/450',
    'http://www.fillmurray.com/450/400',
    'http://www.fillmurray.com/510/500',

  ];

  imageIndexOne = 0;

  config: ImageViewerConfig = { customBtns: [{ name: 'print', icon: 'fa fa-print' }, { name: 'link', icon: 'fa fa-link' }] };

  handleEvent(event: CustomImageEvent) {
    console.log(`${event.name} has been click on img ${event.imageIndex + 1}`);

    switch (event.name) {
      case 'print':
        console.log('run print logic');
        break;
    }
  }
}
