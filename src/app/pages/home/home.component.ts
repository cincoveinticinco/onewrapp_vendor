import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  view: string = 'home';
  token: string = '';
  vendorId: string = '';
  vendorEmail: string = '';

  error: string = '';

  constructor(private router:Router, private route: ActivatedRoute, private auth: AuthService){}

  setView(view: string): void{
    this.view = view;
  }

  requestToken(){
    this.auth.generateToken(this.vendorId).subscribe( (data:any) => {

      if(data.error){
        this.error = data.msg;
        return;
      }

      this.vendorEmail = data.email;
      this.setView('token');
    });

  }

  generateToken(){

    this.error = '';

    this.auth.generateToken(this.vendorId).subscribe( (data:any) => {

      if(data.error){
        this.error = data.msg;
        return;
      }

      this.vendorEmail = data.email;
      this.setView('new-token');
    });

  }

  sendToken(){
    this.auth.login(this.vendorId, this.token).subscribe( (data:any) => {

      if(data.error){
        this.error = data.msg;
        return;
      }

      this.router.navigate(['repse-form']);
    });

  }

  ngOnInit(): void {
      this.route.params.subscribe( (params: any) => {
        if(!params.vendor){
          this.view = 'invalid-link';
        }

        const vendor:string = params.vendor;
        this.vendorId = vendor
        localStorage.setItem('id_vendor', vendor)
      });
  }
}
