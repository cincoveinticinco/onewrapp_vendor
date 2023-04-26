import { AbstractControl } from "@angular/forms";

export function documentValidator(control: AbstractControl): {[key: string]: any} | null {
  console.log(control)
  if (control.value && control.value.document.length != 10) {
    return { 'phoneNumberInvalid': true };
  }
  return null;
}
