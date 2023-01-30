import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularImageViewerComponent } from './angular-image-viewer.component';
import { FullScreenDirective } from './directives/full-screen.directive';



@NgModule({
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
})
export class AngularImageViewerModule { }
