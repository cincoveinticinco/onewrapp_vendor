import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileboxQuestionComponent } from './filebox-question.component';

describe('FileboxQuestionComponent', () => {
  let component: FileboxQuestionComponent;
  let fixture: ComponentFixture<FileboxQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileboxQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileboxQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
