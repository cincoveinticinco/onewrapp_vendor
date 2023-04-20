import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, map, forkJoin, mergeMap, switchMap } from 'rxjs';
import { AuthInterceptor } from 'src/app/interceptors/auth-interceptor';
import { UploadS3Service } from 'src/app/services/upload-s3.service';
import { VendorsService } from 'src/app/services/vendors.service';
import { info_files } from 'src/app/shared/forms/files_types';

enum CountryForm {
  Colombia = 34,
  Mexico = 52,
}

@Component({
  selector: 'app-vendors-form',
  templateUrl: './vendors-form.component.html',
  styleUrls: ['./vendors-form.component.scss'],
})
export class VendorsFormComponent {
  readonly CountyForm = CountryForm;

  loading: boolean = false;
  inmutableData: any = {};
  countryForm: CountryForm = CountryForm.Colombia;
  titleForm: string = '';

  constructor(
    private s3Service: UploadS3Service,
    private vendorService: VendorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
    this.loading = true;
    this.vendorService.getVendorInfo().subscribe((data: any) => {
      if (data.error) {
        return;
      }

      this.inmutableData = data;
      this.countryForm = this.inmutableData['vendor'].country_id;

      this.titleForm = this.getTitleForm(this.countryForm);

      this.loading = false;
    });
  }

  getTitleForm(country: CountryForm) {
    return {
      [CountryForm.Colombia]: 'TIS Productions Colombia SAS',
      [CountryForm.Mexico]: 'TIS Productions México S de RL de CV',
      default: 'Titulo no disponible',
    }[country || 'default'];
  }

  submit(formData: any) {
    this.loading = true;

    const _data = {
      ...formData,
    };

    this.vendorService.updateVendorInfo(_data).subscribe((data) => {
      this.loadInfo()
    });
  }

  submitFile(fileObject: any) {
    this.loading = true;

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
          .subscribe((data) => this.loadInfo());
      }
      return;
    }



    this.s3Service
      .getPresignedPutURL(value.name, this.inmutableData['vendor'].id)
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
                ? `${this.inmutableData['vendor'].id}/${uploadFile.file.name}`
                : '',
            })
          }
        ),
        map((response) => response)
      )
      .subscribe((value) => {
        this.loadInfo();
      });
  }


  verifyVendor(formData: any) {
    this.loading = true;

    const _data = {
      ...formData,
    };

    this.vendorService.updateVendorInfo(_data).subscribe((data) => {
      this.loading = false;
      this.router.navigate(['upload-form']);
    });
  }

  submitFiles(formatData: any) {
    return new Promise((resolve) => {
      const filesSources = Object.keys(info_files)
        .map((key: string) => {
          const file_key =
            info_files[key as unknown as keyof typeof info_files];
          return formatData[file_key] && formatData[file_key].url
            ? { id: key, file: formatData[file_key] }
            : null;
        })
        .filter(
          (file: any) => file && file.file != null && file.file != undefined
        )
        .map((file: any) =>
          this.s3Service
            .getPresignedPutURL(file.file.name, this.inmutableData['vendor'].id)
            .pipe(
              catchError((error) =>
                of({ id: file.id, file: file.file, key: '', url: '' })
              ),
              map((putUrl: any) => ({
                ...putUrl,
                id: file.id,
                file: file.file,
              }))
            )
        );

      if (!filesSources.length) {
        resolve([]);
        return;
      }

      forkJoin(filesSources).subscribe((values) => {
        const uploadSources = values.map((value) =>
          this.s3Service.uploadFileUrlPresigned(value.file, value.url, value.file.type).pipe(
            catchError((_) => of({ ...value, url: '' })),
            map((_) => value)
          )
        );

        forkJoin(uploadSources).subscribe((uploadImages) => {
          uploadImages.forEach((value) => {
            this.vendorService
              .updateVendorDocument({
                vendor_document_type_id: Number(value.id),
                link: value.url
                  ? `${this.inmutableData['vendor'].id}/${value.file.name}`
                  : '',
              })
              .subscribe((data) => {
                resolve(data);
              });
          });
        });
      });
    });
  }
}
