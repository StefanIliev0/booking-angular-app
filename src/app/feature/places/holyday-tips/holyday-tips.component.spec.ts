import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolydayTipsComponent } from './holyday-tips.component';

describe('HolydayTipsComponent', () => {
  let component: HolydayTipsComponent;
  let fixture: ComponentFixture<HolydayTipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HolydayTipsComponent]
    });
    fixture = TestBed.createComponent(HolydayTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
