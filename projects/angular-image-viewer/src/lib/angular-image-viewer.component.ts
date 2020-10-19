import { Component, OnInit, HostListener, Optional, Inject, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ImageViewerConfig } from './models/image-viewer-config.model';
import { CustomImageEvent } from './models/custom-image-event-model';
import { DomSanitizer } from '@angular/platform-browser';

const DEFAULT_CONFIG: ImageViewerConfig = {
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

@Component({
  selector: 'angular-image-viewer',
  templateUrl: './angular-image-viewer.component.html',
  styleUrls: ['./angular-image-viewer.component.scss']
})
export class AngularImageViewerComponent implements OnInit, OnChanges {

  @Input()
  src: string[];

  @Input()
  screenHeightOccupied: 0;             // In Px

  @Input()
  index = 0;

  @Input()
  imageName: string;

  @Input()
  config: ImageViewerConfig;

  @Output()
  indexChange: EventEmitter<number> = new EventEmitter();

  @Output()
  configChange: EventEmitter<ImageViewerConfig> = new EventEmitter();

  @Output()
  customImageEvent: EventEmitter<CustomImageEvent> = new EventEmitter();

  styleHeight = '98vh';

  public style = { transform: '', msTransform: '', oTransform: '', webkitTransform: '' };
  public fullscreen = false;
  public loading = true;
  public isDragOn = false;
  private scale = 1;
  private rotation = 0;
  private hovered = false;

  constructor(@Optional() @Inject('config') public moduleConfig: ImageViewerConfig,
    private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.screenHeightOccupied) {
      this.styleHeight = 'calc(98vh - ' + this.screenHeightOccupied + 'px)';
    } else if (changes.index) {
      this.reset();
    }
  }

  ngOnInit() {
    const merged = this.mergeConfig(DEFAULT_CONFIG, this.moduleConfig);
    this.config = this.mergeConfig(merged, this.config);
    this.triggerConfigBinding();
  }

  @HostListener('window:keyup.ArrowRight', ['$event'])
  nextImage(event) {
    if (this.canNavigate(event) && this.index < this.src.length - 1) {
      this.loading = true;
      this.index++;
      this.triggerIndexBinding();
      this.reset();
    }
  }

  @HostListener('window:keyup.ArrowLeft', ['$event'])
  prevImage(event) {
    if (this.canNavigate(event) && this.index > 0) {
      this.loading = true;
      this.index--;
      this.triggerIndexBinding();
      this.reset();
    }
  }

  zoomIn() {
    this.scale *= (1 + this.config.zoomFactor);
    this.updateStyle();
  }

  zoomOut() {
    if (this.scale > this.config.zoomFactor) {
      this.scale /= (1 + this.config.zoomFactor);
    }
    this.updateStyle();
  }

  scrollZoom(evt) {
    if (this.config.wheelZoom) {
      evt.deltaY > 0 ? this.zoomOut() : this.zoomIn();
      return false;
    }
  }

  rotateClockwise() {
    this.rotation += 90;
    this.updateStyle();
  }

  rotateCounterClockwise() {
    this.rotation -= 90;
    this.updateStyle();
  }

  onLoad(url) {
    this.loading = false;
  }

  onLoadStart(url) {
    this.loading = true;
  }

  imageNotFound(url) {
  }

  onDragStart(evt) {
    if (evt.source._dragRef._initialTransform && evt.source._dragRef._initialTransform.length > 0) {
      const myTranslate = evt.source._dragRef._initialTransform.split(' rotate')[0];
      const myRotate = this.style.transform.split(' rotate')[1];
      evt.source._dragRef._initialTransform = `${myTranslate} rotate${myRotate}`;
    } else {
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
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.hovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hovered = false;
  }

  private canNavigate(event: any) {
    return event == null || (this.config.allowKeyboardNavigation && this.hovered);
  }

  private updateStyle() {
    this.style.transform = `rotate(${this.rotation}deg) scale(${this.scale})`;
  }

  private mergeConfig(defaultValues: ImageViewerConfig, overrideValues: ImageViewerConfig): ImageViewerConfig {
    let result: ImageViewerConfig = { ...defaultValues };
    if (overrideValues) {
      result = { ...defaultValues, ...overrideValues };

      if (overrideValues.btnIcons) {
        result.btnIcons = { ...defaultValues.btnIcons, ...overrideValues.btnIcons };
      }
    }
    return result;
  }

}
