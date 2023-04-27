import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { TYPE_PERSON_MEXICO } from 'src/app/shared/forms/mexico_form';
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
  valuesForm: any;

  constructor(private questionService: QuestionService) {

  }

  ngOnInit(): void {
    this.vendorData = {...this.infoVendor.vendor}
    this.lists = this.infoVendor.lists;

    this.setValuesForm();
    this.questions$ = this.questionService.getQuestions(this.lists, this.valuesForm);
  }

  setValuesForm() {

    this.valuesForm = {
      ...this.vendorData,
      'tipo_solicitud': 'Vinculación',
      'business_group': this.vendorData['business_group' ]? '1' : '2',
      'actividad_economica': this.vendorData['vendor_economic']
    }

    this.setVendorMultipleInfo();

  }

  private setVendorMultipleInfo() {
    this.infoVendor.vendor_info_user.forEach(
      (info_user: any) => {
        if (info_user.id == 1) {
          this.valuesForm['otras_empresas'] =
            info_user.user_person.map((user: any) => ({
              name: user.name,
              document: user.document,
              f_document_type_id: user.f_document_type_id,
              f_person_type_id: TYPE_PERSON_MEXICO.Moral,
              quantity: user.quantity,
              id: user.id,
            }))
        }

        if (info_user.id == 2) {
          this.valuesForm['informacion_representantes_legales'] =
            info_user.user_person.map((user: any) => ({
              name: user.name,
              last_name: user.last_name,
              f_document_type_id: user.f_document_type_id,
              document: user.document,
              expedition_date: user.expedition_date,
              f_person_type_id: TYPE_PERSON_MEXICO.Fisica,
              country: user.country,
              department: user.department,
              city: user.city,
              email: user.email,
              id: user.id,
            }))
        }

        if (info_user.id == 3) {
          this.valuesForm['informacion_junta_directiva'] =
            info_user.user_person.map((user: any) => ({
              name: user.name,
              last_name: user.last_name,
              f_document_type_id: user.f_document_type_id,
              document:  user.document,
              f_person_type_id: TYPE_PERSON_MEXICO.Fisica,
              expedition_date: user.expedition_date,
              country: user.country,
              department: user.department,
              city: user.city,
              email: user.email,
              id: user.id,
            }))
        }

        if (info_user.id == 4) {

          this.valuesForm['informacion_accionistas'] =
            info_user.user_person.map((user: any) => {
              return {
                f_person_type_id: user.f_person_type_id,
                name: user.name,
                percente_participation: user.percente_participation,
                document: user.document,
                f_document_type_id: user.f_document_type_id,
                expedition_date: user.expedition_date,
                country: user.country,
                id: user.id,

              }
            })
        }
      }
    );
  }

  private setVendorDeclaraciones(){

  }
}
