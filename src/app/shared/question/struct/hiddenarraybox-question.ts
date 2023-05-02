import { TypeControlQuestion } from '../interfaces/type-control-question';
import { QuestionBase, QuestionBaseParams } from './question-base';

export class HiddenArrayBoxQuestion extends QuestionBase<any> {

  fixElements?: boolean;
  title?: string;
  addButonText?: string;
  override controlType = TypeControlQuestion.HiddenArrayGroup;

  constructor(options: QuestionBaseParams<string> & {
    fixElements?:boolean;
    title?: string;
    addButonText?: string;
    } = {}){

    super(options);
    this.fixElements = options.fixElements || false;
    this.title = options.title || '';
    this.addButonText = options.addButonText || '';
  }
}
