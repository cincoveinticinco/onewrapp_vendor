import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-gracias',
  templateUrl: './gracias.component.html',
  styleUrls: ['./gracias.component.scss']
})
export class GraciasComponent {

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.logout(true);
  }
}
