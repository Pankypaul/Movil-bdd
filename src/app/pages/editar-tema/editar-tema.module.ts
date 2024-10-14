import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarTemaPageRoutingModule } from './editar-tema-routing.module';

import { EditarTemaPage } from './editar-tema.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarTemaPageRoutingModule
  ],
  declarations: [EditarTemaPage]
})
export class EditarTemaPageModule {}
