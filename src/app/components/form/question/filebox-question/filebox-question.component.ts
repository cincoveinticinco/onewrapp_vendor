import { Component, Input, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-filebox-question',
  templateUrl: './filebox-question.component.html',
  styleUrls: ['./filebox-question.component.scss']
})
export class FileboxQuestionComponent implements ControlValueAccessor, Validator{

  onChange = (value: string) => {}
  onTouched = () => {}

  value: any;
  disabled: boolean = false;
  fileName: any;
  control: FormControl = new FormControl('');

  constructor(@Optional() @Self() public ngControl: NgControl){
    if(this.ngControl != null){
      this.ngControl.valueAccessor = this;
    }

  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null
  }
  registerOnValidatorChange?(fn: () => void): void {

  }

  onFileChange(event: Event){
    const target = event.target as HTMLInputElement;
    const files = target.files
    if(files && files.length > 0){
      const file = files[0];
      this.control.setValue(file);

      this.value = { file, name: file.name, url: null};
      this.onChange(this.value)
    }
  }

  onDragFileChange(files: any){

    if(files && files.length > 0){
      const file = files[0];
      this.control.setValue(file);

      this.value = { file, name: file.name, url: null};
      this.onChange(this.value)
    }
  }

  clearFile(){
    this.control.setValue(null);
    this.value = null;
    this.onChange(this.value)
  }

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

}
