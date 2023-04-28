import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { values } from 'lodash';
import { Observable, map, pairwise, startWith } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/question/dynamic-form/dynamic-form.component';
import { QuestionService } from 'src/app/services/question.service';
import { TYPE_PERSON_MEXICO } from 'src/app/shared/forms/mexico_form';
import { QuestionBase } from 'src/app/shared/question/struct/question-base';
import { v4 as uuidv4 } from 'uuid';
import { isEqual } from 'lodash';


@Component({
  selector: 'app-mexico-form',
  templateUrl: './mexico-form.component.html',
  styleUrls: ['./mexico-form.component.scss'],
  providers:  [QuestionService]
})
export class MexicoFormComponent {

  @ViewChild(DynamicFormComponent) dynamicForm?: DynamicFormComponent;
  @Input() infoVendor:any;
  questions$?: Observable<QuestionBase<any>[]>;
  vendorData?: any;
  lists?: any;
  valuesForm: any;

  constructor(private questionService: QuestionService) {

  }

  ngAfterViewInit(): void {
    const informacion_accionistas:any = this.dynamicForm?.formGroup.get('informacion_accionistas');

    informacion_accionistas?.valueChanges
      .pipe(
        startWith(informacion_accionistas?.value),
        pairwise(),
        map(([oldValues, newValues]: any) => {
          return newValues.findIndex(
            (item:any, k:number) => {
              return !isEqual(newValues[k], oldValues[k])
            }
          );
        })
      ).subscribe( (values:any) => {

        if(values > 0){
          this.handleActionistChange(informacion_accionistas['controls'][values])
        }

    });

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
    this.setComplementInfoFinalBenefit();
  }

  private setVendorMultipleInfo() {
    this.infoVendor.vendor_info_user.forEach(
      (info_user: any) => {
        if (info_user.id == 1) {
          this.valuesForm['otras_empresas'] =
            info_user.user_person.map((user: any) => ({
              uuid: uuidv4(),
              name: user.name,
              document: user.document,
              f_document_type_id: this.lists.moral_id.find( (option:any) => option.key == user.f_document_type_id) ? user.f_document_type_id : null ,
              f_person_type_id: TYPE_PERSON_MEXICO.Moral,
              quantity: user.quantity,
              id: user.id,
            }))
        }

        if (info_user.id == 2) {
          this.valuesForm['informacion_representantes_legales'] =
            info_user.user_person.map((user: any) => ({
              uuid: uuidv4(),
              name: user.name,
              last_name: user.last_name,
              f_document_type_id: this.lists.fisica_id.find( (option:any) => option.key == user.f_document_type_id) ? user.f_document_type_id : null ,
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
              uuid: uuidv4(),
              name: user.name,
              last_name: user.last_name,
              f_document_type_id: this.lists.fisica_id.find( (option:any) => option.key == user.f_document_type_id) ? user.f_document_type_id : null ,
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
                uuid: uuidv4(),
                f_person_type_id: user.f_person_type_id,
                name: user.name,
                percente_participation: user.percente_participation,
                document: user.document,
                f_document_type_id: user.f_document_type_id,
                expedition_date: user.expedition_date,
                country: user.country,
                id: user.id,
                children: user.childrent

              }
            })
        }
      }
    );
  }

  private setComplementInfoFinalBenefit() {

    this.valuesForm['informacion_beneficiarios_finales'] = [];

    const informacion_accionistas = this.valuesForm['informacion_accionistas'];

    if (informacion_accionistas) {
      const info_final = informacion_accionistas.filter(
        (person: any) => {
          return (
            person.f_person_type_id == 4 && person.percente_participation >= 5
          );
        }
      );

      info_final.forEach( (infoAccionista: any) => {
        this.addFinalBeneficiaryByActionist(infoAccionista);
      })
    }

    console.log(this.valuesForm['informacion_beneficiarios_finales'])
  }

  private addFinalBeneficiaryByActionist(infAccionista: any) {

    this.valuesForm['informacion_beneficiarios_finales'].push({
      id: infAccionista.id,
      uuid: infAccionista.uuid,
      document: infAccionista.document,
      f_document_type_id: infAccionista.f_document_type_id,
      name: infAccionista.name,
      informacion_beneficiarios_finales_people: infAccionista.children.length ? infAccionista.children.map(
        (child: any) => ({
          f_person_type_id: child.f_person_type_id,
          name: child.name,
          document: child.document,
          f_document_type_id: child.f_document_type_id,
          expedition_date: child.expedition_date,
          id: child.id,
        })
      ): [{
          uuid: uuidv4(),
          f_person_type_id: null,
          name: null,
          document: null,
          f_document_type_id: null,
          expedition_date: null,
          id: null,
      }]
    });
  }

  private handleActionistChange(row: any){

    const beneficiaryInfoArray = this.dynamicForm?.formGroup.get('informacion_beneficiarios_finales')
    const beneficiaryInfo = (beneficiaryInfoArray as FormArray)?.controls.find( (info:any) => info.value.uuid == row.value.uuid);

    if(row.value.f_person_type_id){
      row.get('document').patchValue({
        ...row.get('document').value,
        person: row.value.f_person_type_id
      }, {emitEvent: false, emitModelToViewChange: true});
    }


    if(beneficiaryInfo){
     beneficiaryInfo.patchValue({
        name: row.value.name,
        document: row.value.document.document,
        f_document_type_id: row.value.document.type,
     })

    }
  }

  private setVendorDeclaraciones(){

  }
}
