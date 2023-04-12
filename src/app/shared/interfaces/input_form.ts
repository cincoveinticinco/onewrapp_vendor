export enum TypeInputForm{
  Text,
  Date,
  Phone,
  PostalCode,
  SelectBox,
  ChooseOption,
  ArrayGroup,
  Paragraph,
  File
}

export interface ISelectBoxOption{
  key: string | number,
  value: string
}

export interface IInputForm{
  label?: string,
  placeholder?: string,
  type: TypeInputForm,
  content?: string,
  disabled: boolean,
  readonly?: boolean,
  size?: number,
  break?: boolean,
  data?: string,
  align?: string,
  children?: IInputForm[],
  addButonText?: string,
  fixElements?: boolean,
  title?:string,
  options_key?: string,
  options?: ISelectBoxOption[],
  option_value?: string,
  back_translation?: boolean,
  searching?: boolean,
  required?: boolean,
  visible: boolean
}
