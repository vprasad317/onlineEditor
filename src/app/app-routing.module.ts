import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrepareTemplateComponent } from './components/prepare-template/prepare-template.component';

const routes: Routes = [
  {
    path: 'prepare-template',
    component: PrepareTemplateComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'prepare-template'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
