export enum TypeInputForm{
  Text,
  Date,
  Phone,
  PostalCode,
  SelectBox,
  ChooseOption,
  ArrayGroup,
  Paragraph,
  File,
  Hidden,
  Email,
  Percentage,
  Document,
  HiddenArrayGroup
}

export interface ISelectBoxOption{
  key: string | number,
  value: string
}

export interface IInputForm{
  label?: string,
  value?: any,
  placeholder?: string,
  type: TypeInputForm,
  content?: string,
  disabled: boolean,
  readonly?: boolean,
  size?: number,
  break?: boolean,
  data?: string,
  data_list?: string[],
  align?: string,
  children?: IInputForm[],
  addButonText?: string,
  fixElements?: boolean,
  title?:string,
  options_key?: string,
  options_key_list?: string[],
  options?: ISelectBoxOption[],
  option_value?: string,
  back_translation?: boolean,
  searching?: boolean,
  required?: boolean,
  visible: boolean,
  startEmpty?: boolean,
  link?: string,
  textlink?: string,
  documentValue?: string,
  dataDocumentType?: string,
  dataDocumentVerification?: string,
  dataDocumentPerson?: string,
  hideVerification?:boolean,
  parent?: string;
  actions?:any;
  dataVisible?: boolean;
}
