import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDocumentComponent } from './input-document.component';

describe('InputDocumentComponent', () => {
  let component: InputDocumentComponent;
  let fixture: ComponentFixture<InputDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
