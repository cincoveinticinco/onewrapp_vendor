import { Component, Input } from '@angular/core';
import { IInputForm } from 'src/app/shared/interfaces/input_form';

@Component({
  selector: 'input-paragraph',
  templateUrl: './input-paragraph.component.html',
  styleUrls: ['./input-paragraph.component.scss']
})
export class InputParagraphComponent {
  @Input() question?: IInputForm;

}
