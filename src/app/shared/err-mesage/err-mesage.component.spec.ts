import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrMesageComponent } from './err-mesage.component';

describe('ErrMesageComponent', () => {
  let component: ErrMesageComponent;
  let fixture: ComponentFixture<ErrMesageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrMesageComponent]
    });
    fixture = TestBed.createComponent(ErrMesageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
