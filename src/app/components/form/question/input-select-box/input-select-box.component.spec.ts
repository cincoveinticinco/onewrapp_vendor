import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelectBoxComponent } from './input-select-box.component';

describe('InputSelectBoxComponent', () => {
  let component: InputSelectBoxComponent;
  let fixture: ComponentFixture<InputSelectBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSelectBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSelectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
