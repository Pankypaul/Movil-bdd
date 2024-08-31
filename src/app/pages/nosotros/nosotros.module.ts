import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NosotrosPageRoutingModule } from './nosotros-routing.module';

import { NosotrosPage } from './nosotros.page';

import { ComponentsModule } from 'src/app/components/footer/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NosotrosPageRoutingModule
  ],
  declarations: [NosotrosPage]
})
export class NosotrosPageModule {}
