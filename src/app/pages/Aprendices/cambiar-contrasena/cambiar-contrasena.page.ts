import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {
  correo: string = '';
  antigua: string = '';
  nueva: string = '';
  repetirNueva: string = '';

  mensaje_1!: string;
  mensaje_2!: string;
  mensaje_3!: string;
  mensaje_4!: string;

  id!: number; //id del localStorage
  rol!: number; //rol del localStorage
  
  arregloUsuario: any = [
    {
      rol_id_rol: '',
      nombre_usuario: '',
      telefono_usuario: '',
      correo_usuario: '',
      foto: '',
      descripcion: '',
      id_usuario: '',

    }
  ];


  validarContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!-_()]).{8,}$/;


  constructor(private router: Router, 
              private toastController: ToastController, 
              private bd: ServicebdService,
              private storage: NativeStorage,
              private alertController: AlertController) { }

  ngOnInit() {

    this.bd.dbState().subscribe(data => {
      // validar si la bd está lista
      if (data) {
        // suscribirse al observable de fetchUsuario
        this.bd.fetchUsuario().subscribe(res => {
          this.arregloUsuario = res;
        })
      }
    })

    this.storage.getItem('Rol').then((rol: number) => {
      this.rol = rol;
    }).catch(err => {
      console.error('Error al obtener el rol:', err);
    });

    this.storage.getItem('Id').then((id: number) => {
      this.id = id;
    }).catch(err => {
      console.error('Error al obtener el rol:', err);
    });
  }

  onSubmit(contrasena_usuario: string, correo1: string) {

    this.mensaje_1 = '';
    this.mensaje_2 = '';
    this.mensaje_3 = '';
    this.mensaje_4 = '';

    this.correo = this.correo.replace(/\s+/g, '');
    this.correo = this.correo.trim(); // Para el correo
    this.antigua = this.antigua.trim();
    this.nueva = this.nueva.trim();
    this.repetirNueva = this.repetirNueva.trim(); // Para el correo



    if (this.correo === "") {
      this.mensaje_1 = 'El correo es obligatorio';
    }

    if (this.antigua === "") {
      this.mensaje_4 = 'La contraseña antigua es obligatorio ';
    }

    if (this.nueva === "") {
      this.mensaje_2 = 'La contraseña es obligatorio ';
    }

    if (this.repetirNueva === "") {
      this.mensaje_3 = 'La contraseña es obligatorio ';
    }

    if (this.correo.trim() !== "" || this.antigua.trim() !== "" || this.nueva.trim() !== "" && this.repetirNueva.trim() !== "") {

      const tieneArroba = (this.correo.match(/@/g) || []).length === 1; // Verifica que solo haya un '@'
      const tieneCaracteresInvalidos = /[(),<>;:\[\]{}]/.test(this.correo); // Verifica caracteres no permitidos

      const posicionArroba = this.correo.indexOf('@');
      const posicionPunto = this.correo.lastIndexOf('.');

      const algoAntesArroba = posicionArroba > 0; // Asegura que haya algo antes del '@'
      const algoEntreArrobaYPunto = posicionPunto > posicionArroba + 1; // Asegura que haya algo entre el '@' y el '.'
      const algoDespuesPunto = posicionPunto < this.correo.length - 1; // Asegura que haya algo después del '.'


      if (!this.correo || this.correo.trim() === "" || this.correo.trim().toUpperCase() === "NONE") {
        this.mensaje_2 = 'El Correo es obligatorio';
      }
      else {

        if (tieneArroba && !tieneCaracteresInvalidos && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto) {
          console.log("El correo es válido");
        } else {
          this.mensaje_1 = 'El Correo no es válido';
        }
      }

      if(this.antigua !== contrasena_usuario){
        this.mensaje_4 = 'La contraseña no coincide';
      }

      if(correo1 !== this.correo){
        this.mensaje_1 = 'El correo no coincide'
      }


      if (this.nueva !== this.repetirNueva) {
        this.mensaje_2 = 'Las contraseñas no son iguales ';
        this.mensaje_3 = 'Las contraseñas no son iguales ';
        //this.contrasena('bottom');
      }
      // Validar la contraseña
      if (this.nueva.trim() !== "" && this.repetirNueva.trim() !== "") {
        if (!this.validarContraseña.test(this.nueva) || this.nueva.length < 8) {
          this.mensaje_2 = 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
        }

        if (!this.validarContraseña.test(this.repetirNueva) || this.repetirNueva.length < 8) {
          this.mensaje_3 = 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
        }

      }

      if ((correo1 === this.correo) && (this.antigua === contrasena_usuario) && this.validarContraseña.test(this.repetirNueva) && this.nueva.length >= 8 && (this.validarContraseña.test(this.nueva)) && this.repetirNueva.length >= 8 && this.nueva.trim() !== "" && this.repetirNueva.trim() !== "" && this.nueva.trim() === this.repetirNueva.trim() && tieneArroba && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto) {
        
        this.bd.modificarContrasena(this.id, this.correo, this.nueva);
        this.correo = '';
        this.antigua = '';
        this.nueva = '';
        this.repetirNueva = '';

        this.presentAlert12('cambio de contraseña', this.correo +(' ')+ this.nueva)
        this.router.navigate(['/menu']);

      }
    }
  }

  async presentAlert12(title: string, msj: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
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

