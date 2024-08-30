import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo: string = '';
  contrasena: string = '';

  validarContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/;


  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  onSubmit() {

    if (!this.correo || !this.contrasena) {
      this.CamposVacios('bottom');
    } else if (this.correo.length >= 50 || this.contrasena.length >= 25) {
      this.maxCaracter('bottom')
    }else if (!this.contrasena || this.contrasena.length < 8 || !this.validarContraseña.test(this.contrasena)){
      this.correoYContrasenaInvalido('bottom')
    }else {
      
      //Valide que haya un punto y una arroba y que haya algo antes y después de ellos

      // Validación mejorada del correo 
      const tieneArroba = this.correo.includes('@');       //Incluye '@' (Devuelve true or false)
      const posicionArroba = this.correo.indexOf('@');     //Ver la posición del '@' (Devuelve numeros)
      const posicionPunto = this.correo.lastIndexOf('.');  //Incluye si incluye '.' (Devuelve numeros)

      //indexOf(): Se utiliza para encontrar la primera aparición de un carácter o subcadena.
      //lastIndexOf(): Se utiliza para encontrar la última aparición de un carácter o subcadena.
      
      const algoAntesArroba = posicionArroba > 0; // Se Asegura que haya algo antes de '@' (Devuelve true or false)
      const algoEntreArrobaYPunto = posicionPunto > posicionArroba + 1; // Se Asegura que haya algo entre el '@' y el '.' (Devuelve true or false)
      const algoDespuesPunto = posicionPunto < this.correo.length - 1; // Se asegura que haya algo después del '.' (Punto) (Devuelve true or false)
      
      if (tieneArroba && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto) {
        console.log("El correo es válido");

        /*console.log("tieneArroba",tieneArroba);
        console.log("posicionArroba",posicionArroba);
        console.log("posicionPunto",posicionPunto);

        console.log("algoAntesArroba",algoAntesArroba);
        console.log("algoEntreArrobaYPunto",algoEntreArrobaYPunto);
        console.log("algoDespuesPunto",algoDespuesPunto);*/
        this.router.navigate(['/menu']);
      
      
      
      }else {
        this.correoYContrasenaInvalido('bottom');
      }
      

    }

  }
  async CamposVacios(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Por favor, rellene los campos en blanco',
      duration: 1500,
      position: position,
    });

    await toast.present();
  } 

  async correoYContrasenaInvalido(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Correo o contraseña incorrecta.',
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
