import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { shareReplay, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  generateToken(vendorId: string){
    return this.http.post(`${environment.API_URL}finance/sendToken`, {id: vendorId}).pipe(
      shareReplay(1)
    )
  }

  login(vendorId: string, token: string){
    return this.http.post(`${environment.API_URL}finance/validateToken`, {token, id: vendorId}).pipe(
      tap( res => this.setSession(res)),
      shareReplay(1)
    )
  }

  logout(noRedirect = false){
    const vendorId = localStorage.getItem('id_vendor');
    localStorage.clear();

    if(noRedirect) return;

    if(vendorId){
      this.router.navigate(['vendor',vendorId]);
    }else{
      this.router.navigate(['/']);
    }

  }

  private setSession(authResult: any){
    localStorage.setItem('id_token', authResult.vendor_token);
  }

}
