import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { IInputForm } from 'src/app/shared/interfaces/input_form';

@Component({
  selector: 'input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputFileComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputFileComponent
    }
  ]
})
export class InputFileComponent implements ControlValueAccessor, Validator{
  @Input() question!: IInputForm;
  control: FormControl = new FormControl('');

  value: any;
  fileName: any;

  onChange = (token: string) => {}
  onTouched = () => {}

  touched = false;
  disabled = false;

  writeValue(value: any): void {
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

  onFileChange(event: Event){

    const target = event.target as HTMLInputElement;
    const files = target.files
    if(files && files.length > 0){
      const file = files[0];
      this.control.patchValue(file);

      this.value = { name: file.name, url: null};
    }


  }

  clearFile(){
    this.control.setValue(null);
    this.value = null;
  }


  ngOnInit(): void {
    this.control.valueChanges.subscribe( values => {
      this.value = values
      console.log(values)
      this.onChange(this.value)
    })

  }

}
