import { TypeControlQuestion } from '../interfaces/type-control-question';
import { QuestionBase, QuestionBaseParams } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {

  override type = 'text';
  override controlType = TypeControlQuestion.Text;

}
