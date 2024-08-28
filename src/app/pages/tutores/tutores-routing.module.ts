import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutoresPage } from './tutores.page';

const routes: Routes = [
  {
    path: '',
    component: TutoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutoresPageRoutingModule {}
