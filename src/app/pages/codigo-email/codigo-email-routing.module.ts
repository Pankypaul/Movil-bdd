import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoEmailPage } from './codigo-email.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoEmailPageRoutingModule {}
