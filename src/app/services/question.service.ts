import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { cloneDeep } from "lodash";
import * as moment from 'moment';

import { DropdownQuestion } from '../shared/question/struct/dropdown-question';
import { QuestionBase } from '../shared/question/struct/question-base';
import { TextboxQuestion } from '../shared/question/struct/textbox-question';
import { MEXICO_FORM } from '../shared/forms/mexico_form';
import { IInputForm, TypeInputForm } from '../shared/interfaces/input_form';
import { TypeControlQuestion } from '../shared/question/interfaces/type-control-question';
import { ParagraphQuestion } from '../shared/question/struct/paragraph-question';
import { DateboxQuestion } from '../shared/question/struct/datebox-question';
import { EmailboxQuestion } from '../shared/question/struct/emailbox-question';
import { RadioboxQuestion } from '../shared/question/struct/radiobox-question';
import { FileboxQuestion } from '../shared/question/struct/filebox-question';
import { DocumentboxQuestion } from '../shared/question/struct/documentbox-question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  private getControlForm(input: IInputForm){

    const question = {
      key: input.data,
      label: input.label,
      required: input.required,
      value: input.value,
      link: input.link,
      textLink: input.textlink,
      size: input.size,
      break: input.break,
      options: input.options as {key: string, value: string}[]
    }

    const questions_directory = {
      [TypeControlQuestion.Paragraph]:  new ParagraphQuestion(question),
      [TypeControlQuestion.Text]:  new TextboxQuestion(question),
      [TypeControlQuestion.Date]:  new DateboxQuestion(question),
      [TypeControlQuestion.Email]:  new EmailboxQuestion(question),
      [TypeControlQuestion.Dropdown]:  new DropdownQuestion(question),
      [TypeControlQuestion.ChooseOption]:  new RadioboxQuestion(question),
      [TypeControlQuestion.File]:  new FileboxQuestion(question),
      [TypeControlQuestion.Document]:  new DocumentboxQuestion(question),
    }

    return questions_directory[input.type as unknown as keyof typeof questions_directory] || questions_directory[TypeControlQuestion.Text];


  }

  private getMexicoQuestions(listsDropdowns: any, values:any){
    const QUESTIONS_FORM = cloneDeep(MEXICO_FORM);
    const questions: QuestionBase<string>[] = [];

    /**Set specific fields */
    values['actividad_economica'] = values['vendor_economic'];
    values['tipo_solicitud'] = 'Vinculación';

    QUESTIONS_FORM.sections.forEach( section => {
      section.inputs.forEach( input => {

        if(values[input.data!]){
          input.value = values[input.data!]
        }

        if(input.options_key){
          input.options = listsDropdowns[input.options_key]
        }
        questions.push(this.getControlForm(input));
      })
    });

    return questions;
  }

  private setValuesQuestions(sourceValues:any) {
    const values:any = {};
    const QUESTIONS_FORM = cloneDeep(MEXICO_FORM);

    QUESTIONS_FORM.sections.forEach( section => {
      section.inputs.forEach( input => {

        if(input.data){

          values[input.data] = sourceValues[input.data];

          if(input.type == TypeInputForm.Date){
            values[input.data] = sourceValues[input.data] ? moment(sourceValues[input.data]).format('YYYY-MM-DD') : null
          }

          if(input.type == TypeInputForm.ChooseOption){
            values[input.data] = sourceValues[input.data] ? '1' : '2';
          }

          if(input.type == TypeInputForm.Document){
            const type = sourceValues[input.dataDocumentType!] || null;
            const verification = sourceValues[input.dataDocumentVerification!] || null;
            const person = sourceValues[input.dataDocumentPerson!] || null;

            values[input.data] = {
              document: sourceValues[input.data],
              type,
              verification,
              person
            }
          }

        }
      })
    });




    return values;

  }

  // TODO: get from a remote source of question metadata
  getQuestions(listsDropdowns: any, sourceValues: any) {
    const values = this.setValuesQuestions(sourceValues)
    const questions = this.getMexicoQuestions(listsDropdowns, values);
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
