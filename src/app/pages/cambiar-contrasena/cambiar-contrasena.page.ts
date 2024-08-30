import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {
  correo: string = '';
  nueva: string = '';
  repetirNueva: string = '';

  validarContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/;


  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  onSubmit() {

    if (!this.correo || !this.nueva || !this.repetirNueva) {
      console.log("Porfavor, rellene los campos en blanco");
      this.CamposVacios('bottom');
    } else {

      // Validación mejorada del correo (Devuelve numeros)
      const tieneArroba = this.correo.includes('@');       //Incluye '@'
      const posicionArroba = this.correo.indexOf('@');     //Ver la posición del '@'
      const posicionPunto = this.correo.lastIndexOf('.');  //Incluye si incluye '.'

      //indexOf(): Se utiliza para encontrar la primera aparición de un carácter o subcadena.
      //lastIndexOf(): Se utiliza para encontrar la última aparición de un carácter o subcadena.

      const algoAntesArroba = posicionArroba > 0; // Asegura que haya algo antes del '@'
      const algoEntreArrobaYPunto = posicionPunto > posicionArroba + 1; // Asegura que haya algo entre el '@' y el '.'
      const algoDespuesPunto = posicionPunto < this.correo.length - 1; // Asegura que haya algo después del '.'

      if (tieneArroba && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto) {
        console.log("El correo es válido");

        if (this.nueva == this.repetirNueva) {
          /*console.log("-----------------------------------");
          console.log("Las contraseñas son iguales");

          console.log('Correo:', this.correo);
          console.log('Contraseña 1:', this.nueva);
          console.log('Contraseña 2:', this.repetirNueva);*/
          this.router.navigate(['/login']);

        } else {
          //alert('Las contraseñas no son iguales')
          //console.log('Las contraseñas no son iguales');
          this.contrasena('bottom');
        }

      } else {
        //console.log("El correo no es válido");
        this.correoInvalido('bottom');
      }


    }
  }


  //Mensaje de campos vacios
  async CamposVacios(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Por favor, rellene los campos en blanco',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  //Mensaje de correo invalido
  async correoInvalido(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'El correo es inválido.',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  //Mensaje de las contraseñas no son iguales
  async contrasena(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Las contraseñas no son iguales',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }


}

