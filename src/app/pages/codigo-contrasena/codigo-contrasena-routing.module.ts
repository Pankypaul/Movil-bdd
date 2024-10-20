import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoContrasenaPage } from './codigo-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoContrasenaPageRoutingModule {}
