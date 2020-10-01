import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularImageViewerComponent } from './angular-image-viewer.component';
import { FullScreenDirective } from './directives/full-screen.directive';



@NgModule({
  declarations: [AngularImageViewerComponent, FullScreenDirective],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  exports: [AngularImageViewerComponent, FullScreenDirective]
})
export class AngularImageViewerModule {
  /**
   * forRoot
   * @returns A module with its provider dependencies
   */
  // static forRoot(imageViewerConfig: ImageViewerConfig): ModuleWithProviders {
  //   return {
  //     ngModule: AngularImageViewerModule,
  //     providers: [
  //       {
  //         provide: imageViewerConfig,
  //         useValue: imageViewerConfig
  //       }
  //     ]
  //   };
  // }
}
