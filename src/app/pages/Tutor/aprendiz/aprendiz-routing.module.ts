import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprendizPage } from './aprendiz.page';

const routes: Routes = [
  {
    path: '',
    component: AprendizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprendizPageRoutingModule {}
