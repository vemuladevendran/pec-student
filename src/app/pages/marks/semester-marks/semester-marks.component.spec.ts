import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterMarksComponent } from './semester-marks.component';

describe('SemesterMarksComponent', () => {
  let component: SemesterMarksComponent;
  let fixture: ComponentFixture<SemesterMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterMarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemesterMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
