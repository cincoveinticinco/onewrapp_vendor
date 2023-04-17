import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { IInputForm } from 'src/app/shared/interfaces/input_form';

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

    this.value = value
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
    return null
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
        }
      })
    }

    return this._fB.group(form_fields);
  }

  addRows(valuesRows:any){
    this.rows.clear();
    valuesRows.forEach( (item:any) => this.addRow(item))
  }

  addRow(rowValue = null){
    this.rows.push(this.createRow(rowValue))
  }

  deleteRow(rowIndex: number){
    this.rows.removeAt(rowIndex);
  }

  constructor(private _fB: FormBuilder){
    this.form = this._fB.group({
      rows: this._fB.array([])
    });

  }

  ngOnInit(): void {
    this.buildForm()

    this.form.valueChanges.subscribe((value: any) => {
      this.value = value
      this.onChange(this.value)
    })
  }
}
