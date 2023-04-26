import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TypeControlQuestion } from 'src/app/shared/question/interfaces/type-control-question';
import { QuestionBase } from 'src/app/shared/question/struct/question-base';

@Component({
  selector: 'app-dynamic-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent {

  readonly TypeControlQuestion = TypeControlQuestion;
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
  get isValid() {
    if(this.question.controlType == TypeControlQuestion.Paragraph){
      return true;
    }


    return this.form.controls[this.question.key].valid;
  }
}
