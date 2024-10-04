import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiPublicacionPage } from './mi-publicacion.page';

const routes: Routes = [
  {
    path: '',
    component: MiPublicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiPublicacionPageRoutingModule {}
