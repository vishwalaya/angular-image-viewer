import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularImageViewerComponent } from './angular-image-viewer.component';
import { FullScreenDirective } from './directives/full-screen.directive';
import * as i0 from "@angular/core";
export class AngularImageViewerModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1pbWFnZS12aWV3ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhci1pbWFnZS12aWV3ZXIvc3JjL2xpYi9hbmd1bGFyLWltYWdlLXZpZXdlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOztBQWdCekUsTUFBTSxPQUFPLHdCQUF3Qjs7c0hBQXhCLHdCQUF3Qjt1SEFBeEIsd0JBQXdCLGlCQVZqQywyQkFBMkIsRUFBRSxtQkFBbUIsYUFHaEQsWUFBWTtRQUNaLGNBQWMsYUFHZCwyQkFBMkIsRUFBRSxtQkFBbUIsRUFBRSxjQUFjO3VIQUd2RCx3QkFBd0IsWUFSMUI7WUFDUCxZQUFZO1lBQ1osY0FBYztTQUNmLEVBRW1ELGNBQWM7NEZBR3ZELHdCQUF3QjtrQkFacEMsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUU7d0JBQ1osMkJBQTJCLEVBQUUsbUJBQW1CO3FCQUNqRDtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixjQUFjO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDUCwyQkFBMkIsRUFBRSxtQkFBbUIsRUFBRSxjQUFjO3FCQUNqRTtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFuZ3VsYXJJbWFnZVZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vYW5ndWxhci1pbWFnZS12aWV3ZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRnVsbFNjcmVlbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9mdWxsLXNjcmVlbi5kaXJlY3RpdmUnO1xyXG5cclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgQW5ndWxhckltYWdlVmlld2VyQ29tcG9uZW50LCBGdWxsU2NyZWVuRGlyZWN0aXZlXHJcbiAgXSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBEcmFnRHJvcE1vZHVsZVxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQW5ndWxhckltYWdlVmlld2VyQ29tcG9uZW50LCBGdWxsU2NyZWVuRGlyZWN0aXZlLCBEcmFnRHJvcE1vZHVsZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJJbWFnZVZpZXdlck1vZHVsZSB7IH1cclxuIl19