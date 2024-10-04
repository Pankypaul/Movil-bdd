import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiPublicacionPageRoutingModule } from './mi-publicacion-routing.module';

import { MiPublicacionPage } from './mi-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiPublicacionPageRoutingModule
  ],
  declarations: [MiPublicacionPage]
})
export class MiPublicacionPageModule {}
