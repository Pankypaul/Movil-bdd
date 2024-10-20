import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoContrasenaPageRoutingModule } from './codigo-contrasena-routing.module';

import { CodigoContrasenaPage } from './codigo-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoContrasenaPageRoutingModule
  ],
  declarations: [CodigoContrasenaPage]
})
export class CodigoContrasenaPageModule {}
