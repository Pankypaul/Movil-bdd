import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilAgregarAmigosPageRoutingModule } from './perfil-agregar-amigos-routing.module';

import { PerfilAgregarAmigosPage } from './perfil-agregar-amigos.page';
import { ComponentsModule } from 'src/app/components/footer/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PerfilAgregarAmigosPageRoutingModule
  ],
  declarations: [PerfilAgregarAmigosPage]
})
export class PerfilAgregarAmigosPageModule {}
