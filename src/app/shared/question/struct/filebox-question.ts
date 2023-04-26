import { TypeControlQuestion } from '../interfaces/type-control-question';
import { QuestionBase, QuestionBaseParams } from './question-base';

export class FileboxQuestion extends QuestionBase<string> {

  override controlType = TypeControlQuestion.File;

}
