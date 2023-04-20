import { Component, Input, Optional, SimpleChanges, forwardRef } from '@angular/core';
import { FormControl, FormBuilder, ControlContainer, Validators, AbstractControl, ValidationErrors, NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, Validator } from '@angular/forms';
import { TypeInputForm, IInputForm, ISelectBoxOption } from 'src/app/shared/interfaces/input_form';
import { VALIDATORS_PATTERNS } from 'src/app/shared/interfaces/validators';

@Component({
  selector: 'app-input-document',
  templateUrl: './input-document.component.html',
  styleUrls: ['./input-document.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputDocumentComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => InputDocumentComponent)
    }
  ]
})
export class InputDocumentComponent implements ControlValueAccessor, Validator{

  readonly TypeInputForm = TypeInputForm;
  @Input() question!: IInputForm;
  @Input() disabled: boolean = false;
  @Input() conditionValue: number = 0;
  @Input() options: ISelectBoxOption[] = [];

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

    this.setValidations();


    this.formQuestion.valueChanges.subscribe( (value:any) => {
      this.setValidations();
      this.valueQuestion = value
      this.onChange(this.valueQuestion)
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['conditionValue']){
      console.log(changes['conditionValue'])
    }

  }

  setValidations(){

    if(Number(this.conditionValue) == 7){
      this.formQuestion.setValidators([Validators.minLength(14), Validators.maxLength(14), Validators.pattern(VALIDATORS_PATTERNS.numbers)]);
      return;
    }

    if(Number(this.conditionValue) == 10){
      this.formQuestion.setValidators([Validators.minLength(13), Validators.maxLength(13), Validators.pattern(VALIDATORS_PATTERNS.numbers)]);
      return;
    }

    this.formQuestion.setValidators(Validators.required);
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
