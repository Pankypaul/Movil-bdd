import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu1-routing.module';

import { MenuPage } from './menu1.page';

import { ComponentsModule } from 'src/app/components/footer-tutor/components.module';  //Importo el ComponentsModule

@NgModule({
  imports: [
    CommonModule, 
    IonicModule,
    ComponentsModule,   //Tambien lo declaro aqui el ComponentsModule
    MenuPageRoutingModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
