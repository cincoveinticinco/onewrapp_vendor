import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorsService } from 'src/app/services/vendors.service';

enum CountryForm {
  Colombia = 1,
  Mexico = 2
}

@Component({
  selector: 'app-vendors-form',
  templateUrl: './vendors-form.component.html',
  styleUrls: ['./vendors-form.component.scss']
})
export class VendorsFormComponent {

  readonly CountyForm = CountryForm

  loading: boolean = false;
  inmutableData: any = {};
  countryForm: CountryForm = CountryForm.Colombia;
  titleForm: string = '';


  constructor(private vendorService: VendorsService, private router: Router){
  }

  ngOnInit(): void {

    this.loading = true;
    this.vendorService.getVendorInfo().subscribe( (data:any) => {
      if(data.error){
        return;
      }

      this.inmutableData = data;

      this.titleForm = this.getTitleForm(this.countryForm);

      this.loading = false;
    })

  }

  getTitleForm(country: CountryForm){
    return {
      [CountryForm.Colombia]: 'TIS Productions Colombia SAS',
      [CountryForm.Mexico]: 'TIS Productions México S de RL de CV',
      'default': 'Titulo no disponible'
    }[country || 'default'];
  }

  submit(formData: any){

    this.loading = true

    const _data = {
      ...formData,
    }

    this.vendorService.updateVendorInfo(_data).subscribe( data => {
      this.loading = false
    })

  }

  verifyVendor(formData: any){
    this.loading = true

    const _data = {
      ...formData,
    }

    this.vendorService.verifyVendor(_data).subscribe( data => {
      this.loading = false
      this.router.navigate(['upload-form'])
    })
  }
}
