import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { VendorsFormComponent } from './pages/vendors-form/vendors-form.component';
import { RepseFormComponent } from './pages/repse-form/repse-form.component';

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
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
