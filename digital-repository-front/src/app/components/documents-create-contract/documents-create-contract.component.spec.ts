import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsCreateContractComponent } from './documents-create-contract.component';

describe('DocumentsCreateContractComponent', () => {
  let component: DocumentsCreateContractComponent;
  let fixture: ComponentFixture<DocumentsCreateContractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentsCreateContractComponent]
    });
    fixture = TestBed.createComponent(DocumentsCreateContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
