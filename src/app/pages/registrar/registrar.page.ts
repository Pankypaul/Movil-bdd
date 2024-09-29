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
  email: string = '';
  password: string = '';
  password2: string = '';
  nombre: string = '';
  tipo: string = "";
  numero: string = "";
  apellido: string = "";

  valor: string = "+56";
  
  photoUrl: string = ''; // Inicializa photoUrl como cadena vacía
  public hasPhoto: boolean = false; // Variable para determinar si hay una foto




  validarContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!-_()]).{8,}$/;

  constructor(private router: Router, private toastController: ToastController,
    public popoverController: PopoverController,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
  }

  //---------------------------------------------------------------------------------
  // SACA LA FOTO DE LA GALERIA 
  //---------------------------------------------------------------------------------

  async takePhotoFromGallery() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });

      if (photo.webPath) {
        this.photoUrl = photo.webPath;
        this.hasPhoto = true; // Actualiza el estado a que hay una foto
      } else {
        console.error('No se obtuvo una URL válida para la foto');
      }

    } catch (error) {
      console.error('Error al tomar la foto:', error);
      this.handlePhotoError(error);
    }
  }

  //---------------------------------------------------------------------------------
  // BORRA LA FOTO
  //---------------------------------------------------------------------------------

  clearPhoto() {
    this.photoUrl = ''; // Restablece photoUrl para ocultar la imagen
    this.hasPhoto = false; // Actualiza el estado a que no hay foto
  }

  //---------------------------------------------------------------------------------
  //TOMA LA FOTO DESDE LA CAMARA
  //---------------------------------------------------------------------------------

  async takePhotoFromCamera() {
    try {

      defineCustomElements(window);

      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, // Fuente de la cámara
      });

      if (photo.webPath) {
        this.photoUrl = photo.webPath;
        this.hasPhoto = true; // Actualiza el estado a que hay una foto
      } else {
        console.error('No se obtuvo una URL válida para la foto');
      }
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      this.handlePhotoError(error);
    }
  }
  handlePhotoError(error: any) {
    if (error.message.includes('User cancelled photos app')) {
      console.warn('El usuario canceló la selección de la foto.');
      // Opcionalmente, muestra un mensaje al usuario.
    } else {
      console.error('Error al tomar la foto:', error);
    }
  }

  // Nueva función para mostrar el Action Sheet
  async presentActionSheet() {
    const actionSheetButtons = [
      {
        text: 'Elegir foto de la galería',
        role: 'destructive',
        data: {
          action: 'Elegir foto de la galería',
        },
        handler: () => {
          this.takePhotoFromGallery(); // Llamar a la función para elegir una foto
        }
      },
      {
        text: 'Tomar foto',
        data: {
          action: 'Tomar foto',
        },
        handler: () => {
          this.takePhotoFromCamera(); // Llamar a la función para tomar una foto
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        data: {
          action: 'cancelar',
        },
        handler: () => {
          console.log('Cancelar clicado');
        }
      }
    ];

    // Condicionalmente agregar el botón "Borrar" si hay una foto
    if (this.hasPhoto) {
      actionSheetButtons.unshift({
        text: 'Borrar',
        role: 'destructive',
        data: {
          action: 'Borrar',
        },
        handler: () => {
          this.clearPhoto(); // Llamar a la función para borrar la foto
        }
      });
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: actionSheetButtons,
    });

    await actionSheet.present();
  }

  irPagina() {
    let navigationextras: NavigationExtras = {
      state: {
        tip: this.tipo,
        contra: this.password,
        correo1: this.email
      }
    }

    if (!this.email || !this.password || !this.nombre || !this.password2 || !this.numero || this.tipo == "") {
      this.CamposVacios('bottom');

    } else if (this.email.length >= 50 || this.password.length >= 25) {
      this.maxCaracter('bottom')
    } else {

      /*// Validación mejorada del correo (Devuelve numeros)
      const tieneArroba = this.email.includes('@');       //Incluye '@'
      const posicionArroba = this.email.indexOf('@');     //Ver la posición del '@'
      const posicionPunto = this.email.lastIndexOf('.');  //Incluye si incluye '.'

      //indexOf(): Se utiliza para encontrar la primera aparición de un carácter o subcadena.
      //lastIndexOf(): Se utiliza para encontrar la última aparición de un carácter o subcadena.

      const algoAntesArroba = posicionArroba > 0; // Asegura que haya algo antes del '@'
      const algoEntreArrobaYPunto = posicionPunto > posicionArroba + 1; // Asegura que haya algo entre el '@' y el '.'
      const algoDespuesPunto = posicionPunto < this.email.length - 1; // Asegura que haya algo después del '.'*/

      const tieneArroba = (this.email.match(/@/g) || []).length === 1; // Verifica que solo haya un '@'
      const tieneCaracteresInvalidos = /[(),<>;:\[\]{}]/.test(this.email); // Verifica caracteres no permitidos

      const posicionArroba = this.email.indexOf('@');
      const posicionPunto = this.email.lastIndexOf('.');

      const algoAntesArroba = posicionArroba > 0; // Asegura que haya algo antes del '@'
      const algoEntreArrobaYPunto = posicionPunto > posicionArroba + 1; // Asegura que haya algo entre el '@' y el '.'
      const algoDespuesPunto = posicionPunto < this.email.length - 1; // Asegura que haya algo después del '.'

      if (tieneArroba && !tieneCaracteresInvalidos && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto) {
        console.log("El correo es válido");
      } else {
        //this.mensaje_2 = 'El Correo no es válido';
      }

      if (tieneArroba && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto) {
        console.log("El correo es válido");

        if ((this.password.length < 8 || !this.validarContraseña.test(this.password))) {
          this.contrasenaInvalido('bottom')
          console.log("CON1");
        } else {

          if (this.password2.length < 8 || !this.validarContraseña.test(this.password2)) {
            this.contrasenaInvalido('bottom')
            console.log("CON2");
          } else {

            if (this.password == this.password2) {
              this.router.navigate(['/login'], navigationextras);

            } else {
              this.contrasena('bottom');
            }
          }

        }


      } else {
        this.correoInvalido('bottom');
      }
    }
    //Ver los datos que pusimos

    console.log("----------------------------------------------");
    console.log('Nombre:', this.nombre);
    console.log('Apellido:', this.apellido);
    console.log('Correo:', this.email);
    console.log('Tipo:', this.tipo);
    console.log('Telefono:', this.numero);
    console.log('Contraseña:', this.password);
    console.log('Contraseña2:', this.password2);
    console.log("----------------------------------------------");


  }



  onSubmit() {
    // Navegar a otra página si el formulario es válido
    //this.router.navigate(['/menu']);

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


  // Funcion que reestige poner numeros al nombre
  restrictInput(event: KeyboardEvent) {
    const key = event.key;
    const regex = /^[0-9]$/;  // Permitir solo dígitos


    // Permitir solo números y teclas especiales
    if (!regex.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
      event.preventDefault();
    }

    // Limitar a 9 caracteres
    if (this.numero.length >= 9 && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
      event.preventDefault();
    }


  }
  // Método para obtener el número completo con el prefijo
  getFullNumber() {
    return `+56${this.numero}`;  // Retorna el número completo
  }

}

