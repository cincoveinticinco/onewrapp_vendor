import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderServiceService {

  private sectionList = new Subject<any>();
  private _sectionList = {};

  private mainForm = new Subject<FormGroup>();
  private _mainForm = {};

  private saveHeader = new Subject<any>();

  fireSaveHeader(){
    this.saveHeader.next(true);
  }

  onSaveHeader(){
    return this.saveHeader.asObservable();
  }

  setSectionList(sectionList: any){
    this.sectionList.next(sectionList);
    this._sectionList = sectionList;
  }

  getSectionList(){
    return this._sectionList;
  }

  updateSectionList(){
    return this.sectionList.asObservable();
  }

  setMainForm(mainForm: any){
    this.mainForm.next(mainForm);
    this._mainForm = mainForm;
  }

  getMainForm(){
    return this._mainForm;
  }

  updateMainForm(){
    return this.mainForm.asObservable();
  }


  constructor() { }
}
