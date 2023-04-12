import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputParagraphComponent } from './input-paragraph.component';

describe('InputParagraphComponent', () => {
  let component: InputParagraphComponent;
  let fixture: ComponentFixture<InputParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputParagraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
