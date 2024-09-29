import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';

import { PopoverController } from '@ionic/angular';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // ESTO ES DE LA CAMARA
import { defineCustomElements } from '@ionic/pwa-elements/loader'; // ESTO ES DE LA CAMARA

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {



   perfil = {

    nombre: '',
    tipo: '',
    correo: '',
    telefono: '',
    password: '',
    password2: '',
};


  mensaje_1: string = "";
  mensaje_2: string = "";
  mensaje_3: string = "";
  mensaje_4: string = "";
  mensaje_5: string = "";
  mensaje_6: string = "";

  photoUrl: string = ''; // Inicializa photoUrl como cadena vacía
  public hasPhoto: boolean = false; // Variable para determinar si hay una foto




  validarContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!-_()]).{8,}$/;

  constructor(private router: Router, private toastController: ToastController,
    public popoverController: PopoverController,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }


  irPagina() {  //this.isEditable = !this.isEditable;

    this.mensaje_1 = "";
    this.mensaje_2 = "";
    this.mensaje_3 = "";
    this.mensaje_4 = "";
    this.mensaje_5 = "";
    this.mensaje_6 = "";

    if(!this.perfil.tipo ){
      this.mensaje_2 = 'Elija un opción';
    }

    this.perfil.nombre = this.perfil.nombre.trim(); // Elimina los espacios vacios
    this.perfil.correo = this.perfil.correo.replace(/\s+/g, '');
    this.perfil.correo = this.perfil.correo.trim(); // Para el correo


    const isNombreValido = this.perfil.nombre.length > 1 &&
      this.perfil.nombre.trim().toUpperCase() !== "NONE" && this.perfil.nombre.trim();

    const comillas = String(this.perfil.telefono).indexOf('´'); // Encuentra la posición de la comilla

    const isTelefonoValido = String(this.perfil.telefono).length === 9 && comillas === -1; // Asegúrate de que no haya comilla


    const tieneArroba = (this.perfil.correo.match(/@/g) || []).length === 1; // Verifica que solo haya un '@'
    const tieneCaracteresInvalidos = /[(),<>;:\[\]{}]/.test(this.perfil.correo); // Verifica caracteres no permitidos

    const posicionArroba = this.perfil.correo.indexOf('@');
    const posicionPunto = this.perfil.correo.lastIndexOf('.');

    const algoAntesArroba = posicionArroba > 0; // Asegura que haya algo antes del '@'
    const algoEntreArrobaYPunto = posicionPunto > posicionArroba + 1; // Asegura que haya algo entre el '@' y el '.'
    const algoDespuesPunto = posicionPunto < this.perfil.correo.length - 1; // Asegura que haya algo después del '.'

    if (!this.perfil.nombre || this.perfil.nombre.trim() === "" || this.perfil.nombre.trim().toUpperCase() === "NONE") {
      this.mensaje_1 = 'El nombre es obligatorio y no puede estar vacio.';
    }

    if (!this.perfil.correo || this.perfil.correo.trim() === "" || this.perfil.correo.trim().toUpperCase() === "NONE") {
      this.mensaje_3 = 'El Correo es obligatorio';
    }
    else {

      if (tieneArroba && !tieneCaracteresInvalidos && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto) {
        console.log("El correo es válido");
      } else {
        this.mensaje_3 = 'El Correo no es válido';
      }
    }




    const comilla = String(this.perfil.telefono).indexOf('´');
    if (comilla !== -1) {
      // La comilla (´) está presente en el correo
      this.mensaje_4 = 'El telefono no puede contener la comilla (´).';
    } else {
      this.mensaje_4 = ''; // Limpiar el mensaje si no hay comillas
    }

    if (isTelefonoValido) {
      this.mensaje_4 = '';
    }
    else {
      this.mensaje_4 = 'El teléfono es obligatorio';

    }


    this.perfil.password = this.perfil.password.trim();
    this.perfil.password2 = this.perfil.password2.trim();

    if (this.perfil.password.length < 8 || !this.validarContraseña.test(this.perfil.password)) {
      this.mensaje_5 = 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';

    }

    if (this.perfil.password2.length < 8 || !this.validarContraseña.test(this.perfil.password2)) {
      this.mensaje_6 = 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
    }

    if(this.validarContraseña.test(this.perfil.password)){
      console.log('Paso la contraseña');
    }

    if(this.validarContraseña.test(this.perfil.password2)){
      console.log('Paso repetir contraseña');
    }

    if (this.perfil.password.length !== this.perfil.password2.length) {
      this.mensaje_5 = 'Las contraseñas no son iguales';
      this.mensaje_6 = 'Las contraseñas no son iguales';

    }

    console.log("----------------------------------------------");
    console.log('Nombre:', this.perfil.nombre);
    console.log('Correo:', this.perfil.correo);
    console.log('Tipo:', this.perfil.tipo);
    console.log('Telefono:', this.perfil.telefono);
    console.log('Contraseña:', this.perfil.password);
    console.log('Contraseña2:', this.perfil.password2);
    console.log("----------------------------------------------");



    if (tieneArroba &&
      !tieneCaracteresInvalidos &&
      algoAntesArroba &&
      algoEntreArrobaYPunto &&
      algoDespuesPunto &&
      isTelefonoValido && isNombreValido && this.perfil.tipo && this.validarContraseña.test(this.perfil.password2) ===  this.validarContraseña.test(this.perfil.password2)) {
      console.log('Pasa todo');
    }


  }

  /*irPagina() {
    /*let navigationextras: NavigationExtras = {
      state: {
        tip: this.tipo,
        contra: this.password,
        correo1: this.email
      }
    }

    this.mensaje_1 = '';
    this.mensaje_2 = '';
    this.mensaje_3 = '';
    this.mensaje_4 = '';
    this.mensaje_5 = '';
    this.mensaje_6 = '';


    this.email = this.email.replace(/\s+/g, '');
    this.email = this.email.trim(); // Para el correo
    this.nombre = this.nombre.trim();  // Elimina los espacios vacios


    if (!this.tipo) {
      this.mensaje_2 = 'El tipo de usuario es obligatorio';
    }

    const isNombreValido = this.nombre.length > 1 &&
      this.nombre.trim().toUpperCase() !== "NONE" && this.nombre.trim();

    const comillas = String(this.numero).indexOf('´'); // Encuentra la posición de la comilla

    const isTelefonoValido = String(this.numero).length === 9 && comillas === -1; // Asegúrate de que no haya comilla


    const tieneArroba = (this.email.match(/@/g) || []).length === 1; // Verifica que solo haya un '@'
    const tieneCaracteresInvalidos = /[(),<>;:\[\]{}]/.test(this.email); // Verifica caracteres no permitidos

    const posicionArroba = this.email.indexOf('@');
    const posicionPunto = this.email.lastIndexOf('.');

    const algoAntesArroba = posicionArroba > 0; // Asegura que haya algo antes del '@'
    const algoEntreArrobaYPunto = posicionPunto > posicionArroba + 1; // Asegura que haya algo entre el '@' y el '.'
    const algoDespuesPunto = posicionPunto < this.email.length - 1; // Asegura que haya algo después del '.'

    if (!this.nombre || this.nombre.trim() === "" || this.nombre.trim().toUpperCase() === "NONE") {
      this.mensaje_1 = 'El nombre es obligatorio y no puede estar vacio.';
    }


    if (!this.numero || String(this.numero).trim() === "" || String(this.numero).trim().toUpperCase() === "NONE") {
      this.mensaje_4 = 'El telefono es obligatorio';
    }

    const comilla = String(this.numero).indexOf('´');
    if (comilla !== -1) {
      // La comilla (´) está presente en el correo
      this.mensaje_4 = 'El telefono no puede contener la comilla (´).';
    }

    if (String(this.numero).length < 9) {
      this.mensaje_4 = 'El telefono debe tener 9 digitos';

    }

    if (tieneArroba && !tieneCaracteresInvalidos && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto) {
      console.log("El correo es válido");
    } else {
      this.mensaje_3 = 'El Correo no es válido';
    }



    this.password = this.password.trim();
    this.password2 = this.password2.trim();

    if (this.password.length < 8 || !this.validarContraseña.test(this.password)) {
      this.mensaje_5 = 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';

    }

    if (this.password2.length < 8 || !this.validarContraseña.test(this.password2)) {
      this.mensaje_6 = 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
    }




    if (this.password.length !== this.password2.length) {
      this.mensaje_5 = 'Las contraseñas no son iguales';
      this.mensaje_6 = 'Las contraseñas no son iguales';

    }

    console.log("----------------------------------------------");
    console.log('Nombre:', this.nombre);
    console.log('Correo:', this.email);
    console.log('Tipo:', this.tipo);
    console.log('Telefono:', this.numero);
    console.log('Contraseña:', this.password);
    console.log('Contraseña2:', this.password2);
    console.log("----------------------------------------------");
    if (
      tieneArroba && !tieneCaracteresInvalidos && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto && isTelefonoValido 
      && isNombreValido && !this.email.trim() && this.password.trim() == this.password2.trim() && !this.password && !this.password2 
      && !this.tipo && this.numero.length === 8) {
        console.log('pasa todo');
      //this.router.navigate(['/login']);

      //correo, constraseñas, repetir constraseñas, tipo, telefono, nombre
      console.log('pasa todo');
    }

  }




  restrictInput(event: KeyboardEvent) {
    const key = event.key;
    const regex = /^[0-9]$/;  // Permitir solo dígitos

    // Permitir solo números y teclas especiales
    if (!regex.test(key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key)) {
      event.preventDefault();
    }

    // Limitar a 9 caracteres
    if (String(this.numero).length >= 9 && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key)) {
      event.preventDefault(); // Prevenir la entrada de más caracteres si no es una tecla de control
    }
  }



  onSubmit() {
    // Navegar a otra página si el formulario es válido
    //this.router.navigate(['/menu']);

  }






  validarTexto(event: any) {
    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/; // Solo letras y espacios
    let input = event.target.value;

    if (!pattern.test(input)) {
      // Si no cumple con el patrón, eliminamos los caracteres inválidos
      event.target.value = input.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }

    // Actualizamos el valor del modelo
    this.nombre = event.target.value;
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

  async contrasenaInvalido(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Contraseña invalida.',
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



  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: RegistrarPage,
      event: e,
      componentProps: {
        message: 'Este es un texto dentro del popover'
      },
    });

    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log(`Popover dismissed with role: ${role}`);
  }






  // Método para obtener el número completo con el prefijo
  getFullNumber() {
    return `+56${this.numero}`;  // Retorna el número completo
  }*/

}

