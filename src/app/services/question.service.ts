import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { cloneDeep } from "lodash";
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

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
import { ArrayBoxQuestion } from '../shared/question/struct/arraybox-question';
import { HiddenArrayBoxQuestion } from '../shared/question/struct/hiddenarraybox-question';
import { FormArray, FormControl } from '@angular/forms';
import { QuestionControlService } from '../shared/question/question-control-service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  constructor(private qcs: QuestionControlService) { }

  private getControlForm(input: IInputForm & {actions?: any}){

    const question = {
      key: input.data,
      label: input.label,
      required: input.required,
      disabled: input.disabled,
      value: input.value,
      link: input.link,
      textLink: input.textlink,
      size: input.size,
      break: input.break,
      children: input.children,
      fixElements: input.fixElements,
      title: input.title,
      addButonText: input.addButonText,
      actions: input.actions,
      visible: input.visible,
      parent: input.parent,
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
      [TypeControlQuestion.ArrayGroup]:  new ArrayBoxQuestion(question),
      [TypeControlQuestion.HiddenArrayGroup]:  new HiddenArrayBoxQuestion(question),
    }

    return questions_directory[input.type as unknown as keyof typeof questions_directory] || questions_directory[TypeControlQuestion.Text];


  }

  private getMexicoQuestions(listsDropdowns: any, values:any){



    const QUESTIONS_FORM = cloneDeep(MEXICO_FORM);
    const flatQuestions = QUESTIONS_FORM.sections.map( (section:any) => section.inputs)?.flat(1);
    const sections : any = [];

    QUESTIONS_FORM.sections.forEach( section => {
      const questions: QuestionBase<string>[] = [];
      section.inputs.forEach( input => {

        if(values[input.data!]){
          input.value = values[input.data!]
        }

        if(input.options_key){
          input.options = listsDropdowns[input.options_key]
        }

        if(input.children){
          input.children.forEach( (childInput: any) => {

            if(childInput.type == TypeInputForm.ArrayGroup){
              childInput.parent = input.data
            }
          })
        }

        input = this.setActionsQuestionsMexico(input);

        if(input.actions?.action == 'showNHide'){
          input.actions?.questions.forEach( (keyActionInput:any) => {
            const actionInput = flatQuestions.find( x => x.data == keyActionInput);
            if(actionInput){
              actionInput.visible = input.value == '1';
              actionInput.disabled = !actionInput.visible;
            }
          })
        }

        const question = this.getControlForm(input)
        if(question) questions.push(question);

      })
      sections.push({ ...section, questions});
    });

    console.log(sections)

    return sections;
  }

  private setActionsQuestionsMexico(input: any){

    if(input.data == 'business_group'){
      input.actions = {
        action: 'showNHide',
        questions: ['otras_empresas']
      }
    }

    if(input.data == 'board_of_directors'){
      input.actions = {
        action: 'showNHide',
        questions: ['informacion_junta_directiva']
      }
    }

    if(input.data == 'conflicto_intereses'){
      input.actions = {
        action: 'showNHide',
        questions: ['desc_conflicto_intereses']
      }
    }

    if(input.data == 'vinculo_estatal'){
      input.actions = {
        action: 'showNHide',
        questions: ['desc_vinculo_estatal']
      }
    }

    if(input.data == 'vinculo_familiar_estatal'){
      input.actions = {
        action: 'showNHide',
        questions: ['desc_vinculo_familiar_estatal']
      }
    }



    return input;
  }

  private setCustomQuestionBoxValues(input: any, sourceValues: any){
    const values:any = {};

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

    if((input.type == TypeInputForm.ArrayGroup || input.type == TypeInputForm.HiddenArrayGroup) && sourceValues[input.data]?.length){
      const arrayValues = sourceValues[input.data].map( (rowSourceValue: any) => {
        input.children?.forEach( (childInput:any) => {
          rowSourceValue = {...rowSourceValue, ...this.setCustomQuestionBoxValues(childInput, rowSourceValue)}
        })

        return rowSourceValue;
      });


      values[input.data] = arrayValues;
    }

    return values;
  }

  private setValuesQuestions(sourceValues:any) {
    let values:any = {};
    const QUESTIONS_FORM = cloneDeep(MEXICO_FORM);

    QUESTIONS_FORM.sections.forEach( section => {
      section.inputs.forEach( input => {

        if(input.data){
          values[input.data] = sourceValues[input.data];
          values = {...values, ...this.setCustomQuestionBoxValues(input, sourceValues)}

        }
      })
    });

    return values;

  }

  private setValuesSingleQuestions(questionsForm: any, sourceValues:any) {

    if(!sourceValues) return {}

    const QUESTIONS_FORM = cloneDeep(questionsForm);

    const values = sourceValues.map( (rowValue:any) => {
      QUESTIONS_FORM.forEach( (input: any) => {
        if(input.data){
          rowValue = {...rowValue, ...this.setCustomQuestionBoxValues(input, rowValue)}
        }
      });

      return rowValue;
    });



    return values;

  }

  // TODO: get from a remote source of question metadata
  getQuestions(listsDropdowns: any, sourceValues: any) {
    const values = this.setValuesQuestions(sourceValues)
    const questions = this.getMexicoQuestions(listsDropdowns, values);
    return of(questions);
  }

  getArrayGroupQuestions(rawQuestions: any, listsDropdowns: any, parent: any = null){

    const QUESTIONS_FORM = cloneDeep(rawQuestions);
    const questions: QuestionBase<string>[] = [];

    QUESTIONS_FORM.forEach( (input:any) => {
      if(input.options_key){
        input.options = listsDropdowns[input.options_key]
      }

      if(parent){
        input.parent = parent;
      }

      const question = this.getControlForm(input)
      if (question) questions.push(question);
    })

    return questions;
  }

  addNewRowArrayGroupQuestion(formArray: FormArray, questionsForm: QuestionBase<string>[]){

    const formGroup = this.qcs.toFormGroup(questionsForm as QuestionBase<string>[]);
    formGroup.addControl('id', new FormControl(),  {emitEvent: false});
    formGroup.addControl('uuid', new FormControl(uuidv4()),  {emitEvent: false});
    formGroup.addControl('groupIndex', new FormControl(formArray.length > 0 ? formArray.length - 1 : 0),  {emitEvent: false});

    const formArrayChild = questionsForm.find( question => question instanceof ArrayBoxQuestion )
    if(formArrayChild){
      formGroup.addControl(`init_${formArrayChild.key}`, new FormControl(),  {emitEvent: false});
    }

    return formGroup
  }
}
