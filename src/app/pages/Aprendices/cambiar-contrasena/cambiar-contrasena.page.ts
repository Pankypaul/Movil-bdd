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

  mensaje_1!: string;
  mensaje_2!: string;  
  mensaje_3!: string; 

  validarContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!-_()]).{8,}$/;


  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  onSubmit() {

    this.mensaje_1 = '';
    this.mensaje_2 = '';
    this.mensaje_3 = '';

    if (this.correo === ""){
      this.mensaje_1= 'El correo es obligatorio';
    }

    if (this.nueva === ""){
      this.mensaje_2= 'La contraseña es obligatorio ';
    }

    if (this.repetirNueva === ""){
      this.mensaje_3= 'La contraseña es obligatorio ';
    }

    if (this.correo.trim() !== "" || this.nueva.trim() !== "" && this.repetirNueva.trim() !== ""){
      
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

        if(this.correo.length <8){
          this.mensaje_1 = 'El correo es muy corto';
        }
      } else {
        //this.correoInvalido('bottom');
        this.mensaje_1 = 'El correo no es valido ';
      }

      if (this.nueva !== this.repetirNueva) {
        this.mensaje_2= 'Las contraseñas no son iguales ';
        this.mensaje_3= 'Las contraseñas no son iguales ';
        //this.contrasena('bottom');
      }
      // Validar la contraseña
      if (this.nueva.trim() !== "" && this.repetirNueva.trim() !== "") {
        if (!this.validarContraseña.test(this.nueva) || this.nueva.length <8 ) {
          this.mensaje_2 = 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
        }

        if (!this.validarContraseña.test(this.repetirNueva) || this.repetirNueva.length <8) {
          this.mensaje_3 = 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
        }

        
          
      }
      
      if(this.nueva.trim() !== "" && this.repetirNueva.trim() !== "" && this.nueva.trim() === this.repetirNueva.trim()  && tieneArroba && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto){
        this.router.navigate(['/menu']);
        
      }
    }
  }


  /*if (!this.correo || !this.nueva || !this.repetirNueva) {
      console.log("Porfavor, rellene los campos en blanco");
      this.CamposVacios('bottom');
    } else if (this.correo.length >= 50 || this.nueva.length >= 25) {
      this.maxCaracter('bottom')
    } else if (!this.nueva || this.nueva.length < 8 || !this.validarContraseña.test(this.nueva)){
      this.correoYContrasenaInvalido('bottom')
    } else if (!this.repetirNueva || this.repetirNueva.length < 8 || !this.validarContraseña.test(this.repetirNueva)){
      this.correoYContrasenaInvalido('bottom')
    }else { */


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

  async correoYContrasenaInvalido(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Contraseña incorrecta.',
      duration: 1500,
      position: position,
    });

    await toast.present();
  } 

  async maxCaracter(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Supera el maximo de caracteres.',
      duration: 1500,
      position: position,
    });

    await toast.present();
  } 

  async exito(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Se cambio la contraseña con exito',
      duration: 1500,
      position: position,
    });

    await toast.present();
  } 


}

