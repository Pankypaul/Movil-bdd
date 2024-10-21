import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

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
  codigo = Math.floor(100000 + Math.random() * 900000);
  //codigo: string = 'hola123';
  //codigo = this.bd.codigo(6);


  validarContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!-_()]).{8,}$/;


  constructor(private router: Router,
    private toastController: ToastController,
    private bd: ServicebdService
    , private alertController: AlertController,
    ) { }

  ngOnInit() {

    //console.log(this.codigo);

  }

  recuperarContrasena1() {

    this.mensaje_1 = '';
    this.correo = this.correo.toLowerCase();
    this.correo = this.correo.replace(/\s+/g, '');
    this.correo = this.correo.trim(); // Para el correo0

    if (this.correo == "") {
      this.mensaje_1 = 'El correo es obligatorio ';
    }

    if (!this.correo) {
      console.log("Porfavor, rellene los campos en blanco");
      this.CamposVacios('bottom');
    } else if (this.correo.length >= 50) {
      this.maxCaracter('bottom')
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

      if (tieneArroba && posicionArroba && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto) {
        //console.log("El correo es válido");
        this.bd.isDBReady.subscribe(async (val) => {
          if (val) {

            const correoUnico = await this.bd.seleccionarVerificacionCorreo(this.correo); // true == correo existe 

            if (correoUnico) {
              let navigationsExtras: NavigationExtras = {
                state: {
                  correo: this.correo,
                  codigo: this.codigo
                }
              }

              this.router.navigate(['/codigo-email'], navigationsExtras);  //Página donde se coloca el codigo que llega al correo.
              
              this.recuperarContrasena();
            } else {
              this.mensaje_1 = 'El correo no existe'
            }
          }
        }
      )} else {
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

  async presentAlert(titulo_publi: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo_publi,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  recuperarContrasena() {
    
    this.bd.correo(this.correo, this.codigo).subscribe(
      response => {
        // Si el envío del correo fue exitoso
        console.log('response', response);
        //this.presentAlert('Correo enviado', 'Se mandó un código para el cambio de contraseña. Verifique su correo.');
      },
      error => {
        // Manejo del error en caso de fallo
        console.error('Error al enviar el correo:', error);
        //this.presentAlert("Error", "No se envió el correo electrónico. Detalles: " + (error.error || error.message || 'Error desconocido'));
      }
    );
  }





}

