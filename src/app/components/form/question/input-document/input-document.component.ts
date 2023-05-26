import { Component, Input, Optional, SimpleChanges, forwardRef } from '@angular/core';
import { FormControl, FormBuilder, ControlContainer, Validators, AbstractControl, ValidationErrors, NG_VALIDATORS, NG_VALUE_ACCESSOR, ControlValueAccessor, Validator, FormGroup } from '@angular/forms';
import { startWith, pairwise, map } from 'rxjs';
import { VendorsService } from 'src/app/services/vendors.service';
import { TypeInputForm, IInputForm, ISelectBoxOption } from 'src/app/shared/interfaces/input_form';
import { VALIDATORS_PATTERNS } from 'src/app/shared/interfaces/validators';

const inputs: IInputForm[] =  [{
    label: 'Tipo ID',
    visible: true,
    type: TypeInputForm.SelectBox,
    size: 2,
    data: 'type',
    required: true,
    options_key: 'tipo_id',
    disabled: false
  },
  {
    label: 'Número de ID',
    visible: true,
    type: TypeInputForm.Text,
    size: 6,
    data: 'document',
    disabled: false
  },
  {
    label: 'DV',
    visible: false,
    type: TypeInputForm.SelectBox,
    options_key: 'verification_digit',
    size: 2,
    data: 'verification',
    required: true,
    disabled: false
  }]


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
  inputs = JSON.parse(JSON.stringify(inputs));
  @Input() question!: IInputForm;
  @Input() disabled: boolean = false;
  @Input() options: ISelectBoxOption[] = [];

  onChange = (token: string) => {}
  onTouched = () => {}
  onValidationChange: any = () => {};

  touched = false;

  valueQuestion: any;
  form: FormGroup;
  formQuestion: FormControl;
  lists: any;
  errors:any = null
  constructor(private _fB: FormBuilder, private vendorsService: VendorsService){
    this.formQuestion = this._fB.control('');
    this.form = this._fB.group({});

  }


  buildForm() {
    const form_fields:any = {}

    this.inputs.forEach( (input:any) => {
      form_fields[input.data || ''] = ['']

      if (input.options_key) {
        input.options = this.lists[input.options_key];
      }
    });

    this.form = this._fB.group(form_fields)
  }

  ngOnInit(): void {

    this.lists = this.vendorsService.getSelectBoxList();

    this.inputs[0].options_key = this.question.options_key;

    if(this.question.hideVerification){
      this.inputs[2].visible = false;
      this.inputs[1].size = 6;
      this.form.get('verification')?.disable()
    }

    this.buildForm();

    if(this.question.disabled){
      this.form.disable();
    }

    this.form.get('type')?.valueChanges.subscribe( data => {
      this.setValidations();
    })

    this.form.valueChanges.subscribe( (value:any) => {
      this.valueQuestion = value;
      this.onChange(this.valueQuestion)
    })

  }

  setErrors(){
    this.errors = null;
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      this.errors = {...this.errors, ...control?.errors}
    })
  }

  setSelectLists(values: any){
    if(values?.person){
      if(values.person == 1){
        this.inputs[0].options = this.lists.natural_id
      }

      if(values.person == 2){
        this.inputs[0].options = this.lists.juridica_id
      }

      if(values.person == 3){
        this.inputs[0].options = this.lists.fisica_id
      }

      if(values.person == 4){
        this.inputs[0].options = this.lists.moral_id
      }
    }

    this.inputs = JSON.parse(JSON.stringify(this.inputs))
  }



  setValidations(){

    if(!this.question.hideVerification){
      if(Number(this.form.get('type')?.value) == 5){
        this.inputs[2].visible = true;
        this.inputs[1].size = 4;
        this.form.get('verification')?.enable()
      }else{
        this.inputs[2].visible = false;
        this.inputs[1].size = 6;
        this.form.get('verification')?.disable()
      }
    }




    if(Number(this.form.get('type')?.value) == 7){
      this.form.get('document')?.setValidators([Validators.minLength(13), Validators.maxLength(13), Validators.pattern(VALIDATORS_PATTERNS.numbers)]);
      return;
    }

    if(Number(this.form.get('type')?.value) == 10){
      this.form.get('document')?.setValidators([Validators.minLength(13), Validators.maxLength(13), Validators.pattern(VALIDATORS_PATTERNS.numbers)]);
      return;
    }

    this.form.get('document')?.setValidators([Validators.required]);
    this.form.get('document')?.updateValueAndValidity()

  }

  writeValue(value: any): void {
    if(this.valueQuestion){
      if(value.person != this.valueQuestion?.person){
        value.type = null;
      }
    }

    this.setSelectLists(value);

    this.form.patchValue(value)
    this.valueQuestion = value
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
}

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    this.setErrors();
    return this.errors ? this.errors : null;
  }


}
