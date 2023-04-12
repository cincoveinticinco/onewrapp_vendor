import { Component, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors, FormControl, FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { IInputForm, TypeInputForm } from 'src/app/shared/interfaces/input_form';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => QuestionComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => QuestionComponent)
    }
  ]
})
export class QuestionComponent implements ControlValueAccessor, Validator{


  readonly TypeInputForm = TypeInputForm;
  @Input() question!: IInputForm;
  @Input() disabled: boolean = false;

  onChange = (token: string) => {}
  onTouched = () => {}

  touched = false;

  valueQuestion: any;
  formQuestion: FormControl;

  constructor(private _fB: FormBuilder){
    this.formQuestion = this._fB.control('')
  }


  ngOnInit(): void {

    if(this.question.disabled){
      this.formQuestion.disable();
    }

    this.formQuestion.valueChanges.subscribe( (value:any) => {
      this.valueQuestion = value
      this.onChange(this.valueQuestion)
    })

  }

  writeValue(value: any): void {
    this.formQuestion.setValue(value)
    this.valueQuestion = value
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null
  }



}
