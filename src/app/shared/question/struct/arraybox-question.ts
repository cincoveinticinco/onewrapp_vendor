import { TypeControlQuestion } from '../interfaces/type-control-question';
import { QuestionBase, QuestionBaseParams } from './question-base';

export class ArrayBoxQuestion extends QuestionBase<any> {

  fixElements?: boolean;
  title?: string;
  addButonText?: string;
  parent?: string;
  override controlType = TypeControlQuestion.ArrayGroup;

  constructor(options: QuestionBaseParams<string> & {
    fixElements?:boolean;
    title?: string;
    addButonText?: string;
    parent?: string;
    } = {}){

    super(options);
    this.fixElements = !!options.fixElements;
    this.title = options.title || '';
    this.addButonText = options.addButonText || '';
    this.parent = options.parent || '';


  }
}
