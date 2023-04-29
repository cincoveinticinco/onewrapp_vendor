import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './struct/question-base';
import { TypeControlQuestion } from './interfaces/type-control-question';
import { documentValidator } from '../validators/document.validator';
import { arraygroupValidator } from '../validators/arraygroup.validator';
import { Subject } from 'rxjs';

@Injectable()
export class QuestionControlService {



  toFormGroup(questions: QuestionBase<string>[] ) {
    const group: any = {};


    questions.filter( question => question.controlType != TypeControlQuestion.Paragraph).forEach(question => {
      const validators = []

      if(question.required){
        if(question.controlType != TypeControlQuestion.File)
          validators.push(Validators.required)
      }

      if(question.controlType == TypeControlQuestion.Document){
        validators.push(documentValidator)
      }

      if(question.controlType == TypeControlQuestion.ArrayGroup || question.controlType == TypeControlQuestion.HiddenArrayGroup){
        group[question.key] = new FormArray([], validators);
        return;
      }

      group[question.key] = new FormControl({value: (question.value || ''), disabled: question.disabled}, validators);
    });

    return new FormGroup(group);
  }
}
