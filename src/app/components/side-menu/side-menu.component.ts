import { ViewportScroller } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IFormSection } from 'src/app/shared/interfaces/form';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  @Input() sections: IFormSection[] = [];

  constructor(private viewportScrolling: ViewportScroller){}

  goToSection(key:string = ''){
    if(key == ''){
      this.viewportScrolling.scrollToPosition([0, 0]);
      return;
    }
    this.viewportScrolling.scrollToAnchor(key);
  }

}
