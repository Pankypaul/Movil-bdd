import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { /*NavigationExtras,*/ ActivatedRoute, Router } from '@angular/router';
import { ToastController, ActionSheetController, AlertController } from '@ionic/angular';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // ESTO ES DE LA CAMARA
import { defineCustomElements } from '@ionic/pwa-elements/loader'; // ESTO ES DE LA CAMARA
//import { NONE_TYPE } from '@angular/compiler';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

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

  id!: number;

  mensaje_1: string = "";
  mensaje_2: string = "";
  mensaje_3: string = "";
  mensaje_4: string = "";
  mensaje_5: string = "";

  perfil: any = [
    {
      nombre_usuario: '',
      correo_usuario: '',
      telefono_usuario: '',
      descripcion: '',
      foto: '',
      id_usuario: ''
    }
  ]

  constructor(private router: Router,
    private toastController: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private bd: ServicebdService,
    private storage: NativeStorage,
    private alertController: AlertController,
    private activedrouter: ActivatedRoute,
    private cdr: ChangeDetectorRef) {
    /*this.activedrouter.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.perfil = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
      }
    })*/
  }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      //validar si la bd esta lista
      if (data) {
        //subscribir al observable de la listaNoticias
        this.bd.fetchUsuario().subscribe(res => {
          this.perfil = res;
        })
      }
    })

    this.storage.getItem('Id').then((id: number) => {
      this.id = id;
    }).catch(err => {
      console.error('Error al obtener el rol:', err);
    });
  }

  validateName(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^A-Za-z\s]/g, '');
  }

  validateNumero(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, ''); // Permite solo dígitos numéricos
  }


  validarTexto(event: any) {
    const pattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/; // Solo letras y espacios
    let input = event.target.value;

    if (!pattern.test(input)) {
      // Si no cumple con el patrón, eliminamos los caracteres inválidos
      event.target.value = input.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }

    // Actualizamos el valor del modelo
    this.perfil.nombre_usuario = event.target.value;
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
    if (String(this.perfil.telefono_usuario).length >= 9 && !['Backspace', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      event.preventDefault(); // Prevenir la entrada de más caracteres si no es una tecla de control
    }



  }

  validarCorreo(event: any) {
    const input = event.target.value;

    // Permitir que el campo esté vacío
    if (input === '') {
      this.mensaje_2 = ''; // Limpiar el mensaje de error
      this.perfil.correo_usuario = input; // Actualizar el modelo
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
    this.perfil.correo_usuario = event.target.value;
  }


  irPagina(nombre_usuario: string, correo_usuario: string, telefono_usuario: number, descripcion: string, foto: string) {  //this.isEditable = !this.isEditable;




    this.mensaje_1 = "";
    this.mensaje_2 = "";
    this.mensaje_3 = "";
    this.mensaje_4 = "";

    nombre_usuario = nombre_usuario.trim(); // Elimina los espacios vacios
    correo_usuario = correo_usuario.replace(/\s+/g, '');
    correo_usuario = correo_usuario.trim(); // Para el correo


    const isDescripcionValida = descripcion.trim() !== "" &&
      descripcion.trim().toUpperCase() !== "NONE";

    const isNombreValido = nombre_usuario.length > 1 &&
      nombre_usuario.trim().toUpperCase() !== "NONE" && nombre_usuario.trim();

    const comillas = String(telefono_usuario).indexOf('´'); // Encuentra la posición de la comilla

    const isTelefonoValido = String(telefono_usuario).length === 9 && comillas === -1; // Asegúrate de que no haya comilla


    const tieneArroba = (correo_usuario.match(/@/g) || []).length === 1; // Verifica que solo haya un '@'
    const tieneCaracteresInvalidos = /[(),<>;:\[\]{}]/.test(correo_usuario); // Verifica caracteres no permitidos

    const posicionArroba = correo_usuario.indexOf('@');
    const posicionPunto = correo_usuario.lastIndexOf('.');

    const algoAntesArroba = posicionArroba > 0; // Asegura que haya algo antes del '@'
    const algoEntreArrobaYPunto = posicionPunto > posicionArroba + 1; // Asegura que haya algo entre el '@' y el '.'
    const algoDespuesPunto = posicionPunto < correo_usuario.length - 1; // Asegura que haya algo después del '.'

    if (!nombre_usuario || nombre_usuario.trim() === "" || nombre_usuario.trim().toUpperCase() === "NONE") {
      this.mensaje_1 = 'El nombre es obligatorio y no puede estar vacio.';
    }

    if (!correo_usuario || correo_usuario.trim() === "" || correo_usuario.trim().toUpperCase() === "NONE") {
      this.mensaje_2 = 'El correo_usuario es obligatorio';
    }
    else {

      if (tieneArroba && !tieneCaracteresInvalidos && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto) {
        console.log("El correo es válido");
      } else {
        this.mensaje_2 = 'El Correo no es válido';
      }
    }




    const comilla = String(telefono_usuario).indexOf('´');
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


    if (!descripcion || descripcion.trim() === "" || descripcion.trim().toUpperCase() === "NONE") {
      this.mensaje_4 = 'Rellene este campo';
    }


    if (tieneArroba &&
      !tieneCaracteresInvalidos &&
      algoAntesArroba &&
      algoEntreArrobaYPunto &&
      algoDespuesPunto &&
      isTelefonoValido &&
      isDescripcionValida && isNombreValido) {
      this.bd.isDBReady.subscribe(async (val) => {
        if (val) {

          const correoActual = await this.bd.seleccionarCorreo(this.id);

          const correoUnico = await this.bd.seleccionarVerificacionCorreo(correo_usuario); // true == correo existe 

          //const correo_encontrado = correoUnico?.correo_usuario

          console.log('correo actual ', correoActual);
          //   p  !== a && false ()
          if (correo_usuario !== correoActual && !correoUnico) {
            // Concatenación mejorada con template literals
            this.presentAlert12('correo_usuario !== correoActual && !correoUnico', `ID4: ${this.id}, Nombre: ${nombre_usuario}) : ${correo_usuario} ${descripcion} ${foto} `);
            // Asegúrate de que el orden de los parámetros es el correcto
            this.bd.modificarUsuario(this.id, nombre_usuario, correo_usuario, telefono_usuario, descripcion, foto);
            //window.location.reload();
            // Cambia el estado de edición
            this.isEditable = !this.isEditable;
          }

          //   p !== a && true
          if (correo_usuario !== correoActual && correoUnico) {

            // Mostrar mensaje de error
            this.mensaje_2 = 'El Correo ya esta registrado.';// Si es true, significa que el correo ya existe

          } if (correo_usuario === correoActual) {
            // Concatenación mejorada con template literals
            this.presentAlert12('correo_usuario === correoActual', `ID3: ${this.id}, Nombre: ${nombre_usuario}) : ${correo_usuario} ${descripcion} ${foto} `);
            // Asegúrate de que el orden de los parámetros es el correcto
            this.bd.modificarUsuario(this.id, nombre_usuario, correo_usuario, telefono_usuario, descripcion, foto);
            //window.location.reload();
            // Cambia el estado de edición
            this.isEditable = !this.isEditable;
          }

        }


      })
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
    this.perfil = { ...this.originalPerfil };
    this.isEditable = false;
    //this.cdr.detectChanges();
    window.location.reload();
    //this.perfil.reset();
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
