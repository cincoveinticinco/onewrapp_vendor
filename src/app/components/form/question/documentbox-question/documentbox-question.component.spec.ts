import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentboxQuestionComponent } from './documentbox-question.component';

describe('DocumentboxQuestionComponent', () => {
  let component: DocumentboxQuestionComponent;
  let fixture: ComponentFixture<DocumentboxQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentboxQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentboxQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
