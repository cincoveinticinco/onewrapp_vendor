import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { distinctUntilChanged, map, pairwise, startWith } from 'rxjs';
import { VendorsService } from 'src/app/services/vendors.service';
import {
  COLOMBIA_FORM,
  SECTIONS_COLOMBIA_FORM,
  TYPE_PERSON_COLOMBIA,
} from 'src/app/shared/forms/colombia_form';
import { IForm } from 'src/app/shared/interfaces/form';
import { ISelectBoxOption } from 'src/app/shared/interfaces/input_form';
import { info_files } from 'src/app/shared/forms/files_types';

@Component({
  selector: 'app-colombia-form',
  templateUrl: './colombia-form.component.html',
  styleUrls: ['./colombia-form.component.scss'],
})
export class ColombiaFormComponent {
  @Output() onSubmit = new EventEmitter();
  @Output() onVerify = new EventEmitter();
  @Output() onFileSubmit = new EventEmitter();
  @Input() infoVendor: any;

  readonly COLOMBIAN_FORM = COLOMBIA_FORM;
  mainForm: IForm = { description: '', sections: [] };
  loading: boolean = false;
  form: FormGroup;

  vendorData: any = {};
  vendorEconomicActivity: any[] = [];
  inmutableData: any = {};
  lists: any = {};

  valuesLoaded: boolean = false;

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
    this.mainForm = { ...COLOMBIA_FORM };

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

    this.setListForm(this.infoVendor);
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
    this.form.controls['pep'].setValue(this.vendorData['pep'] ? '1' : '2');

    this.setJuridicaSectionsVisible();
    this.setEconomyActivityByCIIU();
    this.setVendorMultipleInfo();
    this.setComplementInfoFinalBenefit();
    this.addPoliticianPeople(this.inmutableData['exposed_peoploes']);
    this.setCheckboxInfo();
    this.setVisbleBussinesGroup();
    this.setFilesValues();

    console.log(this.form.value);

    this.valuesLoaded = true;
  }

  setListForm(data: any) {
    const tipo_contraparte = data.vendor_types.map((item: any) =>
      this.setSelectBoxOptions(item, 'id', 'vendor_type')
    );

    const tipo_persona = data.person_types.map((item: any) =>
      this.setSelectBoxOptions(item, 'id', 'person_type_esp')
    );

    const juridica_tipo_id = data.person_types.find(
      (item: any) => item.id == TYPE_PERSON_COLOMBIA.Juridica
    );
    const juridica_id = juridica_tipo_id
      ? juridica_tipo_id.document_types.map((item: any) =>
          this.setSelectBoxOptions(item, 'id', 'document_type_esp')
        )
      : [];

    const natural_tipo_id = data.person_types.find(
      (item: any) => item.id == TYPE_PERSON_COLOMBIA.Natural
    );
    const natural_id = natural_tipo_id
      ? natural_tipo_id.document_types.map((item: any) =>
          this.setSelectBoxOptions(item, 'id', 'document_type_esp')
        )
      : [];

    const todos_tipo_id = [...natural_id, ...juridica_id];
    const tipo_id =
      this.vendorData.f_person_type_id == TYPE_PERSON_COLOMBIA.Juridica
        ? juridica_id
        : natural_id;

    const ciiu = data.vendor_economic_activitis.map((item: any) =>
      this.setSelectBoxOptions(item, 'id', 'ciiu')
    );

    const verification_digit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => ({
      key: value,
      value,
    }));
    this.vendorEconomicActivity = [...data.vendor_economic_activitis];

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
      natural_id,
      juridica_id,
      todos_tipo_id,
      ciiu,
      verification_digit,
      calidad,
      parentesco,
    };
  }

  buildForm() {
    const fields_group: any = {
      'verify': ['']
    };

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
      });


    this.accionistas.valueChanges
      .pipe(
        startWith(this.form.value),
        pairwise(),
        distinctUntilChanged(),
      ).subscribe( ([oldValues, newValue]:any) => {

      if(!newValue) return;

      const rowsArray = newValue.rows ? newValue.rows : newValue;
      rowsArray.forEach( (row:any, index:number) => {
        const isJuridica = Number(row['f_person_type_id']) == TYPE_PERSON_COLOMBIA.Juridica;

        row['verification_digit_visible'] = isJuridica;
        row['informacion_accionistas_pep_visible'] = !isJuridica;
        row['f_document_type_id_list'] = isJuridica ? this.lists.juridica_id : this.lists.natural_id;

        const oldRowsArray = oldValues && oldValues.rows ? oldValues.rows : oldValues;
        if(oldRowsArray && oldRowsArray[index]){


          if(oldRowsArray[index]['f_document_type_id'] != null && row['f_document_type_id'] != oldRowsArray[index]['f_document_type_id']){
            row['f_document_type_id'] = null;
          }
        }
      });
    });

    this.beneficiarios_finales.valueChanges
      .pipe(
        startWith(this.beneficiarios_finales.value),
        pairwise(),
        distinctUntilChanged(),
      ).subscribe( ([oldValues, newValue]:any) => {



      if(!newValue) return;

      const _newValue = newValue.rows ? newValue.rows : newValue;
      _newValue.forEach( (newRowValue:any, indexRow: number) => {

        const people_row = newRowValue.informacion_beneficiarios_finales_people
        const rowsArray = people_row.rows ? people_row.rows : people_row;

        rowsArray.forEach( (row:any, index:number) => {
          const isJuridica = Number(row['f_person_type_id']) == TYPE_PERSON_COLOMBIA.Juridica;

          row['verification_digit_visible'] = isJuridica;
          row['info_beneficiarios_persona_pep_visible'] = !isJuridica;
          row['f_document_type_id_list'] = isJuridica ? this.lists.juridica_id : this.lists.natural_id;
         });
      });


    })

  }

  handleSubmit(action: string) {
    const info_users: any = [];

    const otras_empresas = this.form.value['otras_empresas'].rows
      ? this.form.value['otras_empresas'].rows
      : this.form.value['otras_empresas'];
    if (otras_empresas) {
      otras_empresas.forEach((row: any) => {
        info_users.push({
          ...row,
          f_vendor_info_user_type_id: 1,
        });
      });
    }

    const representantes_legales = this.form.value[
      'informacion_representantes_legales'
    ].rows
      ? this.form.value['informacion_representantes_legales'].rows
      : this.form.value['informacion_representantes_legales'];
    if (representantes_legales) {
      representantes_legales.forEach((row: any) => {
        info_users.push({
          ...row,
          pep: row.informacion_representantes_legales_pep == '1' ? true : null,
          f_vendor_info_user_type_id: 2,
        });
      });
    }

    const junta_directiva = this.form.value['informacion_junta_directiva'].rows
      ? this.form.value['informacion_junta_directiva'].rows
      : this.form.value['informacion_junta_directiva'];
    if (junta_directiva) {
      junta_directiva.forEach((row: any) => {
        info_users.push({
          ...row,
          pep: row.informacion_junta_directiva_pep == '1' ? true : null,
          f_vendor_info_user_type_id: 3,
        });
      });
    }

    const info_accionistas = this.form.value['informacion_accionistas'].rows
      ? this.form.value['informacion_accionistas'].rows
      : this.form.value['informacion_accionistas'];

      console.log(info_accionistas)

    if (info_accionistas) {
      info_accionistas.forEach((row: any) => {
        info_users.push({
          ...row,
          pep: row.informacion_accionistas_pep == '1' ? true : null,
          f_vendor_info_user_type_id: 4,
        });
      });
    }

    const info_beneficiarios_finales = this.form.value[
      'informacion_beneficiarios_finales'
    ].rows
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
            });
          });
        }
      });
    }

    const exposed_peoploe = this.personas_expuestas.value.rows.map(
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
        return {
          document_parent,
          f_document_parent_type_id,
          entity,
          position,
          binding_date,
          termination_date,
          people_relationships: people_relationships ? (people_relationships.rows ? people_relationships.rows : people_relationships) : [],
        };
      }
    );

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
    ]


    const formData = {
      ...this.form.value,
      f_document_type_id: this.form.value.f_document_type_id
        ? Number(this.form.value.f_document_type_id)
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
      pep: this.form.value.pep == '1' ? true : null,
      info_users,
      exposed_peoploe,
      info_additional
    }


    if(action == 'verify'){
      this.onVerify.emit(formData);
    }else{
      this.onSubmit.emit(formData);
    }

  }

  private handleChangeFormValues(formControlName: string) {
    const value = this.form.value[formControlName];



    const handlers = {
      f_person_type_id: () => this.setTypeIdByTypePerson(value),
      f_vendor_economic_act_id: () => this.setEconomyActivityByCIIU(),
      informacion_accionistas: () => this.addFinalBeneficiaryByActionist(),
      informacion_junta_directiva: () => this.addPoliticianPeople(),
      informacion_representantes_legales: () => this.addPoliticianPeople(),
      informacion_beneficiarios_finales: () => this.addPoliticianPeople(),
      business_group: () => this.setVisbleBussinesGroup(),
      pep: () => this.addPoliticianPeople(),
      cedula_file: () => this.uploadInputFile(value, formControlName),
      certificado_existencia_file: () => this.uploadInputFile(value, formControlName),
      cedula_representante_legal_file: () => this.uploadInputFile(value, formControlName),
      rut_file: () => this.uploadInputFile(value, formControlName),
      certificacion_bancaria_file: () => this.uploadInputFile(value, formControlName),
      documento_politicas: () => this.uploadInputFile(value, formControlName),

    };

    if (formControlName in handlers) {
      handlers[formControlName as keyof typeof handlers].call(this);
    }
  }

  private uploadInputFile(value: File, formControlName: string){
    this.onFileSubmit.emit({formControlName, value});
  }

  private setVisbleBussinesGroup(){
    const showBussiness = this.form.value['business_group'] == '1';

    this.setVisibleInput(
      'p_pertenece_grupo_empresarial',
      showBussiness,
      SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA
    );

    this.setVisibleInput(
      'otras_empresas',
      showBussiness,
      SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA
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
      SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA
    );

    this.setJuridicaSectionsVisible();
  }

  private setVendorMultipleInfo() {
    const vendor_info = this.inmutableData.vendor_info_user.forEach(
      (info_user: any) => {
        if (info_user.id == 1) {
          this.form.controls['otras_empresas'].setValue(
            info_user.user_person.map((user: any) => ({
              name: user.name,
              f_document_type_id: user.f_document_type_id,
              document: user.document,
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
              document: user.document,
              expedition_date: user.expedition_date,
              country: user.country,
              department: user.department,
              city: user.city,
              email: user.email,
              informacion_representantes_legales_pep:
                user.pep == true ? '1' : '2',
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
              document: user.document,
              expedition_date: user.expedition_date,
              country: user.country,
              department: user.department,
              city: user.city,
              email: user.email,
              informacion_junta_directiva_pep: user.pep == true ? '1' : '2',
              id: user.id,
            }))
          );
        }

        if (info_user.id == 4) {

          this.form.controls['informacion_accionistas'].setValue(
            info_user.user_person.map((user: any) => {
              const isJuridica = Number(user.f_person_type_id) == TYPE_PERSON_COLOMBIA.Juridica;
              return {
                f_person_type_id: user.f_person_type_id,
                name: user.name,
                percente_participation: user.percente_participation,
                f_document_type_id: user.f_document_type_id,
                f_document_type_id_list: isJuridica ? this.lists.juridica_id : this.lists.natural_id,
                document: user.document,
                verification_digit: user.verification_digit,
                verification_digit_visible: isJuridica,
                expedition_date: user.expedition_date,
                country: user.country,
                informacion_accionistas_pep_visible: !isJuridica,
                informacion_accionistas_pep: user.pep == true ? '1' : '2',
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
    }

    this.inmutableData.info_addtional_vendor.forEach( (info_user:any) => {
      const value = info_user.value;
      const input = info_addtional_vendor[info_user.id as keyof typeof info_addtional_vendor]

      if(input){
        this.form.controls[`desc_${input}`].setValue(info_user.description);
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
            person.f_person_type_id == 2 && person.percente_participation >= 5
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
              f_document_type_id: child.f_document_type_id,
              document: child.document,
              verification_digit: child.verification_digit,
              expedition_date: child.expedition_date,
              info_beneficiarios_persona_pep: child.pep == true ? '1' : '2',
              id: child.id,
            })
          ),
        }))
      );

      /*const info_beneficiarios_finales_section = this.mainForm.sections.find( section => section.key == SECTIONS_COLOMBIA_FORM.INFORMACION_BENEFICIARIOS_FINALES )
                  if(info_beneficiarios_finales_section){
                    const group_array = info_beneficiarios_finales_section.inputs.find( input => input.data == 'informacion_beneficiarios_finales')
                    if(group_array){
                      group_array.startEmpty = false
                    }
                  }*/
    }
  }

  private addPoliticianPeople(initValues = []) {

    const people: any = [];
    const current_people =
      (this.personas_expuestas.value && this.personas_expuestas.value.rows
        ? this.personas_expuestas.value.rows
        : this.personas_expuestas.value) || [];

    if (
      this.form.value['pep'] == '1' &&
      this.form.value['document'] &&
      this.form.value['f_document_type_id']
    ) {
      people.push({
        parent_id: 1,
        id: uuidv4(),
        document_parent: this.form.value.document,
        name_parent: this.form.value.name,
        f_document_parent_type_id: this.form.value.f_document_type_id,
      });
    }

    const informacion_representantes_legales = this.form.value[
      'informacion_representantes_legales'
    ].rows
      ? this.form.value['informacion_representantes_legales'].rows
      : this.form.value['informacion_representantes_legales'];
    if (informacion_representantes_legales) {
      informacion_representantes_legales.forEach((item: any) => {
        if (
          item['informacion_representantes_legales_pep'] == '1' &&
          item['document'] &&
          item['f_document_type_id']
        ) {
          people.push({
            id: uuidv4(),
            parent_id: 2,
            document_parent: item['document'],
            f_document_parent_type_id: item['f_document_type_id'],
            name_parent: item['name'],
            people_relationships: []
          });
        }
      });
    }

    const informacion_junta_directiva = this.form.value[
      'informacion_junta_directiva'
    ].rows
      ? this.form.value['informacion_junta_directiva'].rows
      : this.form.value['informacion_junta_directiva'];
    if (informacion_junta_directiva) {
      informacion_junta_directiva.forEach((item: any) => {
        if (
          item['informacion_junta_directiva_pep'] == '1' &&
          item['document'] &&
          item['f_document_type_id']
        ) {
          people.push({
            id: uuidv4(),
            parent_id: 3,
            document_parent: item['document'],
            f_document_parent_type_id: item['f_document_type_id'],
            name_parent: item['name'],
            people_relationships: []
          });
        }
      });
    }

    const informacion_accionistas = this.form.value['informacion_accionistas']
      .rows
      ? this.form.value['informacion_accionistas'].rows
      : this.form.value['informacion_accionistas'];
    if (informacion_accionistas) {
      informacion_accionistas.forEach((item: any) => {
        if (
          item['informacion_accionistas_pep'] == '1' &&
          item['document'] &&
          item['f_document_type_id']
        ) {
          people.push({
            id: uuidv4(),
            parent_id: 4,
            document_parent: item['document'],
            f_document_parent_type_id: item['f_document_type_id'],
            name_parent: item['name'],
            people_relationships: []
          });
        }
      });
    }

    const informacion_beneficiarios_finales = this.form.value[
      'informacion_beneficiarios_finales'
    ].rows
      ? this.form.value['informacion_beneficiarios_finales'].rows
      : this.form.value['informacion_beneficiarios_finales'];
    if (informacion_beneficiarios_finales) {
      informacion_beneficiarios_finales.forEach((element: any) => {
        const informacion_beneficiarios_finales_people = element[
          'informacion_beneficiarios_finales_people'
        ].rows
          ? element['informacion_beneficiarios_finales_people'].rows
          : element['informacion_beneficiarios_finales_people'];
        informacion_beneficiarios_finales_people.forEach((item: any) => {
          if (
            item['info_beneficiarios_persona_pep'] == '1' &&
            item['document'] &&
            item['f_document_type_id']
          ) {
            people.push({
              id: uuidv4(),
              parent_id: 6,
              document_parent: item['document'],
              f_document_parent_type_id: item['f_document_type_id'],
              name_parent: item['name'],
              people_relationships: []
            });
          }
        });
      });
    }

    if (!people.length) {
      this.personas_expuestas.setValue({ rows: [] });
      return;
    }

    const sort_people = people.sort(
      (a: any, b: any) => a.parent_id - b.parent_id
    );

    if (!current_people.length) {

      this.personas_expuestas.setValue({ rows: sort_people.map( (person: any) => {
        const value:any = initValues.find( (initVal:any) => initVal.document_parent == person.document_parent && initVal.f_document_parent_type_id == person.f_document_parent_type_id)
        if(value){
          return {...person, ...value}
        }
        return person;
      }) });
      return;
    }

    const remove_people = current_people.filter((current: any) => {
      return !sort_people.find(
        (person: any) =>
          current.document_parent == person.document_parent &&
          current.f_document_parent_type_id == person.f_document_parent_type_id
      );
    });

    if (remove_people.length) {
      const modify_people = current_people.filter((current: any) => {
        return !remove_people.find(
          (person: any) =>
            current.document_parent == person.document_parent &&
            current.f_document_parent_type_id ==
              person.f_document_parent_type_id
        );
      });

      this.personas_expuestas.setValue({ rows: [...modify_people] });
      return;
    }

    const new_people = sort_people.filter((person: any) => {
      return !current_people.find(
        (current: any) =>
          current.document_parent == person.document_parent &&
          current.f_document_parent_type_id == person.f_document_parent_type_id
      );
    });

    if (new_people.length) {
      this.personas_expuestas.setValue({
        rows: [...current_people, ...new_people],
      });
      return;
    }
  }

  private addFinalBeneficiaryByActionist() {


    const info_final = this.form.value['informacion_accionistas'].rows.filter(
      (person: any) => {
        return (
          person.f_person_type_id == 2 && person.percente_participation >= 5
        );
      }
    );

    const currentValue = this.form.value['informacion_beneficiarios_finales']
      .rows
      ? this.form.value['informacion_beneficiarios_finales'].rows
      : this.form.value['informacion_beneficiarios_finales'];


    this.form.controls['informacion_beneficiarios_finales'].setValue({
      rows: info_final.map((user: any) => ({
        id: 999,
        document: user.document,
        f_document_type_id: user.f_document_type_id,
        name: user.name,
        informacion_beneficiarios_finales_people: [],
      })),
    });
  }

  private setEconomyActivityByCIIU() {
    const economyActivity = this.vendorEconomicActivity.find(
      (item) => item.id == this.form.value['f_vendor_economic_act_id']
    );
    if (economyActivity) {
      this.form.controls['actividad_economica'].setValue(
        economyActivity.economic_activity
      );
    }
  }

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


  private setJuridicaSectionsVisible() {
    const showJuridicaSections =
      Number(this.form.value['f_person_type_id']) ==
      TYPE_PERSON_COLOMBIA.Juridica;
    const showNaturalSections =
      Number(this.form.value['f_person_type_id']) ==
      TYPE_PERSON_COLOMBIA.Natural;

    this.setVisibleInput(
      'verification_digit',
      showJuridicaSections,
      SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA
    );

    this.setVisibleInput(
      'otras_empresas',
      showJuridicaSections,
      SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA
    );
    this.setVisibleInput(
      'business_group',
      showJuridicaSections,
      SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA
    );
    this.setVisibleInput(
      'p_pertenece_grupo_empresarial',
      showJuridicaSections,
      SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA
    );
    this.setVisibleInput(
      'pep',
      showNaturalSections,
      SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA
    );

    this.setVisibleInput(
      'cedula_file',
      showNaturalSections,
      SECTIONS_COLOMBIA_FORM.ANEXOS
    );
    this.setVisibleInput(
      'certificado_existencia_file',
      showJuridicaSections,
      SECTIONS_COLOMBIA_FORM.ANEXOS
    );
    this.setVisibleInput(
      'cedula_representante_legal_file',
      showJuridicaSections,
      SECTIONS_COLOMBIA_FORM.ANEXOS
    );

    this.setVisibleSection(
      showJuridicaSections,
      SECTIONS_COLOMBIA_FORM.INFORMACION_REPRESENTANTES_LEGALES
    );
    this.setVisibleSection(
      showJuridicaSections,
      SECTIONS_COLOMBIA_FORM.INFORMACION_JUNTA_DIRECTIVA
    );
    this.setVisibleSection(
      showJuridicaSections,
      SECTIONS_COLOMBIA_FORM.INFORMACION_ACCIONISTAS
    );
    this.setVisibleSection(
      showJuridicaSections,
      SECTIONS_COLOMBIA_FORM.INFORMACION_BENEFICIARIOS_FINALES
    );
  }

  private setVisibleInput(
    inputKey: string,
    visible: boolean,
    sectionKey: SECTIONS_COLOMBIA_FORM
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
    sectionKey: SECTIONS_COLOMBIA_FORM
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
    sectionKey: SECTIONS_COLOMBIA_FORM
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
