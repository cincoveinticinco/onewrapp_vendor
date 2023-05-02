import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayboxQuestionComponent } from './arraybox-question.component';

describe('ArrayboxQuestionComponent', () => {
  let component: ArrayboxQuestionComponent;
  let fixture: ComponentFixture<ArrayboxQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayboxQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayboxQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
