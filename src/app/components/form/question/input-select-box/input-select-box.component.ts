import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { IInputForm, ISelectBoxOption } from 'src/app/shared/interfaces/input_form';

@Component({
  selector: 'input-select-box',
  templateUrl: './input-select-box.component.html',
  styleUrls: ['./input-select-box.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputSelectBoxComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputSelectBoxComponent
    }
  ]
})
export class InputSelectBoxComponent implements ControlValueAccessor, Validator{


  @Input() question!: IInputForm;
  options: ISelectBoxOption[] = [];
  optionValue: string = '';
  filteredOptions?: Observable<ISelectBoxOption[]>;

  selectSearchControl: FormControl = new FormControl('');
  selectBoxControl: FormControl = new FormControl('');

  value: any;

  onChange = (token: string) => {}
  onTouched = () => {}

  touched = false;
  disabled = false;

  writeValue(value: any): void {
    this.selectBoxControl.setValue(value || '')
    this.selectSearchControl.setValue(value || '')
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

  ngOnInit() {

    if(this.question.disabled){
      this.selectBoxControl.disable();
    }

    this.options = this.question?.options || []
    this.optionValue = this.question?.option_value || 'value'

    this.filteredOptions = this.selectSearchControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        this.value = value
        this.onChange(this.value)

        const name = typeof value === 'string' ? value : value?.value;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    )

    this.selectBoxControl.valueChanges.subscribe((value: any) => {
      this.value = value
        this.onChange(this.value)
    })

  }

  displayFn(option: ISelectBoxOption): string {
    return option && option.value ? option.value : '';
  }

  private _filter(value: string): ISelectBoxOption[] {
    const filterValue = value ? value.toLowerCase() : '';
    return this.options.filter(option => option.value.toLowerCase().includes(filterValue));
  }

}
