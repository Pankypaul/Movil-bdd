import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FooterTutorComponent } from './footer-tutor.component';

@NgModule({
  declarations: [FooterTutorComponent],
  imports: [
    CommonModule,
    IonicModule,  // Importa IonicModule
    RouterModule  // Importa RouterModule si estás usando routerLink
  ],
  exports: [FooterTutorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Agrega CUSTOM_ELEMENTS_SCHEMA para componentes personalizados
})
export class ComponentsModule { }  //Nombre de esta archivo que vamos a exportar por asi decir, luego vamos a la app y declaramos cosas