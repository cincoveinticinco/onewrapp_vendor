import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  verifyVendor(formData: any){
    return this.http.post(`${environment.API_URL}finance/getsendVerification`, {...formData})
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
}
