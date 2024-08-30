import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilAgregarAmigosPageRoutingModule } from './perfil-agregar-amigos-routing.module';

import { PerfilAgregarAmigosPage } from './perfil-agregar-amigos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilAgregarAmigosPageRoutingModule
  ],
  declarations: [PerfilAgregarAmigosPage]
})
export class PerfilAgregarAmigosPageModule {}
