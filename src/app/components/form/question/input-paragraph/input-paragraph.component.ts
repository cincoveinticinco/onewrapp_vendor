import { Component, Input } from '@angular/core';
import { IInputForm } from 'src/app/shared/interfaces/input_form';

@Component({
  selector: 'input-paragraph',
  templateUrl: './input-paragraph.component.html',
  styleUrls: ['./input-paragraph.component.scss']
})
export class InputParagraphComponent {
  @Input() question?: IInputForm;
  content: string = '';

  ngOnInit(): void {

    this.content = this.question?.content!;
    if(this.question?.link){
      const link = `<a target="_blank" href="${this.question?.link}">${this.question?.textlink}</a>`;
      const newContent = this.question?.content?.replace(this.question?.textlink!, link);
      this.content = newContent!;
    }

  }

}
