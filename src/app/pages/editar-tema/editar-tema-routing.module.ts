import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarTemaPage } from './editar-tema.page';

const routes: Routes = [
  {
    path: '',
    component: EditarTemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarTemaPageRoutingModule {}
