import { TestBed } from '@angular/core/testing';

import { SideInformationDocumentsService } from './side-information-documents.service';

describe('SideInformationDocumentsService', () => {
  let service: SideInformationDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SideInformationDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
