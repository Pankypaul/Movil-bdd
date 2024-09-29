import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ActionSheetController } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // ESTO ES DE LA CAMARA
import { defineCustomElements } from '@ionic/pwa-elements/loader'; // ESTO ES DE LA CAMARA

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  
  photoUrl: string = ''; // Inicializa photoUrl como cadena vacía
  public hasPhoto: boolean = false; // Variable para determinar si hay una foto

  mensaje_1: string = "";
  mensaje_2: string = "";
  mensaje_3: string = "";

  /*a:string="";
  s:string="";
  d:string="";
  f:string="";*/
  imagen:string="";

  isEditable = false; // Inicialmente el perfil no es editable
  perfil = {
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
    telefono: '123-456-7890',
    descripcion: 'Soy un desarrollador apasionado por la tecnología.'
  };

  // Cambia entre modo de edición y solo lectura
  toggleEditMode() {
    this.isEditable = !this.isEditable;
  }

  VerDatos() {
    /*console.log(this.a);
    console.log(this.s);
    console.log(this.d);
    console.log(this.f);*/
    console.log(this.imagen);
  }

  

  constructor(private router:Router ,private toastController:ToastController,
    private actionSheetCtrl: ActionSheetController, private activateroute: ActivatedRoute) { 
    
      this.activateroute.queryParams.subscribe(param => {
        //valido si viene o no información en la ruta
  
        if (this.router.getCurrentNavigation()?.extras.state) {
  
          /*this.a = this.router.getCurrentNavigation()?.extras?.state?.['nom'];
          this.s = this.router.getCurrentNavigation()?.extras?.state?.['email'];
          this.d = this.router.getCurrentNavigation()?.extras?.state?.['fono'];
          this.f = this.router.getCurrentNavigation()?.extras?.state?.['desc'];*/
          this.imagen = this.router.getCurrentNavigation()?.extras?.state?.['img'];
        }
      })
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
  
  clearPhoto() {
    this.photoUrl = ''; // Restablece photoUrl para ocultar la imagen
    this.hasPhoto = false; // Actualiza el estado a que no hay foto
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

  
  
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
      handler: () => {
      }
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
      handler: () => {
        //this.irPagina();
      }
    }
  ];

  public alertButtonsBack = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
      handler: () => {
      }
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.router.navigate(['/perfil'] );
      }
    }
  ];
  
  ngOnInit() {
  }
  
}
