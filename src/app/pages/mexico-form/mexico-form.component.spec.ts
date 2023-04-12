import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MexicoFormComponent } from './mexico-form.component';

describe('MexicoFormComponent', () => {
  let component: MexicoFormComponent;
  let fixture: ComponentFixture<MexicoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MexicoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MexicoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
