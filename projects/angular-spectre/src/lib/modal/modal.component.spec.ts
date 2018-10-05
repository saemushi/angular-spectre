import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgsModalComponent} from './modal.component';

describe('NgsModalComponent', () => {
  let component: NgsModalComponent;
  let fixture: ComponentFixture<NgsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgsModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
