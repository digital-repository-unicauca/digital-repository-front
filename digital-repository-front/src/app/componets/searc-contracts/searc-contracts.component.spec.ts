import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcContractsComponent } from './searc-contracts.component';

describe('SearcContractsComponent', () => {
  let component: SearcContractsComponent;
  let fixture: ComponentFixture<SearcContractsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearcContractsComponent]
    });
    fixture = TestBed.createComponent(SearcContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
