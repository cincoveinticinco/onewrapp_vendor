import { TypeControlQuestion } from '../interfaces/type-control-question';
import { QuestionBase } from './question-base';

export class DropdownQuestion extends QuestionBase<string> {
  override controlType = TypeControlQuestion.Dropdown;
}
