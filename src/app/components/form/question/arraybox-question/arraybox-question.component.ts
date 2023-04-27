import { Component, Input, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormGroup, NgControl, ValidationErrors, Validator } from '@angular/forms';
import { QuestionService } from 'src/app/services/question.service';
import { VendorsService } from 'src/app/services/vendors.service';
import { TypeControlQuestion } from 'src/app/shared/question/interfaces/type-control-question';
import { QuestionControlService } from 'src/app/shared/question/question-control-service';
import { ArrayBoxQuestion } from 'src/app/shared/question/struct/arraybox-question';
import { QuestionBase } from 'src/app/shared/question/struct/question-base';

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

    this.setValues();

  }

  asFormGroup(value: any): FormGroup{
    return value;
  }

  setValues(){
    if(!this.arrayQuestion?.value) return;

    this.formArray.clear();

    this.arrayQuestion?.value.forEach( (value:any) => {
      const row = this.createRow(value);
      row.patchValue(value);
      this.formArray.push(row);
    })

  }

  createRow(rowValue: any = null){
    const formGroup = this.qcs.toFormGroup(this.questionsForm as QuestionBase<string>[]);
    return formGroup
  }

  addRow(){
    this.formArray.push(this.createRow());
    this.onValidation();
  }

  deleteRow(rowIndex: number){
    this.formArray.removeAt(rowIndex);
  }

  /*

  writeValue(value: any): void {
    this.value = value;
    this.form.patchValue(value)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log(control)
    return this.formArray.length == 3 ? {required: true} : null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidation = fn;
  }
  */

}
