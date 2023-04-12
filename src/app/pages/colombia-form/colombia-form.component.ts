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

  @Output() submit = new EventEmitter();
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
      expedition_date: moment(this.infoVendor.vendor.expedition_date).format('YYYY-MM-DD')
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

    this.setJuridicaSectionsVisible();

    this.valuesLoaded = true;
  }

  setListForm(data: any){

    const tipo_contraparte = data.vendor_types.map( (item:any) =>
    this.setSelectBoxOptions(item, 'id', 'vendor_type')
    );

    const tipo_persona = data.person_types.map( (item:any) =>
    this.setSelectBoxOptions(item, 'id', 'person_type_esp')
    );

    const person_type = data.person_types.find( (item:any) => item.id == this.vendorData.tipo_persona);
    const tipo_id = person_type ? person_type.document_types.map( (item:any) =>
    this.setSelectBoxOptions(item, 'f_person_type_id', 'document_type_esp')
    ) : []

    const ciiu = data.vendor_economic_activitis.map( (item:any) =>
    this.setSelectBoxOptions(item, 'id', 'ciiu')
    );

    const verification_digit = [0,1,2,3,4,5,6,7,8,9].map( value => ({key: value, value}));

    this.vendorEconomicActivity = [...data.vendor_economic_activitis];

    this.lists = {
      tipo_contraparte,
      tipo_persona,
      tipo_id,
      ciiu,
      verification_digit
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
      this.submit.emit(this.form.value);
    }

    private handleChangeFormValues(formControlName: string){

      const value = this.form.value[formControlName]

      const handlers = {
        'tipo_persona': () => this.setTypeIdByTypePerson(value),
        'ciiu': () => this.setEconomyActivityByCIIU()
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

    private setEconomyActivityByCIIU(){
      const economyActivity = this.vendorEconomicActivity.find( item => item.id == this.form.value['ciiu'])
      if(economyActivity){
        this.form.controls['actividad_economica'].setValue(economyActivity.economic_activity)
      }
    }

    private setJuridicaSectionsVisible(){
      const showJuridicaSections = (Number(this.form.value['tipo_persona']) == TYPE_PERSON_COLOMBIA.Juridica);
      const showNaturalSections = (Number(this.form.value['tipo_persona']) == TYPE_PERSON_COLOMBIA.Natural);

      this.setVisibleInput('otras_empresas', showJuridicaSections, SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA);
      this.setVisibleInput('pertenece_grupo_empresarial', showJuridicaSections, SECTIONS_COLOMBIA_FORM.INFORMACION_BASICA);
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
