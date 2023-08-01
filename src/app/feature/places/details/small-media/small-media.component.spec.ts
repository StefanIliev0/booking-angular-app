import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallMediaComponent } from './small-media.component';

describe('SmallMediaComponent', () => {
  let component: SmallMediaComponent;
  let fixture: ComponentFixture<SmallMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallMediaComponent]
    });
    fixture = TestBed.createComponent(SmallMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
