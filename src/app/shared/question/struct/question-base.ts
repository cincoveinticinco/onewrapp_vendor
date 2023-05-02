import { TypeControlQuestion } from "../interfaces/type-control-question";

export type QuestionBaseParams<T> = {
  value?: T;
  key?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  order?: number;
  controlType?: TypeControlQuestion;
  type?: string;
  size?: number;
  align?: string;
  typeInput?: string;
  break?: boolean;
  children?: any;
  actions?: any;
  visible?: boolean;
  dataVisible?: boolean;
  options?: {key: string, value: string}[];
}

export class QuestionBase<T> {
  value: T|undefined;
  key: string;
  label: string;
  required: boolean;
  disabled: boolean;
  order: number;
  controlType: TypeControlQuestion;
  type: string;
  size: number;
  align?: string;
  typeInput?: string;
  break?: boolean;
  children: QuestionBase<string>[];
  actions?: any;
  visible?: boolean;
  dataVisible?: boolean;
  options: {key: string, value: string}[];

  constructor(options: QuestionBaseParams<T> = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.disabled = !!options.disabled;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || TypeControlQuestion.Text;
    this.type = options.type || '';
    this.size = options.size || 8;
    this.align = options.align || '';
    this.break = !!options.break;
    this.options = options.options || [];
    this.children = options.children || [];
    this.actions =  options.actions;
    this.dataVisible =  !!options.dataVisible;
    this.visible = !!options.visible
  }
}
