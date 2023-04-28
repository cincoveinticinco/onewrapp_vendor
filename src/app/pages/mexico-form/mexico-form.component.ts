import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { distinctUntilChanged, map, pairwise, startWith } from 'rxjs';
import { VendorsService } from 'src/app/services/vendors.service';
import {
  MEXICO_FORM,
  SECTIONS_MEXICO_FORM,
  TYPE_PERSON_MEXICO
} from 'src/app/shared/forms/mexico_form';
import { IForm } from 'src/app/shared/interfaces/form';
import { IInputForm, ISelectBoxOption, TypeInputForm } from 'src/app/shared/interfaces/input_form';
import { info_files } from 'src/app/shared/forms/files_types';
import { VALIDATORS_PATTERNS } from 'src/app/shared/interfaces/validators';
import { SideMenuComponent } from 'src/app/components/side-menu/side-menu.component';

@Component({
  selector: 'app-mexico-form',
  templateUrl: './mexico-form.component.html',
  styleUrls: ['./mexico-form.component.scss']
})
export class MexicoFormComponent {
  @Output() onSubmit = new EventEmitter();
  @Output() onVerify = new EventEmitter();
  @Output() onFileSubmit = new EventEmitter();
  @Input() infoVendor: any;

  readonly COLOMBIAN_FORM = MEXICO_FORM;
  readonly TypeInputForm = TypeInputForm
  mainForm: IForm = { description: '', sections: [] };
  loading: boolean = false;
  form: FormGroup;
  formInValid: boolean = false;
  modalMessage: string | null = null;

  vendorData: any = {};

  inmutableData: any = {};
  lists: any = {};

  valuesLoaded: boolean = false;

  get representantes_legales(): FormControl {
    return this.form.controls['informacion_representantes_legales'] as FormControl;
  }

  get junta_directiva(): FormControl {
    return this.form.controls['informacion_junta_directiva'] as FormControl;
  }

  get personas_expuestas(): FormControl {
    return this.form.controls['informacion_personas_expuestas'] as FormControl;
  }

  get accionistas(): FormControl{
    return this.form.controls['informacion_accionistas'] as FormControl;
  }

  get beneficiarios_finales(): FormControl{
    return this.form.controls['informacion_beneficiarios_finales'] as FormControl;
  }

  get verify(): FormControl {
    return this.form.controls['verify'] as FormControl;
  }

  constructor(private _fB: FormBuilder, private vendorService: VendorsService) {
    this.form = this._fB.group({});
  }

  ngOnInit(): void {
    this.mainForm = { ...MEXICO_FORM };

    if (!this.infoVendor) return;

    this.inmutableData = { ...this.infoVendor };

    this.vendorData = {
      ...this.infoVendor.vendor,
      tipo_solicitud: 'Vinculación',
      created_at: this.infoVendor.vendor.created_at
        ? moment(this.infoVendor.vendor.created_at).format('YYYY-MM-DD')
        : null,
      expedition_date: this.infoVendor.vendor.expedition_date
        ? moment(this.infoVendor.vendor.expedition_date).format('YYYY-MM-DD')
        : null,
    };

    this.lists = this.inmutableData.lists;

    this.buildForm();
    this.setValuesForm();

    this.loading = false;
  }

  setValuesForm() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.controls[key];
      control.setValue(this.vendorData[key]);
    });

    this.form.controls['business_group'].setValue(
      this.vendorData['business_group'] ? '1' : '2'
    );

    this.form.controls['board_of_directors'].setValue(
      this.vendorData['board_of_directors'] ? '1' : '2'
    );

    this.form.controls['document'].setValue(
      {
        type: this.vendorData['f_document_type_id'],
        document: this.vendorData['document'],
        verification: this.vendorData['verification_digit'],
      }
    );

    this.form.controls['actividad_economica'].setValue(this.vendorData['vendor_economic'])

    this.setMoralSectionsVisible();
    this.setVendorMultipleInfo();
    this.setComplementInfoFinalBenefit();
    this.setCheckboxInfo();
    this.setVisbleBussinesGroup();
    this.setVisbleJuntaDirectiva();
    this.setFilesValues();

    this.setValidationsDeclaraciones();

    setTimeout(() => {
      this.valuesLoaded = true;
    }, 1000);

    console.log(this.form)

  }

  setListForm(data: any) {
    const tipo_contraparte = data.vendor_types.map((item: any) =>
      this.setSelectBoxOptions(item, 'id', 'vendor_type')
    );

    const tipo_persona = data.person_types.map((item: any) =>
      this.setSelectBoxOptions(item, 'id', 'person_type_esp')
    );

    const moral_tipo_id = data.person_types.find(
      (item: any) => item.id == TYPE_PERSON_MEXICO.Moral
    );
    const moral_id = moral_tipo_id
      ? moral_tipo_id.document_types.map((item: any) =>
          this.setSelectBoxOptions(item, 'id', 'document_type_esp')
        )
      : [];

    const fisica_tipo_id = data.person_types.find(
      (item: any) => item.id == TYPE_PERSON_MEXICO.Fisica
    );
    const fisica_id = fisica_tipo_id
      ? fisica_tipo_id.document_types.map((item: any) =>
          this.setSelectBoxOptions(item, 'id', 'document_type_esp')
        )
      : [];

    const todos_tipo_id = [...fisica_id, ...moral_id];
    const tipo_id =
      this.vendorData.f_person_type_id == TYPE_PERSON_MEXICO.Moral
        ? moral_id
        : fisica_id;

    const ciiu = data.vendor_economic_activitis.map((item: any) =>
      this.setSelectBoxOptions(item, 'id', 'ciiu')
    );

    const verification_digit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => ({
      key: value,
      value,
    }));


    const calidad = [
      { key: 1, value: 'Matriz' },
      { key: 2, value: 'Filial' },
      { key: 3, value: 'Subsidiaria' },
    ];

    const parentesco = data.relationship.map((item: any) =>
      this.setSelectBoxOptions(item, 'id', 'relationship')
    );

    this.lists = {
      tipo_contraparte,
      tipo_persona,
      tipo_id,
      fisica_id,
      moral_id,
      todos_tipo_id,
      ciiu,
      verification_digit,
      calidad,
      parentesco,
    };
  }

  buildForm() {
    const fields_group: any = {};

    this.mainForm.sections.forEach((section) => {
      section.inputs.forEach((input) => {
        if (input.data) {
          fields_group[input.data] = [''];
        }

        if (input.options_key) {
          input.options = this.lists[input.options_key];
        }

        if (input.children && input.children.length) {
          input.children.forEach((inputChild) => {
            if (inputChild.options_key) {
              inputChild.options = this.lists[inputChild.options_key];
            }

            if (inputChild.children && inputChild.children.length) {
              inputChild.children.forEach((inputLast) => {
                if (inputLast.options_key) {
                  inputLast.options = this.lists[inputLast.options_key];
                }
              });
            }
          });
        }
      });
    });



    this.form = this._fB.group(fields_group);

    this.form.valueChanges
      .pipe(
        startWith(this.form.value),
        pairwise(),
        map(([oldValues, newValues]: any) => {
          return Object.keys(newValues).find(
            (k) => newValues[k] != oldValues[k]
          );
        })
      )
      .subscribe((formControlName) => {
        if (this.valuesLoaded && formControlName) {
          this.handleChangeFormValues(formControlName);
        }

        this.formInValid = this.form.touched && this.form.invalid
      });
  }

  confirmSubmit(){
    this.representantes_legales.markAsDirty()
    this.representantes_legales?.updateValueAndValidity();

    this.junta_directiva.markAsDirty()
    this.junta_directiva?.updateValueAndValidity();

    this.accionistas.markAsDirty()
    this.accionistas?.updateValueAndValidity();

    this.beneficiarios_finales.markAsDirty()
    this.beneficiarios_finales?.updateValueAndValidity();

    const messages = [
      this.representantes_legales.invalid ? 'INFORMACIÓN REPRESENTANTES LEGALES' : null,
      this.junta_directiva.invalid ? 'INFORMACIÓN JUNTA DIRECTIVA, CONSEJO DE ADMINISTRACIÓN O EQUIVALENTE' : null,
      this.accionistas.invalid ? 'INFORMACIÓN ACCIONISTAS Y/O SOCIOS' : null,
      this.beneficiarios_finales.invalid ? 'INFORMACIÓN COMPLEMENTARIA DE BENEFICIARIOS FINALES' : null,
    ].filter( message => message != null)

    console.log(messages)

    if(messages.length > 0){
      this.modalMessage = `Hay informacion sin completar en ${messages.length > 1 ? 'las secciones' : 'la sección'} ${messages.join(', ')}, si no se completa esta no sera guardada. ¿Desea continuar?:`;
      return;
    }

    this.handleSubmit('save');

  }

  private prepareSubmitData(){
    const info_users: any = [];

    const otras_empresas = this.form.value['otras_empresas']?.rows
      ? this.form.value['otras_empresas'].rows
      : this.form.value['otras_empresas'];
    if (otras_empresas) {
      otras_empresas.forEach((row: any) => {
        info_users.push({
          ...row,
          document: row.document.document,
          f_document_type_id: row.document.type,
          f_vendor_info_user_type_id: 1,
        });
      });
    }

    const representantes_legales = this.form.value[
      'informacion_representantes_legales'
    ]?.rows
      ? this.form.value['informacion_representantes_legales'].rows
      : this.form.value['informacion_representantes_legales'];
    if (representantes_legales) {
      representantes_legales.forEach((row: any) => {
        info_users.push({
          ...row,
          document: row.document.document,
          f_document_type_id: row.document.type,
          verification_digit: row.document.verification,
          f_vendor_info_user_type_id: 2,
        });
      });
    }

    const junta_directiva = this.form.value['informacion_junta_directiva']?.rows
      ? this.form.value['informacion_junta_directiva'].rows
      : this.form.value['informacion_junta_directiva'];
    if (junta_directiva) {
      junta_directiva.forEach((row: any) => {
        info_users.push({
          ...row,
          document: row.document.document,
          f_document_type_id: row.document.type,
          verification_digit: row.document.verification,
          f_vendor_info_user_type_id: 3,
        });
      });
    }

    const info_accionistas = this.form.value['informacion_accionistas']?.rows
      ? this.form.value['informacion_accionistas'].rows
      : this.form.value['informacion_accionistas'];

    if (info_accionistas) {
      info_accionistas.forEach((row: any) => {
        info_users.push({
          ...row,
          document: row.document.document,
          f_document_type_id: row.document.type,
          verification_digit: row.document.verification,
          f_vendor_info_user_type_id: 4,
        });
      });
    }

    const info_beneficiarios_finales = this.form.value[
      'informacion_beneficiarios_finales'
    ]?.rows
      ? this.form.value['informacion_beneficiarios_finales'].rows
      : this.form.value['informacion_beneficiarios_finales'];
    if (info_beneficiarios_finales) {
      info_beneficiarios_finales.forEach((row: any) => {

        const people_final = row['informacion_beneficiarios_finales_people']
          .rows
          ? row['informacion_beneficiarios_finales_people'].rows
          : row['informacion_beneficiarios_finales_people'];

        if (people_final) {
          people_final.forEach((person: any) => {
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
        }
      });
    }

    const info_additional = [
      {
        vendor_inf_add_type_id: 5,
        value: this.form.value['conflicto_intereses'] == '1' ? true : null,
        description: this.form.value['desc_conflicto_intereses']
      },
      {
        vendor_inf_add_type_id: 6,
        value: this.form.value['vinculo_estatal'] == '1' ? true : null,
        description: this.form.value['desc_vinculo_estatal']
      },
      {
        vendor_inf_add_type_id: 7,
        value: this.form.value['vinculo_familiar_estatal'] == '1' ? true : null,
        description: this.form.value['desc_vinculo_familiar_estatal']
      },
      {
        vendor_inf_add_type_id: 8,
        value: this.form.value['servicios_actividades_prestados'] == '1' ? true : null,
      },
      {
        vendor_inf_add_type_id: 9,
        value: this.form.value['incluido_sat'] == '1' ? true : null,
      },
    ]



    const formData = {
      ...this.form.value,
      document: this.form.value['document'].document,
      verification_digit: this.form.value['document'].verification,
      f_document_type_id: this.form.value['document'].type
        ? Number(this.form.value['document'].type)
        : null,
      f_person_type_id: this.form.value.f_person_type_id
        ? Number(this.form.value.f_person_type_id)
        : null,
      f_vendor_economic_act_id: this.form.value.f_vendor_economic_act_id
        ? Number(this.form.value.f_vendor_economic_act_id)
        : null,
      f_vendor_type_id: this.form.value.f_vendor_type_id
        ? Number(this.form.value.f_vendor_type_id)
        : null,
      business_group: this.form.value.business_group == '1' ? true : null,
      board_of_directors: this.form.value.board_of_directors == '1' ? true : null,
      info_users,
      info_additional
    }

    return formData;
  }

  handleSubmit(action: string) {

    this.modalMessage = null;

    if(action == 'verify'){
      this.form.markAsDirty();
      Object.keys(this.form.controls).forEach( (key) => {
        const control = this.form.get(key);
        control?.markAsDirty();
        control?.updateValueAndValidity();
      })

      console.log(this.form)
     if(this.form.invalid){
      this.goToInputError();
      return;
     }

    }

    console.log('fired')

    const formData = this.prepareSubmitData();

    if(action == 'verify'){
      this.onVerify.emit(formData);
    }else{
      this.onSubmit.emit(formData);
    }

  }

  private goToInputError(){
    const bodyRect = document.body.getBoundingClientRect();
    const errorElement = document.querySelector('app-question.ng-invalid label');
    if(errorElement){
      const rect = errorElement.getBoundingClientRect();
      const offset   = rect.top - bodyRect.top;
      window.scrollTo(0, offset)
    }
  }

  private handleChangeFormValues(formControlName: string) {
    const value = this.form.value[formControlName];

    const handlers = {
      f_person_type_id: () => this.setTypeIdByTypePerson(value),
      informacion_accionistas: () => this.addFinalBeneficiaryByActionist(),
      business_group: () => this.setVisbleBussinesGroup(),
      board_of_directors: () => this.setVisbleJuntaDirectiva(),
      identificacion_oficial_file: () => this.uploadInputFile(value, formControlName),
      inscripcion_registro_fed_file: () => this.uploadInputFile(value, formControlName),
      cumplimiento_obligaciones_file: () => this.uploadInputFile(value, formControlName),
      acta_constitutiva_file: () => this.uploadInputFile(value, formControlName),
      estado_cuenta_bancaria_file: () => this.uploadInputFile(value, formControlName),
      comprobante_domicilio_file: () => this.uploadInputFile(value, formControlName),
      documento_politicas: () => this.uploadInputFile(value, formControlName),
      conflicto_intereses: () =>this.setValidationsDeclaraciones(),
      vinculo_estatal: () =>this.setValidationsDeclaraciones(),
      vinculo_familiar_estatal: () =>this.setValidationsDeclaraciones(),
      servicios_actividades_prestados: () =>this.setValidationsDeclaraciones(),
      incluido_sat: () =>this.setValidationsDeclaraciones(),
    };

    if (formControlName in handlers) {
      handlers[formControlName as keyof typeof handlers].call(this);
    }

  }

  private uploadInputFile(value: File, formControlName: string){
    const formData = this.prepareSubmitData();
    this.onFileSubmit.emit({formControlName, value, formData});
  }

  private setValidationsDeclaraciones(){

    const info_addtional_vendor = [
      'conflicto_intereses',
      'vinculo_estatal',
      'vinculo_familiar_estatal',
      'servicios_actividades_prestados',
      'incluido_sat',
    ]

      info_addtional_vendor.forEach( (input:any) => {
      const value = this.form.value[input];

      if(input){
        if(this.form.controls[`desc_${input}`]){
          if(value == '1'){
            this.form.controls[`desc_${input}`].setValidators(Validators.required);
            this.form.controls[`desc_${input}`].enable()
            this.setVisibleInput(`desc_${input}`, true, SECTIONS_MEXICO_FORM.DECLARACIONES)
          }else{
            this.form.controls[`desc_${input}`].removeValidators(Validators.required);
            this.form.controls[`desc_${input}`].disable()
            this.setVisibleInput(`desc_${input}`, false, SECTIONS_MEXICO_FORM.DECLARACIONES)
          }
        }

      }


    });

  }

  private setVisbleJuntaDirectiva(){
    const showJuntaDirectiva = this.form.value['board_of_directors'] == '1';

    this.setVisibleInput(
      'informacion_junta_directiva',
      showJuntaDirectiva,
      SECTIONS_MEXICO_FORM.INFORMACION_JUNTA_DIRECTIVA
    );

    this.junta_directiva.setValue([{}])


  }

  private setVisbleBussinesGroup(){
    const showBussiness = this.form.value['business_group'] == '1';

    this.setVisibleInput(
      'p_pertenece_grupo_empresarial',
      showBussiness,
      SECTIONS_MEXICO_FORM.INFORMACION_BASICA
    );

    this.setVisibleInput(
      'otras_empresas',
      showBussiness,
      SECTIONS_MEXICO_FORM.INFORMACION_BASICA
    );
  }

  private setTypeIdByTypePerson(typePerson: string) {
    const person_type = this.inmutableData.person_types.find(
      (item: any) => item.id == typePerson
    );

    const tipo_id = person_type
      ? person_type.document_types.map((item: any) =>
          this.setSelectBoxOptions(
            item,
            'f_person_type_id',
            'document_type_esp'
          )
        )
      : [];

    this.lists['tipo_id'] = tipo_id;

    this.updateList(
      'f_document_type_id',
      tipo_id,
      SECTIONS_MEXICO_FORM.INFORMACION_BASICA
    );

    this.setMoralSectionsVisible();
  }

  private setVendorMultipleInfo() {
    const vendor_info = this.inmutableData.vendor_info_user.forEach(
      (info_user: any) => {
        if (info_user.id == 1) {
          this.form.controls['otras_empresas'].setValue(
            info_user.user_person.map((user: any) => ({
              name: user.name,

              document: {
                document: user.document,
                type: user.f_document_type_id,
              },
              quantity: user.quantity,
              id: user.id,
            }))
          );
        }

        if (info_user.id == 2) {
          this.form.controls['informacion_representantes_legales'].setValue(
            info_user.user_person.map((user: any) => ({
              name: user.name,
              last_name: user.last_name,
              f_document_type_id: user.f_document_type_id,
              document: {
                document: user.document,
                type: user.f_document_type_id,
                verification: user.verification_digit,
              },
              expedition_date: user.expedition_date,
              country: user.country,
              department: user.department,
              city: user.city,
              email: user.email,
              id: user.id,
            }))
          );
        }

        if (info_user.id == 3) {
          this.form.controls['informacion_junta_directiva'].setValue(
            info_user.user_person.map((user: any) => ({
              name: user.name,
              last_name: user.last_name,
              f_document_type_id: user.f_document_type_id,
              document: {
                document: user.document,
                type: user.f_document_type_id,
                verification: user.verification_digit,
              },
              expedition_date: user.expedition_date,
              country: user.country,
              department: user.department,
              city: user.city,
              email: user.email,
              id: user.id,
            }))
          );
        }

        if (info_user.id == 4) {

          this.form.controls['informacion_accionistas'].setValue(
            info_user.user_person.map((user: any) => {
              const isMoral = Number(user.f_person_type_id) == TYPE_PERSON_MEXICO.Moral;
              return {
                f_person_type_id: user.f_person_type_id,
                name: user.name,
                percente_participation: user.percente_participation,
                f_document_type_id_list: isMoral ? this.lists.moral_id : this.lists.fisica_id,
                document: {
                  person: user.f_person_type_id,
                  document: user.document,
                  type: user.f_document_type_id,
                  verification: user.verification_digit,
                },
                verification_digit_visible: isMoral,
                expedition_date: user.expedition_date,
                country: user.country,
                id: user.id,

              }
            })
          );
        }
      }
    );
  }

  private setCheckboxInfo(){

    const info_addtional_vendor = {
      5: 'conflicto_intereses',
      6: 'vinculo_estatal',
      7: 'vinculo_familiar_estatal',
      8: 'servicios_actividades_prestados',
      9: 'incluido_sat',
    }

    this.inmutableData.info_addtional_vendor.forEach( (info_user:any) => {
      const value = info_user.value;
      const input = info_addtional_vendor[info_user.id as keyof typeof info_addtional_vendor]

      if(input){
        if(this.form.controls[`desc_${input}`]){
          this.form.controls[`desc_${input}`].setValue(info_user.description);
        }

        this.form.controls[input].setValue(value == true ? '1': '2');
      }

    });

  }

  private setComplementInfoFinalBenefit() {
    const informacion_accionistas = this.inmutableData.vendor_info_user.find(
      (info_user: any) => info_user.id == 4
    );

    if (informacion_accionistas && informacion_accionistas.user_person) {
      const info_final = informacion_accionistas.user_person.filter(
        (person: any) => {
          return (
            person.f_person_type_id == 4 && person.percente_participation >= 5
          );
        }
      );

      this.form.controls['informacion_beneficiarios_finales'].setValue(
        info_final.map((user: any) => ({
          id: user.id,
          document: user.document,
          f_document_type_id: user.f_document_type_id,
          name: user.name,
          informacion_beneficiarios_finales_people: user.childrent.map(
            (child: any) => ({
              f_person_type_id: child.f_person_type_id,
              name: child.name,
              document: {
                person: child.f_person_type_id,
                document: child.document,
                type: child.f_document_type_id,
                verification: child.verification_digit,
              },
              expedition_date: child.expedition_date,
              id: child.id,
            })
          ),
        }))
      );

    }
  }

  private addFinalBeneficiaryByActionist() {
    console.log('add final beneficiary')
  }

  /*
  private addFinalBeneficiaryByActionist() {

    const info_final = this.form.value['informacion_accionistas']?.rows ? this.form.value['informacion_accionistas'].rows.filter(
      (person: any) => {
        return (
          person.f_person_type_id == 4 && person.percente_participation >= 5
        );
      }
    ): [];

    if(info_final.length){
      this.form.get('informacion_beneficiarios_finales')?.setValidators(Validators.required)
    }else{
      this.form.get('informacion_beneficiarios_finales')?.removeValidators(Validators.required)
    }



    const currentValue = this.form.value['informacion_beneficiarios_finales']?.rows
    ? this.form.value['informacion_beneficiarios_finales'].rows
    : this.form.value['informacion_beneficiarios_finales'];

    this.form.controls['informacion_beneficiarios_finales'].setValue({
      rows: info_final.map((user: any) => {
        const exist = currentValue.find( (item:any) => item.id == user.id)
        return {
          id: exist ? exist.id : uuidv4(),
          document: user.document?.document ? user.document?.document: user.document,
          f_document_type_id: user.document?.type ? user.document?.type: user.f_document_type_id,
          name: user.name,
          informacion_beneficiarios_finales_people: exist ? exist.informacion_beneficiarios_finales_people : []
        }
      }),
    });

    this.form.get('informacion_beneficiarios_finales')?.updateValueAndValidity();



  }
  */

  private setFilesValues(){
    this.inmutableData['document_vendor'].forEach( (document:any) => {

      if(document.link == null || document.link == undefined){
        return;
      }

      const file = { name: document.link, url: document.link}

      Object.keys(info_files)
      .map((key: string) => {
        const file_key = info_files[key as unknown as keyof typeof info_files];

        if(document.id == Number(key)){
          this.form.get(file_key)?.setValue(file)
        }

      })
    })
  }

  private setMoralSectionsVisible() {
    const showMoralSections =
      Number(this.form.value['f_person_type_id']) ==
      TYPE_PERSON_MEXICO.Moral;
    const showFisicaSections =
      Number(this.form.value['f_person_type_id']) ==
      TYPE_PERSON_MEXICO.Fisica;

    this.setVisibleInput(
      'verification_digit',
      showMoralSections,
      SECTIONS_MEXICO_FORM.INFORMACION_BASICA
    );

    this.setVisibleInput(
      'otras_empresas',
      showMoralSections,
      SECTIONS_MEXICO_FORM.INFORMACION_BASICA
    );
    this.setVisibleInput(
      'business_group',
      showMoralSections,
      SECTIONS_MEXICO_FORM.INFORMACION_BASICA
    );
    this.setVisibleInput(
      'p_pertenece_grupo_empresarial',
      showMoralSections,
      SECTIONS_MEXICO_FORM.INFORMACION_BASICA
    );
    this.setVisibleInput(
      'cedula_file',
      showFisicaSections,
      SECTIONS_MEXICO_FORM.ANEXOS
    );
    this.setVisibleInput(
      'certificado_existencia_file',
      showMoralSections,
      SECTIONS_MEXICO_FORM.ANEXOS
    );
    this.setVisibleInput(
      'cedula_representante_legal_file',
      showMoralSections,
      SECTIONS_MEXICO_FORM.ANEXOS
    );

    this.setVisibleSection(
      showMoralSections,
      SECTIONS_MEXICO_FORM.INFORMACION_REPRESENTANTES_LEGALES
    );
    this.setVisibleSection(
      showMoralSections,
      SECTIONS_MEXICO_FORM.INFORMACION_JUNTA_DIRECTIVA
    );
    this.setVisibleSection(
      showMoralSections,
      SECTIONS_MEXICO_FORM.INFORMACION_ACCIONISTAS
    );
    this.setVisibleSection(
      showMoralSections,
      SECTIONS_MEXICO_FORM.INFORMACION_BENEFICIARIOS_FINALES
    );


  }

  private setVisibleInput(
    inputKey: string,
    visible: boolean,
    sectionKey: SECTIONS_MEXICO_FORM
  ) {
    const sectionIndex = this.mainForm.sections.findIndex(
      (section) => section.key == sectionKey
    );
    const section = this.mainForm.sections[sectionIndex];

    if (section) {
      const indexInput = section.inputs.findIndex(
        (input) => input.data == inputKey
      );
      const input = section.inputs[indexInput];

      if (input) {
        input.visible = visible;
        this.mainForm.sections[sectionIndex].inputs[indexInput] = { ...input };
      }
    }
  }

  private setVisibleSection(
    visible: boolean,
    sectionKey: SECTIONS_MEXICO_FORM
  ) {
    const sectionIndex = this.mainForm.sections.findIndex(
      (section) => section.key == sectionKey
    );
    const section = this.mainForm.sections[sectionIndex];

    if (section) {
      section.visible = visible;
      this.mainForm.sections[sectionIndex] = { ...section };
    }
  }

  private updateList(
    inputKey: string,
    newList: ISelectBoxOption[],
    sectionKey: SECTIONS_MEXICO_FORM
  ) {
    const sectionIndex = this.mainForm.sections.findIndex(
      (section) => section.key == sectionKey
    );
    const section = this.mainForm.sections[sectionIndex];

    if (section) {
      const indexInput = section.inputs.findIndex(
        (input) => input.data == inputKey
      );
      const input = section.inputs[indexInput];

      if (input) {
        input.options = newList;
        this.mainForm.sections[sectionIndex].inputs[indexInput] = { ...input };
      }
    }
  }

  private setSelectBoxOptions(item: any, key: string, value: string) {
    const option: ISelectBoxOption = {
      key: item[key],
      value: item[value],
    };
    return option;
  }
}
