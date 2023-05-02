import { TypeControlQuestion } from '../interfaces/type-control-question';
import { QuestionBase, QuestionBaseParams } from './question-base';

export class DocumentboxQuestion extends QuestionBase<string> {
  override controlType = TypeControlQuestion.Document;

}
