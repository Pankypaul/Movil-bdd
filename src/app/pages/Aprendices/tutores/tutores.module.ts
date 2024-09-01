import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutoresPageRoutingModule } from './tutores-routing.module';

import { TutoresPage } from './tutores.page';

import { ComponentsModule } from 'src/app/components/footer/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    ComponentsModule,   //Tambien lo declaro aqui el ComponentsModule
    TutoresPageRoutingModule
  ],
  declarations: [TutoresPage]
})
export class TutoresPageModule {}
 
 