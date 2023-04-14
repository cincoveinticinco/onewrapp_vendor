import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { startWith, pairwise, map } from 'rxjs';
import { VendorsService } from 'src/app/services/vendors.service';
import { REPSE_FORM, SECTIONS_REPSE_FORM } from 'src/app/shared/forms/repse_form';
import { IForm } from 'src/app/shared/interfaces/form';

enum CountryForm {
  Colombia = 34,
  Mexico = 52
}

@Component({
  selector: 'app-repse-form',
  templateUrl: './repse-form.component.html',
  styleUrls: ['./repse-form.component.scss']
})
export class RepseFormComponent {
  readonly CountyForm = CountryForm

  loading: boolean = false;
  inmutableData: any = {};
  countryForm: CountryForm = CountryForm.Mexico;
  titleForm: string = '';

  readonly REPSE_FORM = REPSE_FORM;
  mainForm: IForm = {description: '', sections: []};
  form: FormGroup;

  vendorData: any = { };
  valuesLoaded: boolean = false;
  requiredFiles: boolean = false;


  constructor(private _cD: ChangeDetectorRef, private _fB: FormBuilder, private vendorService: VendorsService, private router: Router){
    this.form = this._fB.group({})
  }

  ngOnInit(): void {

    this.mainForm = {...this.REPSE_FORM}

    this.loading = true;
    this.vendorService.getVendorInfo().subscribe( (data:any) => {
      if(data.error){
        return;
      }

      this.inmutableData = data;

      this.vendorData = {
        ...data.vendor,
      };

      this.countryForm = this.vendorData.country_id

      if(this.countryForm == CountryForm.Colombia){
        this.router.navigate(['complete-form']);
      }

      this.titleForm = 'TIS Productions México S de RL de CV';

      this.buildForm();
      this.setValuesForm();

      this.loading = false;
    })

  }

  buildForm(){

    const fields_group: any = {}

    this.mainForm.sections.forEach( (section) => {
      section.inputs.
      forEach( (input) => {

        if(input.data){
          fields_group[input.data] = ['', Validators.required]
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
        this.setInputFilesForm();
      }
    });
  }

  setValuesForm(){
    Object.keys(this.form.controls).forEach( key => {
      const control = this.form.controls[key];
      control.setValue(this.vendorData[key]);
    });

    this.setCheckboxInfo();
    this.setInputFilesForm();

    this.valuesLoaded = true;
  }

  setInputFilesForm(){
      const servicios_actividades = this.form.value['servicios_actividades'];
      const servicios_instalaciones = this.form.value['servicios_instalaciones'];
      const visita_instalaciones = this.form.value['visita_instalaciones'];
      const registrado_repse = this.form.value['registrado_repse'];

      this.requiredFiles = servicios_actividades == 1
      && servicios_instalaciones == 2
      && visita_instalaciones == 1
      && registrado_repse == 1;

      this.setVisibleInput('inscripcion_repse_file', this.requiredFiles);
      this.setVisibleInput('registro_IMSS', this.requiredFiles);


  }

  submit(){

    const _data = {
      ...this.inmutableData.vendor,
      info_users: [],
      info_additional: [
        {
          vendor_inf_add_type_id: 1,
          value: this.form.value['servicios_actividades'] == '1' ? true : null,
        },
        {
          vendor_inf_add_type_id: 2,
          value: this.form.value['servicios_instalaciones'] == '1' ? true : null,
        },
        {
          vendor_inf_add_type_id: 3,
          value: this.form.value['visita_instalaciones'] == '1' ? true : null,
        },
        {
          vendor_inf_add_type_id: 4,
          value: this.form.value['registrado_repse'] == '1' ? true : null,
        },
      ]
    }

    this.vendorService.updateVendorInfo(_data).subscribe( data => {
      console.log(this.form.value, data)
      this.router.navigate(['complete-form'])

    })

  }

  private setCheckboxInfo(){

    const info_addtional_vendor = {
      1: 'servicios_actividades',
      2: 'servicios_instalaciones',
      3: 'visita_instalaciones',
      4: 'registrado_repse',
    }

    this.inmutableData.info_addtional_vendor.forEach( (info_user:any) => {
      const value = info_user.value;
      const input = info_addtional_vendor[info_user.id as keyof typeof info_addtional_vendor]

      if(input)
        this.form.controls[input].setValue(value == true ? '1': '2');
    });

  }

  private setVisibleInput(inputKey: string, visible: boolean ){
    const sectionIndex = this.mainForm.sections.findIndex( section => section.key == SECTIONS_REPSE_FORM.Main)
    const section = this.mainForm.sections[sectionIndex]

    if(section){
      const indexInput = section.inputs.findIndex( input => input.data == inputKey)
      const input = section.inputs[indexInput]

      if(input){
        input.visible = visible;
        this.mainForm.sections[sectionIndex].inputs[indexInput] = {...input}

          this.setRequiredInput(inputKey, visible)
      }
    }
  }

  private setRequiredInput(inputKey: string, required: boolean ){
    if(required){
      this.form.controls[inputKey].setValidators(Validators.required)
    }else{
      this.form.controls[inputKey].removeValidators(Validators.required)
    }

    this.form.controls[inputKey].updateValueAndValidity()
  }
}