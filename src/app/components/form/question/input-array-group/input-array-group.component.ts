import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { IInputForm, TypeInputForm } from 'src/app/shared/interfaces/input_form';
import { VALIDATORS_PATTERNS } from 'src/app/shared/interfaces/validators';

@Component({
  selector: 'input-array-group',
  templateUrl: './input-array-group.component.html',
  styleUrls: ['./input-array-group.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputArrayGroupComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputArrayGroupComponent
    }
  ]
})
export class InputArrayGroupComponent implements ControlValueAccessor, Validator{
  @Input() question?: IInputForm;
  form: FormGroup;

  readonly TypeInputForm = TypeInputForm;

  onChange = (token: string) => {}
  onTouched = () => {}

  touched = false;
  disabled = false;

  value: any;

  writeValue(value: any): void {

    if(!value) {
      this.value = value
      return;
    }

    value = value.rows ? value.rows : value

    if(value && value.length > 0){
      this.addRows(value)

      const firstRow = this.rows.value[0];
      if(firstRow && !firstRow['id']){
        this.deleteRow(0)
      }
    }else{
      if(this.question?.startEmpty){
        this.rows.clear();
      }
    }

    setTimeout( () => {
      this.value = this.form.valid ? value : null
    }, 1)


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
    return control.invalid ? {nonCompleteArray: true}: null
  }

  private setValidators(formGroup: FormGroup){

    const children = this.question?.children
    const validators: ValidatorFn[] = [];

    children?.forEach( input => {

      if(input.visible){
        if(input.required){
          validators.push(Validators.required)
        }

        if(input.type == TypeInputForm.Email){
          validators.push(Validators.pattern(VALIDATORS_PATTERNS.email))
        }

        if (input.data) {
          const control = formGroup.controls[input.data]

          if(validators.length > 0)
            control.setValidators(validators);
        }
      }
    })


  }

  get rows(): FormArray{
    return this.form.controls['rows'] as FormArray;
  }

  private buildForm(){
    if(!this.value && !this.question?.startEmpty){
      this.addRow()
    }
  }

  createRow(rowValue: any = null){

    const form_fields:any = {}
    const children = this.question?.children

    if(rowValue){
      form_fields['id'] = [rowValue['id']];
    }

    if(children){
      children.forEach( question => {
        if(question.data){
          const index: string = question.data

          form_fields[index] = rowValue ? [rowValue[index]] : null
          if(question.options_key){
            form_fields[`${index}_list`] = rowValue ? [rowValue[`${index}_list`]] : []
          }

          if(rowValue && rowValue[`${index}_visible`] != undefined){
            form_fields[`${index}_visible`] = rowValue ? [rowValue[`${index}_visible`]] : []
          }


        }
      })
    }
    const formGroup = this._fB.group(form_fields);

    this.setValidators(formGroup)
    return formGroup
  }

  addRows(valuesRows:any){
    this.rows.clear();
    valuesRows.forEach( (item:any) => this.addRow(item))
  }

  addRow(rowValue = null){
    this.rows.push(this.createRow(rowValue))
    this.form.updateValueAndValidity();
  }

  deleteRow(rowIndex: number){
    this.rows.removeAt(rowIndex);
  }

  constructor(private _fB: FormBuilder, private _cD: ChangeDetectorRef){
    this.form = this._fB.group({
      rows: this._fB.array([])
    });

  }

  ngOnInit(): void {
    this.buildForm()

    this.form.valueChanges.subscribe((value: any) => {
      setTimeout( () => {
        this.value = this.form.valid ? value : null
        this.onChange(this.value)
      }, 1)


    })
  }
}
