import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(private http: HttpClient) { }

  getVendorInfo(){
    return this.http.post(`${environment.API_URL}finance/getInfoVendor`, {})
    .pipe(map( response => response))
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
}
