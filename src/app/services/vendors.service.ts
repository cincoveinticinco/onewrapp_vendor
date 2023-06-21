import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, map } from 'rxjs';
import { CountryVendor } from '../shared/interfaces/country_vendors';
import { TYPE_PERSON_MEXICO } from '../shared/forms/mexico_form';
import { ISelectBoxOption } from '../shared/interfaces/input_form';
import { TYPE_PERSON_COLOMBIA } from '../shared/forms/colombia_form';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  private selectBoxList = new Subject<any>();
  private _selectBoxList = {};

  constructor(private http: HttpClient) { }

  normalizeString(strAccents:string) {
    return strAccents.replace(/\s/g, '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  getSelectBoxList(){
    return this._selectBoxList;
  }

  updateSelectBoxList(){
    return this.selectBoxList.asObservable();
  }

  setSelectBoxlist(newList: any){
    this.selectBoxList.next(newList);
    this._selectBoxList = newList;
  }

  getVendorInfo(){
    return this.http.post(`${environment.API_URL}finance/getInfoVendor`, {})
    .pipe(
      map( response =>{
        const lists = this.createSelectBoxList(response)
        return {...response, lists};
      }
    ))
  }

  getVendorCity(idVendor: string){
    return this.http.post<any>(`${environment.API_URL}finance/getCountryVendor`, {id: idVendor})
    .pipe(map( (response: any ) => response))
  }

  updateVendorInfo(formData: any){
    return this.http.post(`${environment.API_URL}finance/updateVendor`, {...formData})
    .pipe(map( response => response))
  }

  verifyVendor(){
    return this.http.post(`${environment.API_URL}finance/getsendVerification`, {})
    .pipe(map( response => response))
  }

  updateVendorDocument(formData: any){
    return this.http.post(`${environment.API_URL}finance/addDocumentVendor`, {...formData})
    .pipe(map( response => response))
  }

  updateVendorAditionalInfo(formData: any){
    return this.http.post(`${environment.API_URL}finance/insertInfoAdditional`, {...formData})
    .pipe(map( response => response))
  }

  deleteVendorDocument(formData: any){
    return this.http.post(`${environment.API_URL}finance/deleteDocumentVendor`, {...formData})
    .pipe(map( response => response))
  }

  getVendorPDF(formData: any){

    const params = new HttpParams().set('vendor_id', formData.vendor_id)
    return this.http.get(`${environment.API_URL}finance/resumeVendorPdf`, {params})
    .pipe(map( response => response))
  }

  downloadVendorPDF(urlPDF: string){
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.http.get(urlPDF, { headers: headers, responseType: 'blob' });
  }

  private createSelectBoxList(sourceList: any){

    const vendorData = sourceList.vendor;
    const country = vendorData.country_id

    const tipo_contraparte = sourceList.vendor_types.map((item: any) =>
      this.setSelectBoxOptions(item, 'id', 'vendor_type')
    );

    const tipo_persona = sourceList.person_types.map((item: any) =>
      this.setSelectBoxOptions(item, 'id', 'person_type_esp')
    );

    const moral_tipo_id = sourceList.person_types.find(
      (item: any) => item.id == TYPE_PERSON_MEXICO.Moral
    );
    const moral_id = moral_tipo_id
      ? moral_tipo_id.document_types.map((item: any) =>
          this.setSelectBoxOptions(item, 'id', 'document_type_esp')
        )
      : [];

      const juridica_tipo_id = sourceList.person_types.find(
        (item: any) => item.id == TYPE_PERSON_COLOMBIA.Juridica
      );
      const juridica_id = juridica_tipo_id
        ? juridica_tipo_id.document_types.map((item: any) =>
            this.setSelectBoxOptions(item, 'id', 'document_type_esp')
          )
        : [];

    const fisica_tipo_id = sourceList.person_types.find(
      (item: any) => item.id == TYPE_PERSON_MEXICO.Fisica
    );
    const fisica_id = fisica_tipo_id
      ? fisica_tipo_id.document_types.map((item: any) =>
          this.setSelectBoxOptions(item, 'id', 'document_type_esp')
        )
      : [];

    const natural_tipo_id = sourceList.person_types.find(
      (item: any) => item.id == TYPE_PERSON_COLOMBIA.Natural
    );
    const natural_id = natural_tipo_id
      ? natural_tipo_id.document_types.map((item: any) =>
          this.setSelectBoxOptions(item, 'id', 'document_type_esp')
        )
      : [];

    const todos_tipo_id =  country == CountryVendor.Mexico ?
      [...fisica_id, ...moral_id]: [...juridica_id, ...natural_id];

    const tipo_id = country == CountryVendor.Mexico ?
      (vendorData.f_person_type_id == TYPE_PERSON_MEXICO.Moral
        ? moral_id
        : fisica_id) :
      (vendorData.f_person_type_id == TYPE_PERSON_COLOMBIA.Juridica
          ? juridica_id
          : natural_id)
      ;

    const ciiu = sourceList.vendor_economic_activitis.map((item: any) =>
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

    const parentesco = sourceList.relationship.map((item: any) =>
      this.setSelectBoxOptions(item, 'id', 'relationship')
    );

    const lists = {
      tipo_contraparte,
      tipo_persona,
      tipo_id,
      fisica_id,
      moral_id,
      juridica_id,
      natural_id,
      todos_tipo_id,
      ciiu,
      verification_digit,
      calidad,
      parentesco,
    };

    this.setSelectBoxlist(lists);

    return lists;
  }

  private setSelectBoxOptions(item: any, key: string, value: string) {
    const option: ISelectBoxOption = {
      key: item[key],
      value: item[value],
    };
    return option;
  }
}
