import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsFormComponent } from './vendors-form.component';

describe('VendorsFormComponent', () => {
  let component: VendorsFormComponent;
  let fixture: ComponentFixture<VendorsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
