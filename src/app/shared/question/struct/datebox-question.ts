import { TypeControlQuestion } from '../interfaces/type-control-question';
import { QuestionBase, QuestionBaseParams } from './question-base';

export class DateboxQuestion extends QuestionBase<string> {

  override type = 'date';
  override controlType = TypeControlQuestion.Date;

}
