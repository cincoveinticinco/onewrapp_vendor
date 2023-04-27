import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TypeControlQuestion } from 'src/app/shared/question/interfaces/type-control-question';
import { QuestionControlService } from 'src/app/shared/question/question-control-service';
import { QuestionBase } from 'src/app/shared/question/struct/question-base';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent {
  @Input() sections: any = [];
  questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  submitted: boolean = true;
  readonly TypeControlQuestion = TypeControlQuestion;

  constructor(private qcs: QuestionControlService) {}

  ngOnInit() {
    this.questions = this.sections?.map( (section:any) => section.questions)?.flat(1);
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);

  }

  onSubmit() {
    this.submitted = true;
    this.form.updateValueAndValidity();

    console.log(this.form)

    if(this.form.valid){
      this.payLoad = JSON.stringify(this.form.getRawValue());
    }

  }

  handleQuestionValueChange(event: any){
    console.log(event)
  }
}
