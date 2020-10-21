import { TestBed } from '@angular/core/testing';

import { ApiSkuService } from './api-sku.service';

describe('ApiSkuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiSkuService = TestBed.get(ApiSkuService);
    expect(service).toBeTruthy();
  });
});
