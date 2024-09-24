import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {
  correo: string = '';
  nueva: string = '';
  repetirNueva: string = '';
  mensaje_1!: string;

  validarContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!-_()]).{8,}$/;


  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  onSubmit() {

    this.mensaje_1 = ''; 

    if (this.correo == ""){
      this.mensaje_1 = 'El correo es obligatorio ';
    }

    if (!this.correo) {
      console.log("Porfavor, rellene los campos en blanco");
      this.CamposVacios('bottom');
    } else if (this.correo.length >= 50 ) {
      this.maxCaracter('bottom')
    }else {

      // Validación mejorada del correo (Devuelve numeros)
      const tieneArroba = this.correo.includes('@');       //Incluye '@'
      const posicionArroba = this.correo.indexOf('@');     //Ver la posición del '@'
      const posicionPunto = this.correo.lastIndexOf('.');  //Incluye si incluye '.'

      //indexOf(): Se utiliza para encontrar la primera aparición de un carácter o subcadena.
      //lastIndexOf(): Se utiliza para encontrar la última aparición de un carácter o subcadena.

      const algoAntesArroba = posicionArroba > 0; // Asegura que haya algo antes del '@'
      const algoEntreArrobaYPunto = posicionPunto > posicionArroba + 1; // Asegura que haya algo entre el '@' y el '.'
      const algoDespuesPunto = posicionPunto < this.correo.length - 1; // Asegura que haya algo después del '.'

      if (tieneArroba && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto ) {
        //console.log("El correo es válido");
        
        if(this.correo.length <8){
          this.mensaje_1 = 'El correo es muy corto';
        }else{
          this.router.navigate(['/login']);
        }
      } 
      else {
        this.mensaje_1 = 'Correo no valido'; 
      }
    }
  }


  async Envio(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Se mando el correo para que se realice el cambio de contraseña',
      duration: 1500,
      position: position,
    });
    await toast.present();
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


}

