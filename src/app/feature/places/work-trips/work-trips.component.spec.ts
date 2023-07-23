import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTripsComponent } from './work-trips.component';

describe('WorkTripsComponent', () => {
  let component: WorkTripsComponent;
  let fixture: ComponentFixture<WorkTripsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkTripsComponent]
    });
    fixture = TestBed.createComponent(WorkTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
