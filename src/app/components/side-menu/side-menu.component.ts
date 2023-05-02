import { ViewportScroller } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormSection } from 'src/app/shared/interfaces/form';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {

  @Input() sections: any[]  = [];
  @Input() form?: FormGroup;

  constructor(private viewportScrolling: ViewportScroller){}

  ngOnInit(): void {

    setTimeout( () => this.checkSectionsColor(), 100)

    this.form?.valueChanges.subscribe( values => {
      setTimeout( () => this.checkSectionsColor(), 10)
    })

  }

  goToSection(key:string = ''){
    if(key == ''){
      this.viewportScrolling.scrollToPosition([0, 0]);
      return;
    }
    this.viewportScrolling.scrollToAnchor(key);
  }

  checkSectionsColor(){
    this.sections.forEach( section => {
      const errorElement = document.querySelector(`#${section.key} .ng-invalid`);
      section.checkSectionsColor =  errorElement ? 'fail-section': 'success-section';
    })
  }



}
