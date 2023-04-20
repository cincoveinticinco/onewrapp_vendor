import { Component, Input, OnChanges, Optional, SimpleChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors, FormControl, FormBuilder, FormGroup, NgControl, Validators, ControlContainer } from '@angular/forms';
import { IInputForm, ISelectBoxOption, TypeInputForm } from 'src/app/shared/interfaces/input_form';
import { VALIDATORS_PATTERNS } from 'src/app/shared/interfaces/validators';


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
  @Input() options: ISelectBoxOption[] = [];

  @Input() formValue: any;

  onChange = (token: string) => {}
  onTouched = () => {}

  touched = false;

  valueQuestion: any;
  formQuestion: FormControl;
  documentValue: any;

  constructor(private _fB: FormBuilder, @Optional() private controlContainer: ControlContainer){
    this.formQuestion = this._fB.control('')
  }


  ngOnInit(): void {

    if(this.question.documentValue){
      this.documentValue = this.formValue[this.question.documentValue]
    }


    if(this.question.disabled){
      this.formQuestion.disable();
    }

    if(this.options && this.options.length > 0){
    }

    this.setValidations();


    this.formQuestion.valueChanges.subscribe( (value:any) => {
      this.setValidations();
      this.valueQuestion = value
      this.onChange(this.valueQuestion)
    })

  }

  setValidations(){
    const validators = [];

    if(this.question.required){
      validators.push(Validators.required)
    }

    if(this.question.type == TypeInputForm.Email){
      validators.push(Validators.pattern(VALIDATORS_PATTERNS.email))
    }

    if(this.question.type == TypeInputForm.Percentage){
      validators.push(Validators.pattern(VALIDATORS_PATTERNS.numbers))
      validators.push(Validators.min(5))
    }

    if(validators.length > 0){
     this.formQuestion.setValidators(validators)
    }
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
    return control.invalid ? control.errors : null;
  }



}
