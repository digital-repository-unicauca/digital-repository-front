import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideInformationDocumentsComponent } from './side-information-documents.component';

describe('SideInformationDocumentsComponent', () => {
  let component: SideInformationDocumentsComponent;
  let fixture: ComponentFixture<SideInformationDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideInformationDocumentsComponent]
    });
    fixture = TestBed.createComponent(SideInformationDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
