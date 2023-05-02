import { TypeControlQuestion } from '../interfaces/type-control-question';
import { QuestionBase, QuestionBaseParams } from './question-base';

export class ParagraphQuestion extends QuestionBase<string> {

  link: string;
  textLink: string;
  override controlType = TypeControlQuestion.Paragraph;

  constructor(options: QuestionBaseParams<string> & {
    link?:string;
    textLink?: string;
    } = {}){

    super(options);

    this.link = options.link || '';
    this.textLink = options.textLink || '';

    const content = this.value || '';
    if(this.link){
      const link = `<a target="_blank" href="${this.link}">${this.textLink}</a>`;
      const newContent = content.replace(this.textLink, link);
      this.value = newContent;
    }
  }
}
