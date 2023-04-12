import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepseFormComponent } from './repse-form.component';

describe('RepseFormComponent', () => {
  let component: RepseFormComponent;
  let fixture: ComponentFixture<RepseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
