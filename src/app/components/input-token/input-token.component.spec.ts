import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTokenComponent } from './input-token.component';

describe('InputTokenComponent', () => {
  let component: InputTokenComponent;
  let fixture: ComponentFixture<InputTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
