import { Component, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NgControl, ValidationErrors, Validator, Validators } from '@angular/forms';
import { VendorsService } from 'src/app/services/vendors.service';
import { IInputForm, TypeInputForm } from 'src/app/shared/interfaces/input_form';
import { VALIDATORS_PATTERNS } from 'src/app/shared/interfaces/validators';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-documentbox-question',
  templateUrl: './documentbox-question.component.html',
  styleUrls: ['./documentbox-question.component.scss']
})
export class DocumentboxQuestionComponent implements ControlValueAccessor, Validator {

  onChange = (value: string) => {}
  onTouched = () => {}
  onValidation = () => {}

  id = uuidv4()
  form: FormGroup;
  value: any;
  lists: any;
  typeList: any;
  verificationList: any;
  hideVerification: boolean = true;

  constructor(private vendorsService: VendorsService, private _fB: FormBuilder, @Optional() @Self() public ngControl: NgControl){
    this.form = this._fB.group({
      person: [''],
      type: [''],
      document: [''],
      verification: ['', Validators.required],
      list: ['']
    });

    if(this.ngControl != null){
      this.ngControl.valueAccessor = this;

    }

    this.lists = this.vendorsService.getSelectBoxList();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidation = fn;
  }

  onBlur(){
    this.onTouched()
  }

  ngOnInit(): void {
    this.verificationList =  this.lists['verification_digit'];

    this.setSelectLists();
    this.setValidations();

    this.form.controls['type'].valueChanges.subscribe( values => {
      this.form.controls['type'].setValue(values, {emitEvent: false})
      this.setValidations();
    });

    this.form.valueChanges.subscribe( values => {
      this.value = values
      this.onChange(this.value);
    });

  }

  private setSelectLists(){

    const person = Number(this.form.get('person')?.value)

    if(person){
      if(person == 1){
        this.typeList = this.lists.natural_id
      }

      if(person == 2){
        this.typeList = this.lists.juridica_id
      }

      if(person == 3){
        this.typeList = this.lists.fisica_id
      }

      if(person == 4){
        this.typeList = this.lists.moral_id
      }
    }else{
      this.typeList = this.lists[this.form.get('list')?.value]
    }


    if(!this.typeList?.find( (item:any) => item.key == this.form.get('type')?.value)){
      this.form.get('type')?.setValue('')
      this.value = this.form.value
    }

  }

  private setValidations(){

    const existTypeInList = this.typeList?.find( (option:any) => option.key == Number(this.form.get('type')?.value))
    if(!existTypeInList){
      this.form.get('type')?.setValue(null, {emitEvent: false});
    }

    if(Number(this.form.get('type')?.value) == 5){
      this.hideVerification = false;
      this.form.get('verification')?.enable()
    }else{
      this.hideVerification = true;
      this.form.get('verification')?.disable()
    }


    if(Number(this.form.get('type')?.value) == 7){
      this.form.get('document')?.setValidators([Validators.required, Validators.pattern(VALIDATORS_PATTERNS.numbers),Validators.minLength(14), Validators.maxLength(14) ]);
      this.form.get('document')?.updateValueAndValidity();
      return;
    }

    if(Number(this.form.get('type')?.value) == 10){
      this.form.get('document')?.setValidators([Validators.minLength(13), Validators.maxLength(13), Validators.pattern(VALIDATORS_PATTERNS.numbers), Validators.required]);
      this.form.get('document')?.updateValueAndValidity();
      return;
    }

  }

  writeValue(value: any): void {
    this.form.patchValue(value, {emitEvent: false})
    this.value = this.form.value

    this.setSelectLists();

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
