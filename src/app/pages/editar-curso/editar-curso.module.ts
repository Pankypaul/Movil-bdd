import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCursoPageRoutingModule } from './editar-curso-routing.module';

import { EditarCursoPage } from './editar-curso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCursoPageRoutingModule
  ],
  declarations: [EditarCursoPage]
})
export class EditarCursoPageModule {}
