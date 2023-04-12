import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputChooseOptionComponent } from './input-choose-option.component';

describe('InputChooseOptionComponent', () => {
  let component: InputChooseOptionComponent;
  let fixture: ComponentFixture<InputChooseOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputChooseOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputChooseOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
