import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilAgregarAmigosPage } from './perfil-agregar-amigos.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilAgregarAmigosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilAgregarAmigosPageRoutingModule {}
