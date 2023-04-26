import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionBase } from 'src/app/shared/question/struct/question-base';


@Component({
  selector: 'app-mexico-form',
  templateUrl: './mexico-form.component.html',
  styleUrls: ['./mexico-form.component.scss'],
  providers:  [QuestionService]
})
export class MexicoFormComponent {

  @Input() infoVendor:any;
  questions$?: Observable<QuestionBase<any>[]>;
  vendorData?: any;
  lists?: any;

  constructor(private questionService: QuestionService) {

  }

  ngOnInit(): void {
    this.vendorData = {...this.infoVendor.vendor}
    this.lists = this.infoVendor.lists;

    this.questions$ = this.questionService.getQuestions(this.lists, this.vendorData);
  }
}
