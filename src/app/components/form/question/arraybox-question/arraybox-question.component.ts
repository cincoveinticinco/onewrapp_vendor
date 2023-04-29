import { Component, Input, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { VendorsService } from 'src/app/services/vendors.service';
import { TypeControlQuestion } from 'src/app/shared/question/interfaces/type-control-question';
import { QuestionControlService } from 'src/app/shared/question/question-control-service';
import { ArrayBoxQuestion } from 'src/app/shared/question/struct/arraybox-question';
import { QuestionBase } from 'src/app/shared/question/struct/question-base';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-arraybox-question',
  templateUrl: './arraybox-question.component.html',
  styleUrls: ['./arraybox-question.component.scss']
})
export class ArrayboxQuestionComponent{

  readonly TypeControlQuestion = TypeControlQuestion;
  onChange = (value: string) => {}
  onTouched = () => {}
  onValidation = () => {}

  @Input() arrayQuestion: ArrayBoxQuestion | null = null;
  @Input() questions: QuestionBase<string>[] | null = [];
  @Input() form!: FormGroup;
  questionsForm: QuestionBase<any>[] = [];
  value: any;
  lists: any;
  disabled: boolean = false;

  get formArray(): FormArray{
    return this.form.controls[this.arrayQuestion?.key!] as FormArray;
  }

  constructor(
    private qcs: QuestionControlService,
    private questionService: QuestionService,
    private vendorsService: VendorsService,
    private _fB: FormBuilder){

  }


  ngOnInit(): void {
      this.lists = this.vendorsService.getSelectBoxList();
      this.questionsForm = this.questionService.getArrayGroupQuestions(this.questions, this.lists)
      setTimeout( () => this.setValues())
  }

  asFormGroup(value: any): FormGroup{
    return value;
  }

  setValues(){

    if(this.arrayQuestion?.parent){
      this.arrayQuestion.value = this.form.controls[`init_${this.arrayQuestion?.key}`].getRawValue();
    }

    if(!this.arrayQuestion?.value) return;

    this.formArray.clear();

    this.arrayQuestion?.value.forEach( (value:any, index:number) => {
      const row = this.createRow();

      const inits_values:any = {...value}
      Object.keys(value).forEach( key => {
        inits_values[`init_${key}`] = value[key]
      })

      row.patchValue(inits_values, {emitEvent: false});
      this.formArray.push(row, {emitEvent: false});
    })

  }

  createRow(emptyRow: boolean = false){
    const formGroup = this.qcs.toFormGroup(this.questionsForm as QuestionBase<string>[]);
    formGroup.addControl('id', new FormControl(),  {emitEvent: false});
    formGroup.addControl('uuid', new FormControl(emptyRow ? uuidv4() : null),  {emitEvent: false});
    formGroup.addControl('groupIndex', new FormControl(this.formArray.length > 0 ? this.formArray.length - 1 : 0),  {emitEvent: false});

    const formArray = this.questionsForm.find( question => question instanceof ArrayBoxQuestion )
    if(formArray){
      formGroup.addControl(`init_${formArray.key}`, new FormControl(),  {emitEvent: false});
    }

    return formGroup
  }

  addRow(){
    this.formArray.push(this.createRow(true));
    this.onValidation();
  }

  deleteRow(rowIndex: number){
    this.formArray.removeAt(rowIndex);
  }
}
