import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function documentValidator(control: AbstractControl): {[key: string]: any} | null  {
  if (control.value) {
    if(control.value.type == 7){
      return control.value.document.length != 14 ? { 'invalidDocument': true } : null;
    }

    if(control.value.type == 10){
      return control.value.document.length != 13 ? { 'invalidDocument': true } : null;
    }

  }
  return null;
}
