import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { IInputForm } from 'src/app/shared/interfaces/input_form';
import { v4 as uuidv4 } from 'uuid';

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
  @ViewChild('inputFile') inputFile?: ElementRef;
  control: FormControl = new FormControl('');

  value: any;
  fileName: any;
  required: boolean = false;

  onChange = (token: any) => {}
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
    if(!this.required) return null;
    return this.value == "" || this.value == null || this.value == undefined ? {required: true} :  null ;
  }

  onFileChange(event: Event){

    const target = event.target as HTMLInputElement;
    const files = target.files
    if(files && files.length > 0){
      const file = files[0];
      this.control.setValue(file);
      this.value = { name: file.name, url: null, uuid: uuidv4()};
    }


  }

  onDragFileChange(files: any){

    if(files && files.length > 0){
      const file = files[0];
      this.control.setValue(file);

      this.value = { name: file.name, url: null, uuid: uuidv4()};
    }
  }

  clearFile(){
    this.control.setValue(null);
    this.value = null;
    this.onChange(this.value)
  }

  ngOnInit(): void {

    if(this.question.required){
      this.required = this.question.required;

      this.control.setValidators(Validators.required)
    }

    this.control.valueChanges.subscribe( values => {
      this.value = values
      this.onChange(this.value)
    })

  }

}
