import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutoresPageRoutingModule } from './tutores-routing.module';

import { TutoresPage } from './tutores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutoresPageRoutingModule
  ],
  declarations: [TutoresPage]
})
export class TutoresPageModule {}
