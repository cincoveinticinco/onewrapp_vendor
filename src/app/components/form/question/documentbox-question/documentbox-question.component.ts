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
      verification: [''],
    });

    if(this.ngControl != null){
      this.ngControl.valueAccessor = this;
    }
  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidation = fn;
  }

  ngOnInit(): void {
    this.lists = this.vendorsService.getSelectBoxList();
    this.verificationList =  this.lists['verification_digit'];

    this.setSelectLists();
    this.setValidations();

    this.form.valueChanges.subscribe( values => {
      this.value = values
      this.onChange(this.value);
    });

  }

  private setSelectLists(){
    if(this.form.get('person')?.value){
      if(this.form.get('person')?.value == 1){
        this.typeList = this.lists.natural_id
      }

      if(this.form.get('person')?.value == 2){
        this.typeList = this.lists.juridica_id
      }

      if(this.form.get('person')?.value == 3){
        this.typeList = this.lists.fisica_id
      }

      if(this.form.get('person')?.value == 4){
        this.typeList = this.lists.moral_id
      }
    }else{
      this.typeList = this.lists.todos_id
    }

  }

  private setValidations(){

    if(Number(this.form.get('type')?.value) == 5){
      this.hideVerification = false;
      this.form.get('verification')?.enable()
    }else{
      this.hideVerification = true;
      this.form.get('verification')?.disable()
    }


    if(Number(this.form.get('type')?.value) == 7){
      this.form.get('document')?.setValidators([Validators.minLength(14), Validators.maxLength(14), Validators.pattern(VALIDATORS_PATTERNS.numbers), Validators.required]);
      return;
    }

    if(Number(this.form.get('type')?.value) == 10){
      this.form.get('document')?.setValidators([Validators.minLength(13), Validators.maxLength(13), Validators.pattern(VALIDATORS_PATTERNS.numbers), Validators.required]);
      return;
    }
  }

  writeValue(value: any): void {
    this.form.patchValue(value)
    this.value = value
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
