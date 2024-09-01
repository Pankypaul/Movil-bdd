import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAsignaturaPageRoutingModule } from './menu-asignatura-routing.module';

import { MenuAsignaturaPage } from './menu-asignatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAsignaturaPageRoutingModule
  ],
  declarations: [MenuAsignaturaPage]
})
export class MenuAsignaturaPageModule {}
