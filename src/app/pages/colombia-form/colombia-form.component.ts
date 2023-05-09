import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { values } from 'lodash';
import { Observable, debounceTime, map, pairwise, startWith } from 'rxjs';
import { DynamicFormComponent } from 'src/app/components/form/question/dynamic-form/dynamic-form.component';
import { QuestionService } from 'src/app/services/question.service';
import {
  SECTIONS_COLOMBIA_FORM,
  TYPE_PERSON_COLOMBIA,
} from 'src/app/shared/forms/colombia_form';
import { QuestionBase } from 'src/app/shared/question/struct/question-base';
import { v4 as uuidv4 } from 'uuid';
import { isEqual } from 'lodash';
import { info_files } from 'src/app/shared/forms/files_types';
import { CountryVendor } from 'src/app/shared/interfaces/country_vendors';
import { HeaderServiceService } from 'src/app/services/header-service.service';


@Component({
  selector: 'app-colombia-form',
  templateUrl: './colombia-form.component.html',
  styleUrls: ['./colombia-form.component.scss'],
})
export class ColombiaFormComponent {
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

  get otherCompanies(): FormArray{
    return this.dynamicForm?.formGroup.get('otras_empresas') as FormArray;
  }

  get legalRepresent(): FormArray{
    return this.dynamicForm?.formGroup.get('informacion_representantes_legales') as FormArray;
  }

  get boardDirectors(): FormArray{
    return this.dynamicForm?.formGroup.get('informacion_junta_directiva') as FormArray;
  }

  get publicExposedPeople(): FormArray{
    return this.dynamicForm?.formGroup.get('informacion_personas_expuestas') as FormArray;
  }

  constructor(private questionService: QuestionService, private headerService: HeaderServiceService) {

  }

  ngAfterViewInit(): void {

    this.setValuesChangeCIIU();
    this.setValuesBasicInfo();

    setTimeout( () => {
      if(this.vendorData.f_person_type_id == TYPE_PERSON_COLOMBIA.Juridica){
        this.setValuesChangeShareholder();
        this.setValuesChangeFinalBeneficiary();
        this.setValuesChangeOtherCompanies();
        this.setValuesChangeLegalRepresent();
        this.setValuesChangeBoardDirectors();
      }

      this.setValuesChangePublicExposedPeople()
      this.setValuesChangeAttachments();

    }, 1000)
  }

  ngOnInit(): void {
    this.vendorData = {...this.infoVendor.vendor}
    this.lists = this.infoVendor.lists;

    this.setValuesForm();
    this.questions$ = this.questionService.getQuestions(this.lists, this.valuesForm, CountryVendor.Colombia);

    this.headerService.onSaveHeader()
      .subscribe((data: any) => {
        this.confirmSubmit()
      })
  }

  setValuesForm() {

    this.valuesForm = {
      ...this.vendorData,
      'tipo_solicitud': 'Vinculación',
      'uuid': uuidv4()
    }

    const _ciiu = this.infoVendor.vendor_economic_activitis.find( (item:any) => item.ciiu == this.valuesForm.ciiu);
    this.valuesForm['actividad_economica'] =  _ciiu?.economic_activity

    if(this.valuesForm['f_person_type_id'] == TYPE_PERSON_COLOMBIA.Juridica){
      this.valuesForm['pep'] = null;
    }

    this.setVendorMultipleInfo();
    this.setComplementInfoFinalBenefit();
    this.setVendorDeclaraciones();

    this.setPoliticExposePerson();
    this.setFilesValues();

  }

  onSubmitForm(values: any){
    const formData = this.prepareSubmitData(values);
    this.onVerify.emit(formData);
  }

  confirmSubmit(){
    const values = this.dynamicForm?.getFormValue();
    const formData = this.prepareSubmitData(values);
    this.onSubmit.emit(formData);
  }

  private setFilesValues(){
    this.infoVendor['document_vendor'].forEach( (document:any) => {

      if(document.link == null || document.link == undefined){
        return;
      }

      const file = { name: document.link, url: document.link}

      Object.keys(info_files)
      .map((key: string) => {
        const file_key = info_files[key as unknown as keyof typeof info_files];

        if(document.id == Number(key)){
          this.valuesForm[file_key] = file
        }

      })
    })
  }

  private setVendorMultipleInfo() {
    this.infoVendor.vendor_info_user.forEach(
      (info_user: any) => {
        if (info_user.id == 1) {
          this.valuesForm['otras_empresas'] =
            info_user.user_person.length ? info_user.user_person.map((user: any) => ({
              uuid: uuidv4(),
              name: user.name,
              document: user.document,
              verification_digit: user.verification_digit,
              f_document_type_id: this.lists.juridica_id.find( (option:any) => option.key == user.f_document_type_id) ? user.f_document_type_id : null ,
              f_person_type_id: TYPE_PERSON_COLOMBIA.Juridica,
              quantity: user.quantity,
              id: user.id,

            })) : [{
              uuid: uuidv4()
            }]
        }

        if (info_user.id == 2) {
          this.valuesForm['informacion_representantes_legales'] =
          info_user.user_person.length ? info_user.user_person.map((user: any) => ({
              uuid: uuidv4(),
              name: user.name,
              last_name: user.last_name,
              f_document_type_id: this.lists.natural_id.find( (option:any) => option.key == user.f_document_type_id) ? user.f_document_type_id : null ,
              document: user.document,
              verification_digit: user.verification_digit,
              expedition_date: user.expedition_date,
              f_person_type_id: TYPE_PERSON_COLOMBIA.Natural,
              country: user.country,
              department: user.department,
              city: user.city,
              email: user.email,
              id: user.id,
              informacion_representantes_legales_pep: user.pep
            })): [{
              uuid: uuidv4()
            }]
        }

        if (info_user.id == 3) {
          this.valuesForm['informacion_junta_directiva'] =
          info_user.user_person.length ? info_user.user_person.map((user: any) => ({
              uuid: uuidv4(),
              name: user.name,
              last_name: user.last_name,
              f_document_type_id: this.lists.natural_id.find( (option:any) => option.key == user.f_document_type_id) ? user.f_document_type_id : null ,
              document:  user.document,
              verification_digit: user.verification_digit,
              f_person_type_id: TYPE_PERSON_COLOMBIA.Natural,
              expedition_date: user.expedition_date,
              country: user.country,
              department: user.department,
              city: user.city,
              email: user.email,
              id: user.id,
              informacion_junta_directiva_pep: user.pep,
            })): [{
              uuid: uuidv4()
            }]
        }

        if (info_user.id == 4) {

          this.valuesForm['informacion_accionistas'] =
          info_user.user_person.length ? info_user.user_person.map((user: any) => {
              return {
                uuid: uuidv4(),
                f_person_type_id: user.f_person_type_id,
                name: user.name,
                percente_participation: user.percente_participation,
                document: user.document,
                verification_digit: user.verification_digit,
                f_document_type_id: user.f_document_type_id,
                expedition_date: user.expedition_date,
                country: user.country,
                id: user.id,
                children: user.childrent,
                informacion_accionistas_pep: user.pep,
                visible_informacion_accionistas_pep: user.f_person_type_id == TYPE_PERSON_COLOMBIA.Natural,
              }
            }): [{
              uuid: uuidv4(),
              visible_informacion_accionistas_pep: false
            }]
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
            person.f_person_type_id == TYPE_PERSON_COLOMBIA.Juridica && person.percente_participation >= 5
          );
        }
      );

      info_final.forEach( (infoAccionista: any) => {
        this.addFinalBeneficiaryByShareholder(infoAccionista);
      })
    }

  }

  private setPoliticExposePerson(){
    const politicExposesPersonList = [];


    if(this.valuesForm['pep'] && this.valuesForm['document'] && this.valuesForm['f_document_type_id']){
      politicExposesPersonList.push(this.createPoliticExposePerson({...this.valuesForm}, 1))
    }

    this.valuesForm['informacion_representantes_legales'].forEach( (person:any) => {
      if(person['informacion_representantes_legales_pep'] && person['document'] && person['f_document_type_id']){
        politicExposesPersonList.push(this.createPoliticExposePerson({...person}, 2))
      }
    });

    this.valuesForm['informacion_junta_directiva'].forEach( (person:any) => {
      if(person['informacion_junta_directiva_pep'] && person['document'] && person['f_document_type_id']){
        politicExposesPersonList.push(this.createPoliticExposePerson({...person}, 3))
      }
    });

    this.valuesForm['informacion_accionistas'].forEach( (person:any) => {
      if(person['informacion_accionistas_pep'] && person['document'] && person['f_document_type_id']){
        politicExposesPersonList.push(this.createPoliticExposePerson({...person}, 4))
      }
    });

    this.valuesForm['informacion_beneficiarios_finales'].forEach( (beneficiaries:any) => {
      beneficiaries['informacion_beneficiarios_finales_people'].forEach( (person: any) => {
        if(person['info_beneficiarios_persona_pep'] && person['document'] && person['f_document_type_id']){
          politicExposesPersonList.push(this.createPoliticExposePerson({...person}, 6))
        }
      })
    });

    this.valuesForm['informacion_personas_expuestas'] = politicExposesPersonList.map( (person:any) => {
      const existPerson = this.infoVendor.exposed_peoploes.find( (_person:any) =>
        _person.document_parent == person.document_parent &&
        _person.f_document_parent_type_id == person.f_document_parent_type_id
      )

      if(existPerson){
        person = {...person, ...existPerson, parent_id: person.parent_id};
      }

      return person;

    })

  }

  private createPoliticExposePerson(person: any, parent_id: number){
    return {
      parent_id,
      uuid: person.uuid,
      document_parent: person.document,
      name_parent: person.name,
      f_document_parent_type_id: person.f_document_type_id,
      people_relationships: [{
        f_person_type_id: 1
      }]
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
          uuid: uuidv4(),
          f_person_type_id: child.f_person_type_id,
          name: child.name,
          document: child.document,
          f_document_type_id: child.f_document_type_id,
          verification_digit: child.verification_digit,
          expedition_date: child.expedition_date,
          id: child.id,
          info_beneficiarios_persona_pep: child.pep,
          visible_info_beneficiarios_persona_pep: child.f_person_type_id == TYPE_PERSON_COLOMBIA.Natural,
        })
      ): [{
        visible_info_beneficiarios_persona_pep: false,
      }]
    });

    return this.valuesForm['informacion_beneficiarios_finales'][this.valuesForm['informacion_beneficiarios_finales'].length - 1]
  }

  private setValuesChangeOtherCompanies(){

    this.otherCompanies?.valueChanges
    .pipe(
      startWith(this.otherCompanies?.value),
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
        this.handleOtherCompaniesChange(this.otherCompanies['controls'][values])
      }
    });
  }

  private handleOtherCompaniesChange(row: any){

    /** Action change type person */
      row.get('document').patchValue({
        ...row.get('document').value,
        person: TYPE_PERSON_COLOMBIA.Juridica
      }, {emitEvent: false, emitModelToViewChange: true});
  }

  private setValuesChangeLegalRepresent(){
    this.legalRepresent?.valueChanges
    .pipe(
      startWith(this.legalRepresent?.value),
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
        this.handleLegalRepresentChange(this.legalRepresent['controls'][values])
      }
    });
  }

  private handleLegalRepresentChange(row: any){

    this.setPublicExposePersonRow(row);
    this.addPublicExposePerson(row.getRawValue(), 'informacion_representantes_legales_pep', 2);

    /** Action change type person */
    row.get('document').patchValue({
      ...row.get('document').value,
      person: TYPE_PERSON_COLOMBIA.Natural
    }, {emitEvent: false, emitModelToViewChange: true});


  }

  private setValuesChangeBoardDirectors(){
    this.boardDirectors?.valueChanges
    .pipe(
      startWith(this.boardDirectors?.value),
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
        this.handleBoardDirectorsChange(this.boardDirectors['controls'][values])
      }
    });
  }

  private handleBoardDirectorsChange(row: any){


    this.setPublicExposePersonRow(row);
    this.addPublicExposePerson(row.getRawValue(), 'informacion_junta_directiva_pep', 3);

    /** Action change type person */
    row.get('document').patchValue({
      ...row.get('document').value,
      person: TYPE_PERSON_COLOMBIA.Natural
    }, {emitEvent: false, emitModelToViewChange: true});
  }

  private setValuesChangeShareholder(){
    this.shareholderInformation?.valueChanges
    .pipe(
      debounceTime(150),
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
    const hasComplementInfo = Number(row.value.f_person_type_id) == TYPE_PERSON_COLOMBIA.Juridica && Number(row.value.percente_participation) >= 5;

    this.setPublicExposePersonRow(row);
    this.addPublicExposePerson(row.getRawValue(), 'informacion_accionistas_pep', 4);

    /** Action change type person */
    if(row.value.f_person_type_id){
      row.get('document').patchValue({
        ...row.get('document').value,
        person: row.value.f_person_type_id
      }, {emitEvent: false, emitModelToViewChange: true});
    }

    row.get('visible_informacion_accionistas_pep').setValue(
      row.value.f_person_type_id == TYPE_PERSON_COLOMBIA.Natural, {emitEvent: false, emitModelToViewChange: true}
    )

    if(row.value.f_person_type_id == TYPE_PERSON_COLOMBIA.Juridica){
      row.get('informacion_accionistas_pep').setValue('2', {emitEvent: false, emitModelToViewChange: true}
      )
    }



    /** Action add / remove final beneficiary information */
    if(hasComplementInfo && !beneficiaryInfo){

      const questionsRaw = this.dynamicForm?.questionsForm
        ?.find( question => question.key == SECTIONS_COLOMBIA_FORM.INFORMACION_BENEFICIARIOS_FINALES)
        ?.children

      if(questionsRaw){
        const newRowQuestions = this.questionService.getArrayGroupQuestions(questionsRaw, this.lists, SECTIONS_COLOMBIA_FORM.INFORMACION_BENEFICIARIOS_FINALES);
        const formRow = this.questionService.addNewRowArrayGroupQuestion(this.finalBeneficiaryInfo, newRowQuestions)
        formRow.patchValue({
          document: row.value.document?.document,
          f_document_type_id: row.value.document?.type,
          name: row.value.name,
          uuid: row.value.uuid,
          [`init_informacion_beneficiarios_finales_people`]: [{
            uuid: uuidv4()
          }]
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

    this.setPublicExposePersonRow(row);
    this.addPublicExposePerson(row.getRawValue(), 'info_beneficiarios_persona_pep', 6);

    /** Action change type person */
    if(row.value.f_person_type_id){
      row.get('document').patchValue({
        ...row.get('document').value,
        person: row.value.f_person_type_id
      }, {emitEvent: false, emitModelToViewChange: true});
    }

    row.get('visible_info_beneficiarios_persona_pep').setValue(
      row.value.f_person_type_id == TYPE_PERSON_COLOMBIA.Natural, {emitEvent: false, emitModelToViewChange: true}
    )
  }

  private setValuesChangePublicExposedPeople(){
    this.publicExposedPeople?.valueChanges
    .pipe(
      startWith(this.publicExposedPeople?.value),
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
        this.handlePublicExposedPeopleChange(this.publicExposedPeople['controls'][values])
      }
    });


  }

  private handlePublicExposedPeopleChange(row: any){

    row.get('people_relationships').controls.forEach( (control:any) => {
       /** Action change type person */
       control.get('document').patchValue({
        ...control.get('document').value,
        person: 1
      }, {emitEvent: false, emitModelToViewChange: true});

    })



  }


  private setValuesChangeAttachments(){
    const formGroup = this.dynamicForm?.formGroup;
    const filesInForm = [
      "cedula_file",
      "certificado_existencia_file",
      "cedula_representante_legal_file",
      "rut_file",
      "certificacion_bancaria_file",
      "documento_politicas"
    ]

    formGroup?.valueChanges
      .pipe(
        startWith(formGroup.value),
        pairwise(),
        map(([oldValues, newValues]: any) => {
          return Object.keys(newValues).find(
            (k) => newValues[k] != oldValues[k] && filesInForm.includes(k)
          );
        })
      )
      .subscribe( (value:any) => {
        if(value){
          this.handleAttachmentsChanges(formGroup.value[value], value);
        }
      });

  }

  private handleAttachmentsChanges(value: any, formControlName: string){
    const values = this.dynamicForm?.getFormValue();
    const formData = this.prepareSubmitData(values);
    this.onFileSubmit.emit({formControlName, value: value?.file, formData})
  }

  private setValuesChangeCIIU(){
    const ciiu = this.dynamicForm?.formGroup.get('f_vendor_economic_act_id')
    ciiu?.valueChanges
    .subscribe( (value:any) => {
      const _ciiu = this.infoVendor.vendor_economic_activitis.find( (item:any) => item.id == Number(value));
      this.dynamicForm?.formGroup.get('actividad_economica')?.setValue(_ciiu?.economic_activity,  {emitEvent: false, emitModelToViewChange: true})
    });
  }

  private setValuesBasicInfo(){

    const changeExposedPeople = (value: any) => {
      const beneficiaryInfoIndex = this.publicExposedPeople?.controls.findIndex( (info:any) => info.value.parent_id == 1);
      const beneficiaryInfo = this.publicExposedPeople?.controls[beneficiaryInfoIndex];

      if(beneficiaryInfo){
        beneficiaryInfo.patchValue({
            name_parent: value.name,
            document_parent: value.document.document,
            f_document_parent_type_id: value.document.type,
        })
      }
    }

    const document = this.dynamicForm?.formGroup.get('document')
    const name = this.dynamicForm?.formGroup.get('name')
    const pep = this.dynamicForm?.formGroup.get('pep')

    document?.valueChanges.subscribe( (value:any) => changeExposedPeople({name: name?.value, document: value}));
    name?.valueChanges.subscribe( (value:any) => changeExposedPeople({name: value, document: document?.value}));
    pep?.valueChanges.subscribe( (value:any) => this.addPublicExposePerson(this.dynamicForm?.getFormValue(), 'pep', 1));
  }

  private setPublicExposePersonRow(row: any){
    const exposedPeopleInfoIndex = this.publicExposedPeople?.controls.findIndex( (info:any) => info.value.uuid == row.value.uuid);
    const exposedPeopleInfo = this.publicExposedPeople?.controls[exposedPeopleInfoIndex];

    if(exposedPeopleInfo){
      exposedPeopleInfo.patchValue({
          name_parent: row.value.name,
          document_parent: row.value.document.document,
          f_document_parent_type_id: row.value.document.type,
      })
    }
  }

  private addPublicExposePerson(person: any, pepIndex: string, parent_id: number){

    const exposedPersonInfoIndex = this.publicExposedPeople?.controls.findIndex( (info:any) => person.uuid ? info.value.uuid == person.uuid: info.value.parent_id == 1);
    const exposedPersonInfo = this.publicExposedPeople?.controls[exposedPersonInfoIndex];
    const pepValue = Number(person[pepIndex])

    if(pepValue == 1 && !exposedPersonInfo){

      const questionsRaw = this.dynamicForm?.questionsForm
        ?.find( question => question.key == SECTIONS_COLOMBIA_FORM.INFORMACION_PERSONAS_EXPUESTAS)
        ?.children

        if(questionsRaw){
          const newRowQuestions = this.questionService.getArrayGroupQuestions(questionsRaw, this.lists, SECTIONS_COLOMBIA_FORM.INFORMACION_PERSONAS_EXPUESTAS);
          const formRow = this.questionService.addNewRowArrayGroupQuestion(this.publicExposedPeople, newRowQuestions)

          formRow.patchValue({
            document_parent: person.document?.document,
            f_document_parent_type_id: person.document?.type,
            name_parent: person.name,
            uuid: person.uuid,
            parent_id: parent_id,
            [`init_people_relationships`]: [{}]
          });

          this.publicExposedPeople.push(formRow)
        }

      return;
    }

    if(pepValue != 1 && exposedPersonInfo){
      this.publicExposedPeople.removeAt(exposedPersonInfoIndex);
      return;
    }
  }

  private prepareSubmitData(values: any){
    const info_users: any = [];

    values['otras_empresas']?.forEach((row: any) => {
      info_users.push({
        ...row,
        document: row.document.document,
        verification_digit: row.document.verification,
        f_document_type_id: Number(row.document.type),
        f_vendor_info_user_type_id: 1,
      });
    });

    values['informacion_representantes_legales']?.forEach((row: any) => {
      info_users.push({
        ...row,
        document: row.document.document,
        f_document_type_id: Number(row.document.type),
        verification_digit: row.document.verification,
        pep: row['informacion_representantes_legales_pep'] == '1' ? true : null,
        f_vendor_info_user_type_id: 2,
      });
    });

    values['informacion_junta_directiva']?.forEach((row: any) => {
      info_users.push({
        ...row,
        document: row.document.document,
        f_document_type_id: Number(row.document.type),
        verification_digit: row.document.verification,
        pep: row['informacion_junta_directiva_pep'] == '1' ? true : null,
        f_vendor_info_user_type_id: 3,
      });
    });

    values['informacion_accionistas']?.forEach((row: any) => {
      info_users.push({
        ...row,
        document: row.document.document,
        f_document_type_id: Number(row.document.type),
        verification_digit: row.document.verification,
        pep: row['informacion_accionistas_pep'] == '1' ? true : null,
        f_vendor_info_user_type_id: 4,
      });
    });

    values['informacion_beneficiarios_finales']?.forEach((row: any) => {
      row['informacion_beneficiarios_finales_people']?.forEach((person: any) => {
        info_users.push({
          document_parent: row.document,
          f_document_parent_type_id: Number(row.f_document_type_id),
          f_vendor_info_user_type_id: 5,
          ...person,
          document: person.document?.document,
          f_document_type_id: Number(person.document?.type),
          verification_digit: person.document?.verification,
          pep: person['info_beneficiarios_persona_pep'] == '1' ? true : null,
        });
      });
    });

    const exposed_peoploe = values['informacion_personas_expuestas'].map(
      (person: any) => {
        const {
          people_relationships,
          document_parent,
          f_document_parent_type_id,
          entity,
          position,
          binding_date,
          termination_date,
        } = person;

        people_relationships.forEach( (person:any) => {
          person.f_document_type_id = person.document.type
          person.verification_digit = person.document.verification
          person.document = person.document.document
        })

        return {
          document_parent,
          f_document_parent_type_id,
          entity,
          position,
          binding_date,
          termination_date,
          people_relationships: people_relationships
        };
      }
    );

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
      board_of_directors: _values.board_of_directors == '1' ? true : null,
      pep: _values.pep == '1' ? true : null,
      info_users,
      info_additional,
      exposed_peoploe
    }

    return formData;
  }


}
