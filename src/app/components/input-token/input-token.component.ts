import { Component, ElementRef, Input, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-input-token',
  templateUrl: './input-token.component.html',
  styleUrls: ['./input-token.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputTokenComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputTokenComponent
    }
  ]
})
export class InputTokenComponent implements ControlValueAccessor, Validator{

  @ViewChildren('tokenDigit') tokenDigit: QueryList<ElementRef> = new QueryList<ElementRef>()
  @Input('lenght') inputLength: number = 6;
  form: FormGroup;
  tokenString: string = '';

  onChange = (token: string) => {}
  onTouched = () => {}

  touched = false;
  disabled = false;

  nullifyKeys = []

  get token(): FormArray{
    return this.form.controls['token'] as FormArray;
  }

  getControlByIndex(index: number){
    return this.token.controls[index] as FormControl
  }

  private buildForm(){
    for(let i = 0; i < this.inputLength; i++){
      this.token.push(this._fB.control(''))
    }
  }

  constructor(private _fB: FormBuilder){
    this.form = this._fB.group({
      token: this._fB.array([])
    })
  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const tokenString = control.value

    if(!tokenString){
      return{
        emptyToken:{tokenString}
      }
    }

    if(tokenString.length < this.inputLength){
      return{
        incompleteToken:{tokenString}
      }
    }

    return null
  }

  writeValue(tokenString: string): void {
    this.tokenString = tokenString
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched(){
    if(!this.touched){
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  goBackwardInput(event: Event, index: number){

    const input = this.getControlByIndex(index)
    if(input.value) return

    if(index < 0) return;

    const prevInput = this.tokenDigit.get(index - 1)
    if(!prevInput) return;

    setTimeout( () => {
      this.getControlByIndex(index - 1).setValue('')
      prevInput.nativeElement.focus()
    })
  }

  goFordwardInput(event: Event, index: number){
    if(index < 0 || (event as KeyboardEvent).code == 'Backspace') return;

    const nextInput = this.tokenDigit.get(index + 1)
    if(!nextInput) return;

    setTimeout( () => {nextInput.nativeElement.focus()})
  }

  ngOnInit(): void {
    this.buildForm();

    this.form.valueChanges.subscribe( values => {
      this.markAsTouched()
      this.tokenString = values.token.join('')
      this.onChange(this.tokenString)
    })
  }

}
