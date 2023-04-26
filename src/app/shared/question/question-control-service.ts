import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './struct/question-base';
import { TypeControlQuestion } from './interfaces/type-control-question';
import { documentValidator } from '../validators/document.validator';

@Injectable()
export class QuestionControlService {
  toFormGroup(questions: QuestionBase<string>[] ) {
    const group: any = {};


    questions.filter( question => question.controlType != TypeControlQuestion.Paragraph).forEach(question => {
      const validators = []

      if(question.required){
        validators.push(Validators.required)
      }

      if(question.controlType == TypeControlQuestion.Document){
        validators.push(documentValidator)
      }

      group[question.key] = new FormControl(question.value || '', validators)
    });

    console.log(group)
    return new FormGroup(group);
  }
}
