import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TypeControlQuestion } from 'src/app/shared/question/interfaces/type-control-question';
import { ArrayBoxQuestion } from 'src/app/shared/question/struct/arraybox-question';
import { QuestionBase } from 'src/app/shared/question/struct/question-base';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-dynamic-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent {

  readonly ArrayBoxQuestion = ArrayBoxQuestion;
  readonly TypeControlQuestion = TypeControlQuestion;
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;

  @Output() changeValue = new EventEmitter();

  id: string;

  get getValue(){
    return this.form.controls[this.question.key]?.value
  }

  get isDisabled(){
    return this.form.controls[this.question.key]?.disabled
  }


  get isValid() {
    if(this.question.controlType == TypeControlQuestion.Paragraph){
      return true;
    }

    if(this.isDisabled) return true;

    return this.form.controls[this.question.key]?.valid;
  }

  get messageError(){

    const controErrors = this.form.controls[this.question.key].errors;

    if(controErrors){

      const typeError = Object.keys(controErrors)[0];

      return {
        'required': `${this.question.label}  es requerido`,
        'documentRequired': 'Número de Id es requerido',
        'typeRequired': 'Tipo de Id es requerido',
        'documentLengthInvalid': `Número de Id debe tener ${controErrors[typeError].type == 10 ? 13 : 14} dígitos`,
        'documentInvalid': 'Número de Id es inválido',
        'pattern': 'El valor del campo es inválido',
        'min': 'El valor debe ser mayor a 5',
        'minlength': 'El valor del campo es inválido',
        'maxlength': 'El valor del campo es inválido'
      }[typeError];


    }

    return `${this.question.label}  es requerido`;
  }

  get questionForm(){
    if(this.question.controlType == TypeControlQuestion.ArrayGroup){
      return (this.question as ArrayBoxQuestion);
    }

    return this.question;
  }

  handleChangeValue(question: any){
    this.changeValue.emit({
      question, value: this.getValue
    })
  }

  constructor(){
    this.id = `${this.question?.key || 'item'}_${uuidv4()}`
  }
}
