import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrPageComponent } from './err-page.component';

describe('ErrPageComponent', () => {
  let component: ErrPageComponent;
  let fixture: ComponentFixture<ErrPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrPageComponent]
    });
    fixture = TestBed.createComponent(ErrPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
