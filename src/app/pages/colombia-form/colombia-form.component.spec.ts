import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColombiaFormComponent } from './colombia-form.component';

describe('ColombiaFormComponent', () => {
  let component: ColombiaFormComponent;
  let fixture: ComponentFixture<ColombiaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColombiaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColombiaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
