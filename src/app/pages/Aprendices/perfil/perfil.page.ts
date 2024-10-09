import { Component, OnInit } from '@angular/core';
import { /*NavigationExtras,*/ Router } from '@angular/router';
import { ToastController, ActionSheetController } from '@ionic/angular';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // ESTO ES DE LA CAMARA
import { defineCustomElements } from '@ionic/pwa-elements/loader'; // ESTO ES DE LA CAMARA
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  /*nombre:string="";
  correo:string="";
  telefono:string="";
  tip:string="";
  descripcion:string="";
  imagen:string="";*/


  photoUrl: string = ''; // Inicializa photoUrl como cadena vacía
  public hasPhoto: boolean = false; // Variable para determinar si hay una foto

  isEditable = false; // Inicialmente el perfil no es editable

  originalPerfil: any; // Copia del objeto de perfil original

  mensaje_1: string = "";
  mensaje_2: string = "";
  mensaje_3: string = "";
  mensaje_4: string = "";
  mensaje_5: string = "";

  perfil = {
    nombre: 'Juan Pérez',
    correo: 'juan@example.com',
    telefono: 923428729,
    tip: 'Aprendiz',
    descripcion: 'Soy un desarrollador apasionado por la tecnología.',
    imagen: 'assets/icon/pato.jpg'
  };

  constructor(private router: Router,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
  }

  validarTexto(event: any) {
    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/; // Solo letras y espacios
    let input = event.target.value;

    if (!pattern.test(input)) {
      // Si no cumple con el patrón, eliminamos los caracteres inválidos
      event.target.value = input.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }

    // Actualizamos el valor del modelo
    this.perfil.nombre = event.target.value;
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
    if (String(this.perfil.telefono).length >= 9 && !['Backspace', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      event.preventDefault(); // Prevenir la entrada de más caracteres si no es una tecla de control
    }



  }

  validarCorreo(event: any) {
    const input = event.target.value;

    // Permitir que el campo esté vacío
    if (input === '') {
      this.mensaje_2 = ''; // Limpiar el mensaje de error
      this.perfil.correo = input; // Actualizar el modelo
      return; // Salir de la función
    }

    // Expresión regular que permite letras, números, caracteres especiales, y exactamente una "@"
    const pattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]*@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]*$/;

    // Contar las "@" en el valor del input
    const arrobaCount = (input.match(/@/g) || []).length;

    // Si hay más de una "@" o si el valor no cumple con la expresión regular, mostrar error
    if (arrobaCount > 1 || !pattern.test(input) || arrobaCount < 1) {
      this.mensaje_2 = "Correo no válido o tiene más de una '@'.";
    }

    // Actualizar el modelo con el valor corregido
    this.perfil.correo = event.target.value;
  }


  irPagina() {  //this.isEditable = !this.isEditable;

    this.mensaje_1 = "";
    this.mensaje_2 = "";
    this.mensaje_3 = "";
    this.mensaje_4 = "";

    this.perfil.nombre = this.perfil.nombre.trim(); // Elimina los espacios vacios
    this.perfil.correo = this.perfil.correo.replace(/\s+/g, '');
    this.perfil.correo = this.perfil.correo.trim(); // Para el correo


    const isDescripcionValida = this.perfil.descripcion.trim() !== "" &&
      this.perfil.descripcion.trim().toUpperCase() !== "NONE";

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
      this.mensaje_2 = 'El Correo es obligatorio';
    }
    else {

      if (tieneArroba && !tieneCaracteresInvalidos && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto) {
        console.log("El correo es válido");
      } else {
        this.mensaje_2 = 'El Correo no es válido';
      }
    }




    const comilla = String(this.perfil.telefono).indexOf('´');
    if (comilla !== -1) {
      // La comilla (´) está presente en el correo
      this.mensaje_3 = 'El telefono no puede contener la comilla (´).';
    } else {
      this.mensaje_3 = ''; // Limpiar el mensaje si no hay comillas
    }

    if (isTelefonoValido) {
      this.mensaje_3 = '';
    }
    else {
      this.mensaje_3 = 'El teléfono es obligatorio';

    }


    if (!this.perfil.descripcion || this.perfil.descripcion.trim() === "" || this.perfil.descripcion.trim().toUpperCase() === "NONE") {
      this.mensaje_4 = 'Rellene este campo';
    }




    if (tieneArroba &&
      !tieneCaracteresInvalidos &&
      algoAntesArroba &&
      algoEntreArrobaYPunto &&
      algoDespuesPunto &&
      isTelefonoValido &&
      (isDescripcionValida && isNombreValido)) {
      this.isEditable = !this.isEditable;
      console.log('hola');
    }


  }

  // Cambia entre modo de edición y solo lectura
  toggleEditMode() {
    this.isEditable = !this.isEditable;

    if (this.isEditable) {
      // Guarda una copia del perfil original
      this.originalPerfil = { ...this.perfil };
    }
  }



  //Deshace los cambios del perfil 
  cancelEdit() {
    // Restaura los valores originales
    this.perfil = { ...this.originalPerfil };
    // Cambia a modo no editable
    this.isEditable = false;
  }

  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.router.navigate(['/home']); 
      }
    }
  ];

  clearPhoto() {
    this.photoUrl = ''; // Restablece photoUrl para ocultar la imagen
    this.hasPhoto = false; // Actualiza el estado a que no hay foto
  }

  async handlePhoto(source: CameraSource) {
    defineCustomElements(window); // Define los elementos personalizados necesarios
    try {
      // Solicita la foto a la cámara con las opciones especificadas
      const photo = await Camera.getPhoto({
        quality: 90, // Calidad de la imagen
        allowEditing: false, // Permitir edición
        resultType: CameraResultType.Uri, // Tipo de resultado: URI
        source: source, // Fuente de la foto (cámara o galería)
      });

      // Verifica si hay una ruta web disponible
      if (photo.webPath) {
        this.photoUrl = photo.webPath; // Asigna la URL a la variable de instancia
        this.hasPhoto = true; // Marca que hay una foto
      } else {
        // Lanza un error si no se obtuvo una URL válida
        throw new Error('No se obtuvo una URL válida para la foto');
      }
    } catch (error) {
      // Maneja el error de la captura de la foto
      this.handlePhotoError(error);
    }
  }

  async takePhotoFromGallery() {
    await this.handlePhoto(CameraSource.Photos);
  }

  async takePhotoFromCamera() {
    await this.handlePhoto(CameraSource.Camera);
  }


  handlePhotoError(error: any) {
    if (error.message.includes('User cancelled photos app')) {
      console.warn('El usuario canceló la selección de la foto.');
      // Opcionalmente, muestra un mensaje al usuario.
    } else {
      console.error('Error al tomar la foto:', error);
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Publicado con exito',
      duration: 1500,
      position: position,

    });
    this.router.navigate(['/menu1']);

    await toast.present();
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

  /*
  irPagina2() {

    ejemplo contexto  "ojala no sea la misma variable es opcional solo envia una por cada redireccion"
    let navigationextras: NavigationExtras = {

      state: {
        nom: this.perfil.nombre,
        email: this.perfil.correo,
        fono: this.perfil.telefono,
        desc: this.perfil.descripcion,
        img: this.photoUrl
        
      }
    }
    this.router.navigate(['/editar-perfil'],navigationextras);
  }*/


}
