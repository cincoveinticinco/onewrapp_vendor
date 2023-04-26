import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { InputTokenComponent } from './components/input-token/input-token.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorsFormComponent } from './pages/vendors-form/vendors-form.component';
import { QuestionComponent } from './components/form/question/question.component';
import { InputSelectBoxComponent } from './components/form/question/input-select-box/input-select-box.component';
import { InputParagraphComponent } from './components/form/question/input-paragraph/input-paragraph.component';
import { InputTextComponent } from './components/form/question/input-text/input-text.component';
import { InputDateComponent } from './components/form/question/input-date/input-date.component';
import { HeaderComponent } from './components/header/header.component';
import { InputChooseOptionComponent } from './components/form/question/input-choose-option/input-choose-option.component';
import { InputArrayGroupComponent } from './components/form/question/input-array-group/input-array-group.component';
import { InputFileComponent } from './components/form/question/input-file/input-file.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ColombiaFormComponent } from './pages/colombia-form/colombia-form.component';
import { MexicoFormComponent } from './pages/mexico-form/mexico-form.component';
import { RepseFormComponent } from './pages/repse-form/repse-form.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { UploadFormComponent } from './pages/upload-form/upload-form.component';
import { ArrastarnsoltarDirective } from './shared/directives/arrastarnsoltar.directive';
import { GraciasComponent } from './pages/gracias/gracias.component';
import { InputDocumentComponent } from './components/form/question/input-document/input-document.component';
import { ModalComponent } from './components/modal/modal.component';
import { DynamicFormQuestionComponent } from './components/form/question/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './components/form/question/dynamic-form/dynamic-form.component';
import { FileboxQuestionComponent } from './components/form/question/filebox-question/filebox-question.component';
import { DocumentboxQuestionComponent } from './components/form/question/documentbox-question/documentbox-question.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    InputTokenComponent,
    VendorsFormComponent,
    QuestionComponent,
    InputSelectBoxComponent,
    InputParagraphComponent,
    InputTextComponent,
    InputDateComponent,
    HeaderComponent,
    InputChooseOptionComponent,
    InputArrayGroupComponent,
    InputFileComponent,
    ColombiaFormComponent,
    MexicoFormComponent,
    RepseFormComponent,
    SideMenuComponent,
    UploadFormComponent,
    ArrastarnsoltarDirective,
    GraciasComponent,
    InputDocumentComponent,
    ModalComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
    FileboxQuestionComponent,
    DocumentboxQuestionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatAutocompleteModule,


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
