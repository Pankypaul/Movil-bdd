import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

import { PopoverController } from '@ionic/angular';



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
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private bd: ServicebdService) { }

  ngOnInit() {
  }

  async presentAlert(nombre_usuario: string, msj: string) {
    const alert = await this.alertController.create({
      header: nombre_usuario,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }



  irPagina() {  //this.isEditable = !this.isEditable;

    this.mensaje_1 = "";
    this.mensaje_2 = "";
    this.mensaje_3 = "";
    this.mensaje_4 = "";
    this.mensaje_5 = "";
    this.mensaje_6 = "";

    if (!this.perfil.tipo) {
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

    if (this.validarContraseña.test(this.perfil.password)) {
      console.log('Paso la contraseña');
    }

    if (this.validarContraseña.test(this.perfil.password2)) {
      console.log('Paso repetir contraseña');
    }

    if (this.perfil.password.length !== this.perfil.password2.length) {
      this.mensaje_5 = 'Las contraseñas no son iguales';
      this.mensaje_6 = 'Las contraseñas no son iguales';

    }
    
    this.bd.isDBReady.subscribe(async (val) => {
      if (val) {
        const correoUnico = await this.bd.seleccionarVerificacionCorreo(this.perfil.correo);

        if (correoUnico) {
          // Mostrar mensaje de error
          this.mensaje_3 = 'El Correo ya esta registrado.';
        } 
      }
    });

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
      isTelefonoValido && isNombreValido && this.perfil.tipo && this.validarContraseña.test(this.perfil.password2) === this.validarContraseña.test(this.perfil.password2)) {
      console.log('Pasa todo');
      
      const telefono = Number(this.perfil.telefono);


      this.bd.isDBReady.subscribe(async (val) => {
        if (val) {
          const correoUnico = await this.bd.seleccionarVerificacionCorreo(this.perfil.correo);

          if (correoUnico) {
            // Mostrar mensaje de error
            this.mensaje_3 = 'El Correo ya esta registrado.';
          } else {
            //  this.presentAlert('ingreso de datos', 'nombre ' + this.perfil.tipo + (', ') + this.perfil.correo + (', ') + this.perfil.password)
            this.bd.insertarUsuario(this.perfil.nombre, this.perfil.correo, telefono, this.perfil.password, 1, '', '');
            this.router.navigate(['/login'])
          }
        }
      });


    }



  }


}

