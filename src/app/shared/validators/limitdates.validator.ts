import { AbstractControl, FormGroup } from "@angular/forms";

export function limitDatesValidator(formControlName: string){

  return (control: AbstractControl): {[key: string]: any} | null  => {
    const group = control.parent as FormGroup;

    const fromControl =  group?.get('binding_date')
    const toControl = group?.get('termination_date')

    const validation = new Date(fromControl?.value) > new Date(toControl?.value) ? (formControlName == 'binding_date' ? { 'dateFromRangeInvalid': true } :{ 'dateToRangeInvalid': true }) : null;

    return validation;
  }
}
