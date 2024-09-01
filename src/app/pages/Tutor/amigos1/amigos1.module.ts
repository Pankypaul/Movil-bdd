import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmigosPageRoutingModule } from './amigos1-routing.module';

import { AmigosPage } from './amigos1.page';

import { ComponentsModule } from 'src/app/components/footer-tutor/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AmigosPageRoutingModule
  ],
  declarations: [AmigosPage]
})
export class AmigosPageModule {}
