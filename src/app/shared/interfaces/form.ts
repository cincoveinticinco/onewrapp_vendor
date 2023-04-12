import { IInputForm } from "./input_form"

export interface IFormSection{
  title: string | null,
  visible: boolean,
  key: string,
  inputs: IInputForm[]
}

export interface IForm{
  description: string,
  sections: IFormSection[]
}

