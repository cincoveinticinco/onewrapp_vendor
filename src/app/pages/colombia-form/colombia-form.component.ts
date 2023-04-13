import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { map, pairwise, startWith } from 'rxjs';
import { VendorsService } from 'src/app/services/vendors.service';
import { COLOMBIA_FORM, SECTIONS_COLOMBIA_FORM, TYPE_PERSON_COLOMBIA } from 'src/app/shared/forms/colombia_form';
import { IForm } from 'src/app/shared/interfaces/form';
import { ISelectBoxOption } from 'src/app/shared/interfaces/input_form';

@Component({
  selector: 'app-colombia-form',
  templateUrl: './colombia-form.component.html',
  styleUrls: ['./colombia-form.component.scss']
})
export class ColombiaFormComponent {

  @Output() onSubmit = new EventEmitter();
  @Input() infoVendor: any;

  readonly COLOMBIAN_FORM = COLOMBIA_FORM;
  mainForm: IForm = {description: '', sections: []};
  loading: boolean = false;
  form: FormGroup;

  vendorData: any = { };
  vendorEconomicActivity: any[] = []
  inmutableData: any = {};
  lists:any = { };

  valuesLoaded: boolean = false;

  constructor(private _fB: FormBuilder, private vendorService: VendorsService){
    this.form = this._fB.group({})
  }

  ngOnInit(): void {

    this.mainForm = {...COLOMBIA_FORM}

    if(!this.infoVendor) return;

    this.inmutableData = {...this.infoVendor};

    this.vendorData = {
      ...this.infoVendor.vendor,
      tipo_solicitud: 'Vinculación',
      created_at: moment(this.infoVendor.vendor.created_at).format('YYYY-MM-DD'),
      expedition_date: this.infoVendor.vendor.expedition_date ? moment(this.infoVendor.vendor.expedition_date).format('YYYY-MM-DD'): null
    };

    this.setListForm(this.infoVendor);
    this.buildForm();
    this.setValuesForm();

    this.loading = false;
  }

  setValuesForm(){
    Object.keys(this.form.controls).forEach( key => {
      const control = this.form.controls[key];
      control.setValue(this.vendorData[key]);
    });

    this.form.controls['business_group'].setValue(this.vendorData['business_group'] ? '1' : '2');

    this.setJuridicaSectionsVisible();
    this.setEconomyActivityByCIIU();
    this.setVendorMultipleInfo();

    console.log(this.form.value)

    this.valuesLoaded = true;


  }

  setListForm(data: any){

    const tipo_contraparte = data.vendor_types.map( (item:any) =>
    this.setSelectBoxOptions(item, 'id', 'vendor_type')
    );

    const tipo_persona = data.person_types.map( (item:any) =>
    this.setSelectBoxOptions(item, 'id', 'person_type_esp')
    );

    const juridica_tipo_id = data.person_types.find( (item:any) => item.id == TYPE_PERSON_COLOMBIA.Juridica);
    const juridica_id = juridica_tipo_id ? juridica_tipo_id.document_types.map( (item:any) =>
    this.setSelectBoxOptions(item, 'f_person_type_id', 'document_type_esp')
    ) : []

    const natural_tipo_id = data.person_types.find( (item:any) => item.id == TYPE_PERSON_COLOMBIA.Natural)
    const natural_id = natural_tipo_id ? natural_tipo_id.document_types.map( (item:any) =>
    this.setSelectBoxOptions(item, 'f_person_type_id', 'document_type_esp')
    ) : []

    const todos_tipo_id = [...natural_id, ...juridica_id]
    const tipo_id = this.vendorData.f_person_type_id == TYPE_PERSON_COLOMBIA.Juridica ? juridica_id : natural_id;

    const ciiu = data.vendor_economic_activitis.map( (item:any) =>
    this.setSelectBoxOptions(item, 'id', 'ciiu')
    );

    const verification_digit = [0,1,2,3,4,5,6,7,8,9].map( value => ({key: value, value}));
    this.vendorEconomicActivity = [...data.vendor_economic_activitis];

    const calidad = [{key: 1, value: 'Matriz'}, {key: 2, value: 'Filial'}, {key: 3, value: 'Subsidiaria'}]


    this.lists = {
      tipo_contraparte,
      tipo_persona,
      tipo_id,
      natural_id,
      juridica_id,
      todos_tipo_id,
      ciiu,
      verification_digit,
      calidad
    }

  }

  buildForm(){

    const fields_group: any = {}

    this.mainForm.sections.forEach( (section) => {
      section.inputs.
      forEach( (input) => {

        if(input.data){
          fields_group[input.data] = ['']
        }

        if(input.options_key){
          input.options = this.lists[input.options_key]
        }

        if(input.children && input.children.length){
          input.children.forEach( inputChild => {
            if(inputChild.options_key){
              inputChild.options = this.lists[inputChild.options_key]
            }
          });
        }
      })
    });

    this.form = this._fB.group(fields_group)

    this.form.valueChanges.pipe(
      startWith(this.form.value),
      pairwise(),
      map(([oldValues, newValues]: any) => {
        return Object.keys(newValues).find(k => newValues[k] != oldValues[k]);
      })
      ).subscribe( formControlName => {
        if(this.valuesLoaded && formControlName){
          this.handleChangeFormValues(formControlName);
        }

      });
    }

    handleSubmit(){

      const info_users:any = [];

      const otras_empresas = this.form.value['otras_empresas'].rows ? this.form.value['otras_empresas'].rows : this.form.value['otras_empresas']
      if(otras_empresas){
        otras_empresas.forEach( (row:any) => {
          info_users.push({
            ...row,
            f_vendor_info_user_type_id: 1
          })
        });
      }

      const representantes_legales = this.form.value['informacion_representantes_legales'].rows ? this.form.value['informacion_representantes_legales'].rows : this.form.value['informacion_representantes_legales']
      if(representantes_legales){
        representantes_legales.forEach( (row:any) => {
          info_users.push({
            ...row,
            informacion_representantes_legales_pep: row.pep,
            f_vendor_info_user_type_id: 2
          })
        });
      }

      const junta_directiva = this.form.value['informacion_junta_directiva'].rows ? this.form.value['informacion_junta_directiva'].rows : this.form.value['informacion_junta_directiva']
      if(junta_directiva){
        junta_directiva.forEach( (row:any) => {
          info_users.push({
            ...row,
            informacion_junta_directiva_pep: row.pep,
            f_vendor_info_user_type_id: 3
          })
        });
      }

      const info_accionistas = this.form.value['informacion_accionistas'].rows ? this.form.value['informacion_accionistas'].rows : this.form.value['informacion_accionistas']
      if(info_accionistas){
        info_accionistas.forEach( (row:any) => {
          info_users.push({
            ...row,
            informacion_accionistas_pep: row.pep,
            f_vendor_info_user_type_id: 4
          })
        });
      }


      this.onSubmit.emit({
        ...this.form.value,
        f_document_type_id: Number(this.form.value.f_document_type_id),
        f_person_type_id: Number(this.form.value.f_person_type_id),
        f_vendor_economic_act_id: Number(this.form.value.f_vendor_economic_act_id),
        f_vendor_type_id: Number(this.form.value.f_vendor_type_id),
        business_group: this.form.value.business_group == '1' ? true : null,
        info_users

      });
    }

    private handleChangeFormValues(formControlName: string){

      const value = this.form.value[formControlName]

      const handlers = {
        'f_person_type_id': () => this.setTypeIdByTypePerson(value),
        'f_vendor_economic_act_id': () => this.setEconomyActivityByCIIU()
      }

      if( formControlName in handlers ){
        handlers[formControlName as keyof typeof handlers].call(this)
      }

    }

    private setTypeIdByTypePerson(typePerson: string){

      const person_type = this.inmutableData.person_types.find( (item:any) => item.id == typePerson);

      const tipo_id = person_type ? person_type.document_types.map( (item:any) =>
      this.setSelectBoxOptions(item, 'f_person_type_id', 'document_type_esp')
      ) : []

      this.lists['tipo_id'] = tipo_id;

      this.updateList('f_document_type_id', tipo_id, SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA);

      this.setJuridicaSectionsVisible();

    }

    private setVendorMultipleInfo(){
      const vendor_info = this.inmutableData.vendor_info_user.forEach( (info_user:any) => {
        if(info_user.id == 1){
          this.form.controls['otras_empresas'].setValue(
            info_user.user_person.map( (user:any) => ({
              name: user.name,
              f_document_type_id: user.f_document_type_id,
              document: user.document,
              quantity: user.quantity,
              id: user.id
            }))
          )
        }

        if(info_user.id == 2){
          this.form.controls['informacion_representantes_legales'].setValue(
            info_user.user_person.map( (user:any) => ({
              name: user.name,
              last_name: user.last_name,
              f_document_type_id: user.f_document_type_id,
              document: user.document,
              expedition_date: user.expedition_date,
              country: user.country,
              department: user.department,
              city: user.city,
              email: user.email,
              informacion_representantes_legales_pep: user.pep == true ? '1' : '2',
              id: user.id
            }))
          )
        }

        if(info_user.id == 3){
          this.form.controls['informacion_junta_directiva'].setValue(
            info_user.user_person.map( (user:any) => ({
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
              id: user.id
            }))
          )
        }

        if(info_user.id == 4){
          this.form.controls['informacion_accionistas'].setValue(
            info_user.user_person.map( (user:any) => ({
              f_person_type_id: user.f_person_type_id,
              name: user.name,
              percente_participation: user.percente_participation,
              f_document_type_id: user.f_document_type_id,
              document: user.document,
              verification_digit: user.verification_digit,
              expedition_date: user.expedition_date,
              country: user.country,
              informacion_accionistas_pep: user.pep == true ? '1' : '2',
              id: user.id
            }))
          )
        }

      })
    }


    private setCheckboxInfo(){
      this.inmutableData.vendor_info_user.forEach( (info_user:any) => {

      });
    }

    private setEconomyActivityByCIIU(){
      const economyActivity = this.vendorEconomicActivity.find( item => item.id == this.form.value['f_vendor_economic_act_id'])
      if(economyActivity){
        this.form.controls['actividad_economica'].setValue(economyActivity.economic_activity)
      }
    }

    private setJuridicaSectionsVisible(){
      const showJuridicaSections = (Number(this.form.value['f_person_type_id']) == TYPE_PERSON_COLOMBIA.Juridica);
      const showNaturalSections = (Number(this.form.value['f_person_type_id']) == TYPE_PERSON_COLOMBIA.Natural);

      this.setVisibleInput('otras_empresas', showJuridicaSections, SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA);
      this.setVisibleInput('business_group', showJuridicaSections, SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA);
      this.setVisibleInput('p_pertenece_grupo_empresarial', showJuridicaSections, SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA);

      this.setVisibleInput('cedula_file', showNaturalSections, SECTIONS_COLOMBIA_FORM.ANEXOS);
      this.setVisibleInput('certificado_existencia_file', showJuridicaSections, SECTIONS_COLOMBIA_FORM.ANEXOS);
      this.setVisibleInput('cedula_representante_legal_file', showJuridicaSections, SECTIONS_COLOMBIA_FORM.ANEXOS);

      this.setVisibleSection(showJuridicaSections, SECTIONS_COLOMBIA_FORM.INFORMACION_REPRESENTANTES_LEGALES);
      this.setVisibleSection(showJuridicaSections, SECTIONS_COLOMBIA_FORM.INFORMACION_JUNTA_DIRECTIVA);
      this.setVisibleSection(showJuridicaSections, SECTIONS_COLOMBIA_FORM.INFORMACION_ACCIONISTAS);
      this.setVisibleSection(showJuridicaSections, SECTIONS_COLOMBIA_FORM.INFORMACION_BENEFICIARIOS_FINALES);


    }

    private setVisibleInput(inputKey: string, visible: boolean, sectionKey: SECTIONS_COLOMBIA_FORM ){
      const sectionIndex = this.mainForm.sections.findIndex( section => section.key == sectionKey)
      const section = this.mainForm.sections[sectionIndex]

      if(section){
        const indexInput = section.inputs.findIndex( input => input.data == inputKey)
        const input = section.inputs[indexInput]

        if(input){
          input.visible = visible;
          this.mainForm.sections[sectionIndex].inputs[indexInput] = {...input}
        }
      }
    }

    private setVisibleSection(visible: boolean, sectionKey: SECTIONS_COLOMBIA_FORM ){
      const sectionIndex = this.mainForm.sections.findIndex( section => section.key == sectionKey)
      const section = this.mainForm.sections[sectionIndex]

      if(section){

        section.visible = visible
        this.mainForm.sections[sectionIndex] = {...section}
      }
    }

    private updateList(inputKey: string, newList: ISelectBoxOption[], sectionKey: SECTIONS_COLOMBIA_FORM ){

      const sectionIndex = this.mainForm.sections.findIndex( section => section.key == sectionKey)
      const section = this.mainForm.sections[sectionIndex]

      if(section){
        const indexInput = section.inputs.findIndex( input => input.data == inputKey)
        const input = section.inputs[indexInput]

        if(input){
          input.options = newList;
          this.mainForm.sections[sectionIndex].inputs[indexInput] = {...input}
        }
      }
    }

    private setSelectBoxOptions(item: any, key: string, value: string){
      const option: ISelectBoxOption = {
        key: item[key],
        value: item[value]
      }
      return option;
    }


  }
