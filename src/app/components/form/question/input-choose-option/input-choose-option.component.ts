import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { IInputForm } from 'src/app/shared/interfaces/input_form';

@Component({
  selector: 'input-choose-option',
  templateUrl: './input-choose-option.component.html',
  styleUrls: ['./input-choose-option.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputChooseOptionComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputChooseOptionComponent
    }
  ]
})
export class InputChooseOptionComponent implements ControlValueAccessor, Validator{
  @Input() question!: IInputForm;
  control: FormControl = new FormControl('');

  value: any;

  onChange = (token: string) => {}
  onTouched = () => {}

  touched = false;
  disabled = false;

  writeValue(value: any): void {
    this.control.setValue(value)
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


  ngOnInit(): void {
    this.control.valueChanges.subscribe( values => {
      this.value = values
      this.onChange(this.value)
    })

  }
}
