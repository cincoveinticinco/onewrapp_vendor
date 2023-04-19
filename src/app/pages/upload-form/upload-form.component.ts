import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadS3Service } from 'src/app/services/upload-s3.service';
import { VendorsService } from 'src/app/services/vendors.service';
import { IInputForm, TypeInputForm } from 'src/app/shared/interfaces/input_form';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent {
  form: FormGroup;
  loading: boolean = false;
  inmutableData: any = {};



  fileQuestion: IInputForm = {
    type: TypeInputForm.File,
    label: 'Adjuntar formulario con firma',
    visible: true,
    data: 'file',
    disabled: false,
    required: true
  }

  constructor(private _fB: FormBuilder, private vendorService: VendorsService, private router: Router, private s3Service: UploadS3Service){
    this.form = this._fB.group({
      file: ['', Validators.required]
    })
  }

  downloadVendorPDF(){
    const vendor_id = localStorage.getItem('id_vendor');

    if(vendor_id){
      this.vendorService.downloadVendorPDF({vendor_id})
        .subscribe( data => {
          console.log(data);
        })
      return;
    }

    console.log('Error getting vendor ID');

  }

  submit(){}
}
