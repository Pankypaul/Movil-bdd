import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoEmailPageRoutingModule } from './codigo-email-routing.module';

import { CodigoEmailPage } from './codigo-email.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoEmailPageRoutingModule
  ],
  declarations: [CodigoEmailPage]
})
export class CodigoEmailPageModule {}
