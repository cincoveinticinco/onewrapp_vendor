import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './struct/question-base';
import { TypeControlQuestion } from './interfaces/type-control-question';
import { documentValidator } from '../validators/document.validator';
import { arraygroupValidator } from '../validators/arraygroup.validator';
import { Subject } from 'rxjs';
import { VALIDATORS_PATTERNS } from '../interfaces/validators';
import { limitDatesValidator } from '../validators/limitdates.validator';

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

      if(question.controlType == TypeControlQuestion.Date){
        validators.push(limitDatesValidator(question.key))
      }

      if(question.controlType == TypeControlQuestion.Percentage){
        validators.push(Validators.min(5), Validators.max(100))
      }

      if(question.controlType == TypeControlQuestion.Email){
        validators.push(Validators.pattern(VALIDATORS_PATTERNS.email))
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
