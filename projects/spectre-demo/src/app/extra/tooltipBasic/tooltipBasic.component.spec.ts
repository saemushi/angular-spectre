import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TooltipBasicComponent} from './tooltipBasic.component';

describe('TooltipComponent', () => {
  let component: TooltipBasicComponent;
  let fixture: ComponentFixture<TooltipBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipBasicComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
