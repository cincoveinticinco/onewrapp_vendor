import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap } from 'rxjs';
import { UploadS3Service } from 'src/app/services/upload-s3.service';
import { VendorsService } from 'src/app/services/vendors.service';
import { info_files } from 'src/app/shared/forms/files_types';
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
    data: 'formulario_firmas',
    disabled: false,
    required: true
  }

  constructor(private _fB: FormBuilder, private vendorService: VendorsService, private router: Router, private s3Service: UploadS3Service){
    this.form = this._fB.group({
      file: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadInfo();

    this.form.valueChanges.subscribe( values => {
      const value = values['file'];
      this.submitFile({formControlName: this.fileQuestion.data, value});
    })

  }

  loadInfo() {
    this.loading = true;
    this.vendorService.getVendorInfo().subscribe((data: any) => {
      if (data.error) {
        return;
      }

      this.inmutableData = data;


      this.loading = false;
    });
  }

  downloadVendorPDF(){
    const vendor_id = localStorage.getItem('id_vendor');

    if(vendor_id){
      this.vendorService.getVendorPDF({vendor_id})
        .subscribe( (data:any) => {
          const link = document.createElement('a');
          link.download = "Vendor PDF";
          link.href = data.url_aws;
          link.target = '_blank';
          link.click()
        })
      return;
    }

    console.log('Error getting vendor ID');

  }

  submitFile(fileObject: any) {
    this.loading = true;

    const vendor_id = localStorage.getItem('id_vendor');

    if(!vendor_id){
      console.log('Error getting vendor ID');
      return;
    }

    const { value, formControlName } = fileObject;
    const fileIdDocument = Object.keys(info_files).find(
      (key) =>
        info_files[key as unknown as keyof typeof info_files] == formControlName
    );

    if (!value) {
      const document = this.inmutableData['document_vendor'].find(
        (document: any) => document.id == fileIdDocument
      );
      if (document) {
        this.vendorService
          .deleteVendorDocument({ document_id: document.document_id })
          .subscribe((data) => this.loading = false);
      }
      return;
    }

    this.s3Service
      .getPresignedPutURL(value.name, vendor_id)
      .pipe(
        catchError((error) =>
          of({ id: fileIdDocument, file: value, key: '', url: '' })
        ),
        map((putUrl: any) => ({
          ...putUrl,
          id: fileIdDocument,
          file: value,
        })),
        switchMap(
          async (uploadFile: any) => {
            if (!uploadFile.url) {
              return of(uploadFile);
            }

            const blobFile = await uploadFile.file.arrayBuffer();

            return this.s3Service.uploadFileUrlPresigned(<File>blobFile, uploadFile.url, uploadFile.file.type)
            .pipe(
              catchError((_) => of({ ...value, url: '' })),
              map(() => uploadFile)
            );

          }
        ),
        switchMap( response => response.pipe(map( value => value))),
        switchMap(
          (uploadFile: any) =>{
            console.log(uploadFile)


            return this.vendorService.updateVendorDocument({
              vendor_document_type_id: Number(uploadFile.id),
              link: uploadFile.url
                ? `${vendor_id}/${uploadFile.file.name}`
                : '',
            })
          }
        ),
        map((response) => response)
      )
      .subscribe((value) => {
        this.loading = false;
      });
  }



  submit(){
    this.loading = true;

    this.vendorService.verifyVendor().subscribe((data) => {
      this.loading = false;
      this.router.navigate(['gracias']);
    });
  }
}
