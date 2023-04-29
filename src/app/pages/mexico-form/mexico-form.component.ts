import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { values } from 'lodash';
import { Observable, map, pairwise, startWith } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/question/dynamic-form/dynamic-form.component';
import { QuestionService } from 'src/app/services/question.service';
import { SECTIONS_MEXICO_FORM, TYPE_PERSON_MEXICO } from 'src/app/shared/forms/mexico_form';
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
  @Output() onSubmit = new EventEmitter();
  @Output() onVerify = new EventEmitter();
  @Output() onFileSubmit = new EventEmitter();
  questions$?: Observable<QuestionBase<any>[]>;
  vendorData?: any;
  lists?: any;
  valuesForm: any;

  get finalBeneficiaryInfo(): FormArray{
    return this.dynamicForm?.formGroup.get('informacion_beneficiarios_finales') as FormArray;
  }

  get shareholderInformation(): FormArray{
    return this.dynamicForm?.formGroup.get('informacion_accionistas') as FormArray;
  }

  constructor(private questionService: QuestionService) {

  }

  ngAfterViewInit(): void {


    /** On change share holder */
    this.setValuesChangeShareholder();

    /** On change final beneficiary infor */
    this.setValuesChangeFinalBeneficiary();


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
    this.setVendorDeclaraciones()

    console.log(this.valuesForm)
  }

  onSubmitForm(values: any){
    const formData = this.prepareSubmitData(values);
    this.onSubmit.emit(formData);
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
        this.addFinalBeneficiaryByShareholder(infoAccionista);
      })
    }

  }

  private setVendorDeclaraciones(){
    const info_addtional_vendor = {
      5: 'conflicto_intereses',
      6: 'vinculo_estatal',
      7: 'vinculo_familiar_estatal',
      8: 'servicios_actividades_prestados',
      9: 'incluido_sat',
    }

    this.infoVendor.info_addtional_vendor.forEach( (info_user:any) => {
      const value = info_user.value;
      const input = info_addtional_vendor[info_user.id as keyof typeof info_addtional_vendor]

      if(input){
        this.valuesForm[`desc_${input}`] = info_user.description;
        this.valuesForm[input] = value;
      }
    });
  }

  private addFinalBeneficiaryByShareholder(infAccionista: any) {

    this.valuesForm['informacion_beneficiarios_finales'].push({
      id: infAccionista.id,
      uuid: infAccionista.uuid,
      document: infAccionista.document,
      f_document_type_id: infAccionista.f_document_type_id,
      name: infAccionista.name,
      informacion_beneficiarios_finales_people: infAccionista.children?.length ? infAccionista.children.map(
        (child: any) => ({
          f_person_type_id: child.f_person_type_id,
          name: child.name,
          document: child.document,
          f_document_type_id: child.f_document_type_id,
          expedition_date: child.expedition_date,
          id: child.id,
        })
      ): [{}]
    });

    return this.valuesForm['informacion_beneficiarios_finales'][this.valuesForm['informacion_beneficiarios_finales'].length - 1]
  }

  private setValuesChangeShareholder(){
    this.shareholderInformation?.valueChanges
    .pipe(
      startWith(this.shareholderInformation?.value),
      pairwise(),
      map(([oldValues, newValues]: any) => {
        return newValues.findIndex(
          (item:any, k:number) => {
            return !isEqual(newValues[k], oldValues[k])
          }
        );
      })
    ).subscribe( (values:any) => {

      if(values > -1){
        this.handleShareholderChange(this.shareholderInformation['controls'][values])
      }
  });
  }

  private handleShareholderChange(row: any){

    const beneficiaryInfoIndex = this.finalBeneficiaryInfo?.controls.findIndex( (info:any) => info.value.uuid == row.value.uuid);
    const beneficiaryInfo = this.finalBeneficiaryInfo?.controls[beneficiaryInfoIndex];
    const hasComplementInfo = Number(row.value.f_person_type_id) == TYPE_PERSON_MEXICO.Moral && Number(row.value.percente_participation) >= 5;

    /** Action change type person */
    if(row.value.f_person_type_id){
      row.get('document').patchValue({
        ...row.get('document').value,
        person: row.value.f_person_type_id
      }, {emitEvent: false, emitModelToViewChange: true});
    }

    /** Action add / remove final beneficiary information */
    if(hasComplementInfo && !beneficiaryInfo){

      const questionsRaw = this.dynamicForm?.questionsForm
        ?.find( question => question.key == SECTIONS_MEXICO_FORM.INFORMACION_BENEFICIARIOS_FINALES)
        ?.children

      if(questionsRaw){
        const newRowQuestions = this.questionService.getArrayGroupQuestions(questionsRaw, this.lists, SECTIONS_MEXICO_FORM.INFORMACION_BENEFICIARIOS_FINALES);
        const formRow = this.questionService.addNewRowArrayGroupQuestion(this.finalBeneficiaryInfo, newRowQuestions)
        formRow.patchValue({
          document: row.value.document?.document,
          f_document_type_id: row.value.document?.type,
          name: row.value.name,
          uuid: row.value.uuid,
          [`init_informacion_beneficiarios_finales_people`]: [{}]
        });

        this.finalBeneficiaryInfo.push(formRow)
      }

      this.setValuesChangeFinalBeneficiary();

      return;
    }


    if(!hasComplementInfo && beneficiaryInfo){
      this.finalBeneficiaryInfo.removeAt(beneficiaryInfoIndex);
      return;
    }

    if(beneficiaryInfo){
      beneficiaryInfo.patchValue({
        name: row.value.name,
        document: row.value.document.document,
        f_document_type_id: row.value.document.type,
     })

    }
  }

  private setValuesChangeFinalBeneficiary(){
    this.finalBeneficiaryInfo['controls'].forEach( (rowControl:any) => {
      const formArray = rowControl.get('informacion_beneficiarios_finales_people');

      formArray?.valueChanges
        .pipe(
          startWith(formArray?.value),
          pairwise(),
          map(([oldValues, newValues]: any) => {
            return newValues.findIndex(
              (item:any, k:number) => {
                return !isEqual(newValues[k], oldValues[k])
              }
            );
          })
        )
        .subscribe( (values:any) => {
          if(values > -1){
            this.handleFinalBeneficiaryChange(formArray['controls'][values])
          }
      });
    });
  }

  private handleFinalBeneficiaryChange(row: any){

    /** Action change type person */
    if(row.value.f_person_type_id){
      row.get('document').patchValue({
        ...row.get('document').value,
        person: row.value.f_person_type_id
      }, {emitEvent: false, emitModelToViewChange: true});
    }
  }

  private prepareSubmitData(values: any){
    const info_users: any = [];

    console.log(values)

    values['otras_empresas']?.forEach((row: any) => {
      info_users.push({
        ...row,
        document: row.document.document,
        f_document_type_id: row.document.type,
        f_vendor_info_user_type_id: 1,
      });
    });

    values['informacion_representantes_legales']?.forEach((row: any) => {
      info_users.push({
        ...row,
        document: row.document.document,
        f_document_type_id: row.document.type,
        verification_digit: row.document.verification,
        f_vendor_info_user_type_id: 2,
      });
    });

    values['informacion_junta_directiva']?.forEach((row: any) => {
      info_users.push({
        ...row,
        document: row.document.document,
        f_document_type_id: row.document.type,
        verification_digit: row.document.verification,
        f_vendor_info_user_type_id: 3,
      });
    });

    values['informacion_accionistas']?.forEach((row: any) => {
      info_users.push({
        ...row,
        document: row.document.document,
        f_document_type_id: row.document.type,
        verification_digit: row.document.verification,
        f_vendor_info_user_type_id: 4,
      });
    });

    values['informacion_beneficiarios_finales']?.forEach((row: any) => {
      row['informacion_beneficiarios_finales_people']?.forEach((person: any) => {
        info_users.push({
          document_parent: row.document,
          f_document_parent_type_id: row.f_document_type_id,
          f_vendor_info_user_type_id: 5,
          ...person,
          document: person.document?.document,
          f_document_type_id: person.document?.type,
          verification_digit: person.document?.verification,
        });
      });
    });

    const info_additional = [
      {
        vendor_inf_add_type_id: 5,
        value: values['conflicto_intereses'] == '1' ? true : null,
        description: values['desc_conflicto_intereses']
      },
      {
        vendor_inf_add_type_id: 6,
        value: values['vinculo_estatal'] == '1' ? true : null,
        description: values['desc_vinculo_estatal']
      },
      {
        vendor_inf_add_type_id: 7,
        value: values['vinculo_familiar_estatal'] == '1' ? true : null,
        description: values['desc_vinculo_familiar_estatal']
      },
      {
        vendor_inf_add_type_id: 8,
        value: values['servicios_actividades_prestados'] == '1' ? true : null,
      },
      {
        vendor_inf_add_type_id: 9,
        value: values['incluido_sat'] == '1' ? true : null,
      },
    ]

    const  {
      otras_empresas,
      informacion_representantes_legales,
      informacion_junta_directiva,
      informacion_accionistas,
      informacion_beneficiarios_finales,
      ..._values
     } = values;

    const formData = {
      ..._values,
      document: _values['document']?.document,
      verification_digit: _values['document']?.verification,
      f_document_type_id: _values['document']?.type
        ? Number(_values['document'].type)
        : null,
      f_person_type_id: _values.f_person_type_id
        ? Number(_values.f_person_type_id)
        : null,
      f_vendor_economic_act_id: _values.f_vendor_economic_act_id
        ? Number(_values.f_vendor_economic_act_id)
        : null,
      f_vendor_type_id: _values.f_vendor_type_id
        ? Number(_values.f_vendor_type_id)
        : null,
      business_group: _values.business_group == '1' ? true : null,
      info_users,
      info_additional
    }

    return formData;
  }


}
