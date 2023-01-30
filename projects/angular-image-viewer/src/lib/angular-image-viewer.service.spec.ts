import { TestBed } from '@angular/core/testing';

import { AngularImageViewerService } from './angular-image-viewer.service';

describe('AngularImageViewerService', () => {
  let service: AngularImageViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularImageViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
