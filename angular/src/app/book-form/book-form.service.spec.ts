import { TestBed } from '@angular/core/testing';

import { BookFormService } from './book-form.service';

describe('BookFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookFormService = TestBed.get(BookFormService);
    expect(service).toBeTruthy();
  });
});
