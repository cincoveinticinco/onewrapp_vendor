import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, Optional, SimpleChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors, FormControl, FormBuilder, FormGroup, NgControl, Validators, ControlContainer } from '@angular/forms';
import { IInputForm, ISelectBoxOption, TypeInputForm } from 'src/app/shared/interfaces/input_form';
import { VALIDATORS_PATTERNS } from 'src/app/shared/interfaces/validators';
import { documentValidator } from 'src/app/shared/validators/document.validator';


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

  errorMessage?: string;

  touched = false;

  valueQuestion: any;
  formQuestion: FormControl;
  documentValue: any;

  constructor(private _fB: FormBuilder,private readonly changeDetectorRef: ChangeDetectorRef){
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

    if(this.question.required && this.question.type != TypeInputForm.Document){
      validators.push(Validators.required)
    }

    if(this.question.type == TypeInputForm.Email){
      validators.push(Validators.pattern(VALIDATORS_PATTERNS.email))
    }

    if(this.question.type == TypeInputForm.Percentage){
      validators.push(Validators.pattern(VALIDATORS_PATTERNS.numbers))
      validators.push(Validators.min(5))
    }

    if(this.question.type == TypeInputForm.Document){
      validators.push(documentValidator);
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

  getMessageError(typeError: string){
    return {
      'required': 'El campo es requerido',
      'pattern': 'El valor del campo es inválido',
      'min': 'El valor debe ser mayor a 5',
      'minlength': 'El valor del campo es inválido',
      'maxlength': 'El valor del campo es inválido'
    }[typeError];
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    const errorsQuestion = Object.keys(this.formQuestion.errors || {});
    const errorsControl = Object.keys(control.errors || {});

    const errors = [...errorsQuestion, ...errorsControl]
    this.errorMessage = errors.length > 0 ? this.getMessageError(errors[0]) : undefined;

    if(this.question.type != TypeInputForm.ArrayGroup){
      return (!control.pristine && (this.formQuestion.invalid || control.invalid)) ? {...this.formQuestion.errors, ...control.errors} : null;
    }

    return null


  }



}
