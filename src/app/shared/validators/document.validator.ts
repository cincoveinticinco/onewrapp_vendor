import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function documentValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return null
  }
}
