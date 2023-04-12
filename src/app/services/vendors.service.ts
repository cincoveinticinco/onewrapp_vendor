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
}
