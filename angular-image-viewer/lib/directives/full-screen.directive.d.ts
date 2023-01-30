import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class FullScreenDirective implements OnChanges {
    private el;
    fullscreenState: boolean;
    constructor(el: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FullScreenDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FullScreenDirective, "[appScreenfull]", never, { "fullscreenState": "appScreenfull"; }, {}, never>;
}
