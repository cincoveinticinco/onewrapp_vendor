import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderServiceService } from 'src/app/services/header-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string = '';
  sections: any;
  form?: FormGroup;
  showSide: boolean = false;

  constructor(private authService: AuthService, private headerService: HeaderServiceService){}

  ngOnInit(): void {
    this.headerService
      .updateSectionList()
      .subscribe( (sections:any) => this.sections = sections);

      this.headerService
      .updateMainForm()
      .subscribe( (form:FormGroup) => this.form = form);


  }

  logout(){
    this.authService.logout();
  }

  toggleShowSide(){
    this.showSide = !this.showSide;
  }
}
