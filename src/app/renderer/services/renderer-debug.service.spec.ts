import { TestBed } from '@angular/core/testing';

import { RendererDebugService } from './renderer-debug.service';

describe('RendererDebugService', () => {
  let service: RendererDebugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RendererDebugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
