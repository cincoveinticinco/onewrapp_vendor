import { AbstractControl } from "@angular/forms";
import { VALIDATORS_PATTERNS } from "../interfaces/validators";

export function documentValidator(control: AbstractControl): {[key: string]: any} | null {

  if (control.value) {


    if(!control.value.document || !control.value.document.length){
      return { 'documentRequired': true };
    }

    if(control.value.type == 7 || control.value.type == 10) {
      if(!VALIDATORS_PATTERNS.numbers.test(control.value.document)){
        return { 'documentInvalid': true };
      }
    }

    if(control.value.type == 7 && control.value.document.length != 14) {
      return { 'documentLengthInvalid': {type: 7, length: control.value.document.length} };
    }

    if(control.value.type == 10 && control.value.document.length != 13){
      return { 'documentLengthInvalid': {type:  10, length: control.value.document.length} };
    }
    if(!control.value.type){
      return { 'typeRequired': true };
    }

  }
  return null;
}
