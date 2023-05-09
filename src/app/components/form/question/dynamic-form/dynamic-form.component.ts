import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HeaderServiceService } from 'src/app/services/header-service.service';
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
  @Output() saveForm = new EventEmitter();
  @Output() submitForm = new EventEmitter();
  questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  submitted: boolean = true;
  readonly TypeControlQuestion = TypeControlQuestion;

  public get formGroup(){
    return this.form;
  }

  public get questionsForm(){
    return this.questions;
  }

  constructor(private qcs: QuestionControlService, private headerService: HeaderServiceService) {}

  ngOnInit() {

    this.questions = this.sections?.map( (section:any) => section.questions)?.flat(1);
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);

    this.headerService.setSectionList(this.sections);
    this.headerService.setMainForm(this.form)
  }

  onSubmit() {
    this.submitted = true;
    this.form.updateValueAndValidity();

    console.log(this.form)

    Object.keys(this.form.controls).forEach( key => {
      if(this.form.get(key)?.invalid){
        console.log(key, this.form.get(key))
      }

    })

    if(this.form.valid){
      this.submitForm.emit(this.form.getRawValue())
    }else{
      this.goToInputError();
    }
  }

  getFormValue(){
    return this.form.getRawValue();
  }

  handleQuestionValueChange(event: any){

    if(!event.question.actions) return;

    const question_affected = this.questions?.filter( question => event.question.actions?.questions.includes(question.key));
    switch(event.question.actions.action){
      case 'showNHide':
        question_affected?.forEach( question => {
          question.visible = event.value == '1'
          if(event.value == '1'){
            this.form.controls[question.key].enable()
          }else{
            this.form.controls[question.key].disable()
          }
        })

      return;

    }


  }

  goToInputError(){
    const bodyRect = document.body.getBoundingClientRect();
    const errorElement = document.querySelector('app-dynamic-question .ng-invalid');

    if(errorElement){
      const rect = errorElement.getBoundingClientRect();
      const offset   = rect.top - bodyRect.top;
      window.scrollTo(0, offset - 30)
    }
  }
}
