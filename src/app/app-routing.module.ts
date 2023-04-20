import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VendorsFormComponent } from './pages/vendors-form/vendors-form.component';
import { RepseFormComponent } from './pages/repse-form/repse-form.component';
import { UploadFormComponent } from './pages/upload-form/upload-form.component';
import { GraciasComponent } from './pages/gracias/gracias.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'vendor/:vendor',
    component: HomeComponent
  },
  {
    path: 'repse-form',
    component: RepseFormComponent
  },
  {
    path: 'complete-form',
    component: VendorsFormComponent
  },
  {
    path: 'upload-form',
    component: UploadFormComponent
  },
  {
    path: 'gracias',
    component: GraciasComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
