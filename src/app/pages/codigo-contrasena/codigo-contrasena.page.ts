import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-codigo-contrasena',
  templateUrl: './codigo-contrasena.page.html',
  styleUrls: ['./codigo-contrasena.page.scss'],
})
export class CodigoContrasenaPage implements OnInit {

  constructor(private router: Router,
    private toastController: ToastController,
    private bd: ServicebdService,
    private storage: NativeStorage,
    private alertController: AlertController,
    private activedrouter: ActivatedRoute) { 
      this.activedrouter.queryParams.subscribe(() => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.correo = this.router.getCurrentNavigation()?.extras?.state?.['correo'];
        }
      })
    }

  correo: string = '';
  nueva: string = '';
  repetirNueva: string = '';

  mensaje_1!: string;
  mensaje_2!: string;
  mensaje_3!: string;
  mensaje_4!: string;


  validarContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!-_()]).{8,}$/;

  ngOnInit() {
  }

  cambiar() {
    this.mensaje_2 = '';
    this.mensaje_3 = '';
  
    this.nueva = this.nueva.trim();
    this.repetirNueva = this.repetirNueva.trim();
    
    if (this.nueva.length < 8 || !this.validarContraseña.test(this.nueva)) {
      this.mensaje_2 = 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
    }

    if (this.repetirNueva.length < 8 || !this.validarContraseña.test(this.repetirNueva)) {
      this.mensaje_3 = 'La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
    }
    
    if (this.nueva !== this.repetirNueva) {
      this.mensaje_2 = 'Las contraseñas no son iguales';
      this.mensaje_3 = 'Las contraseñas no son iguales';
    }
  
    // Si las validaciones son exitosas
    if (this.validarContraseña.test(this.nueva) && this.nueva.length >= 8 && this.validarContraseña.test(this.repetirNueva) && this.repetirNueva.length >= 8 && this.nueva === this.repetirNueva) {
      // Lógica para cambiar la contraseña
      this.bd.modificarContrasenaCodigo( this.correo, this.nueva);
      // Limpiar los campos
      this.mensaje_2 = '';
      this.mensaje_3 = '';
      this.nueva = '';
      this.repetirNueva = '';

      
      
      // Navegar a la página de codigo-email
      this.router.navigate(['/login']);
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


