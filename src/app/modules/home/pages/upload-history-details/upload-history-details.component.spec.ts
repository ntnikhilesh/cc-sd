import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadHistoryDetailsComponent } from './upload-history-details.component';

describe('UploadHistoryDetailsComponent', () => {
  let component: UploadHistoryDetailsComponent;
  let fixture: ComponentFixture<UploadHistoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadHistoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
