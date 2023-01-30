
# Angular Image Viewer

demo: https://pravinsharma.github.io/angular-image-viewer/

A configurable Angular image viewer component, compatible with Angular 13

## Features:
 * Compatible with Angular 13
 * Configurable
 * Rotate image
 * Zoom image
 * Drag to move image
 * Toggle Full Screen mode


## Set up

To use default configuration, simply import the ImageViewerModule into your module, like so:

```javascript
import { AngularImageViewerModule } from "@clarivate/angular-image-viewer";

@NgModule({
  //...
  imports: [
    //...
    AngularImageViewerModule
  ],
  //...
})
```

Then, add the component to your template, providing an array of image URLs. You can also optionally add an index, to indicate which image should be shown first. The default will be the first item in the array.

```html
<div class="container">
  <angular-image-viewer  [src]="images" [(index)]="imageIndex"></angular-image-viewer>
</div>
```

By default, the image viewer will fill its container. If you wish to restrict the size, simply place it within a div, and set the size constraints on the div:

```css
.container {
  position: relative;
  height: 600px;
  width: 600px;
}
```

---

## Configuration

Configuration can be provided at the module level (by passing the object as an argument to `forRoot()`, or at the component level, by passing it as the `config` input. Any configuration provided at the component level will override that which is set at the module level.

The configuration object is structured as below. All values are optional, and if omitted, the default value shown below will be used.

```javascript
{
  btnClass: 'default', // The CSS class(es) that will apply to the buttons
  zoomFactor: 0.1, // The amount that the scale will be increased by
  containerBackgroundColor: '#e4dede', // The color to use for the background. This can provided in hex, or rgb(a).
  primaryColor: '', // Color to use for all buttons image.
  wheelZoom: true, // If true, the mouse wheel can be used to zoom in
  allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to enter fullscreen mode
  allowKeyboardNavigation: true, // If true, the left / right arrow keys can be used for navigation
  btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
    zoomIn: 'fa fa-plus',
    zoomOut: 'fa fa-minus',
    rotateClockwise: 'fa fa-repeat',
    rotateCounterClockwise: 'fa fa-undo',
    next: 'fa fa-arrow-right',
    prev: 'fa fa-arrow-left',
    fullscreen: 'fa fa-arrows-alt',
  },
  btnShow: {
    zoomIn: true,
    zoomOut: true,
    rotateClockwise: true,
    rotateCounterClockwise: true,
    next: true,
    prev: true
  }
};
```

To add additional buttons use the following 

```html 
<angular-image-viewer [src]="images" 
                  [config]="{customBtns:[{name: 'link', icon: 'fa fa-paperclip'}]}"
                  (customImageEvent)="handleEvent($event)">
</angular-image-viewer>
```

```javascript
handleEvent(event: customImageEvent) {
    console.log(`${event.name} has been click on img ${event.imageIndex + 1}`);

    switch (event.name) {
      case 'print':
        console.log('run print logic');
        break;
    }
}
```

## Local setup for this branch:

* Add respective version of this component. yarn add @clarivate/angular-image-viewer.
* yarn serve-lib is to compile your changes in projects\angular-image-viewer and it will update in dist folder. But to reflect in UI, update projects\angular-image-viewer\ng-package.json file dest to node_module location. "dest": "../../node_modules/@clarivate/angular-image-viewer",
* yarn start to get the application up.


Note: This package is built using the idea from ngx-image-viewer(https://github.com/jpilfold/ngx-image-viewer). It has advantage that it uses latest dependencies which fixes Issue #23 & #29  i.e related to FullScreen Image. 


