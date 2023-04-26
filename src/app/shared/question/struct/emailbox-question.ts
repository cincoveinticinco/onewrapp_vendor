import { TypeControlQuestion } from '../interfaces/type-control-question';
import { QuestionBase, QuestionBaseParams } from './question-base';

export class EmailboxQuestion extends QuestionBase<string> {
  override type = 'email';
  override controlType = TypeControlQuestion.Email;
}
