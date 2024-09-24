import { Component, OnInit } from '@angular/core';
import {  NavigationExtras, Router } from '@angular/router';
import { ToastController, ActionSheetController } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // ESTO ES DE LA CAMARA
import { defineCustomElements } from '@ionic/pwa-elements/loader'; // ESTO ES DE LA CAMARA

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  nombre:string="Carlos Espinoza";
  correo:string="carlos54@gmail.com";
  telefono:string="9 2342 8729";
  tip:string="Aprendiz";
  carrera:string="Ingenieria en informatica";
  descripcion:string="Soy estudiante de tercer año, estudio ingenieria en informatica, me gusta el deporte y ver animes, me especializo en programación web y bases de datos.";
  
  photoUrl: string = ''; // Inicializa photoUrl como cadena vacía
  public hasPhoto: boolean = false; // Variable para determinar si hay una foto
  

  constructor(private router:Router ,private toastController:ToastController,
    private actionSheetCtrl: ActionSheetController) { 
    
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

  irPagina() {
    

    /*ejemplo contexto  "ojala no sea la misma variable es opcional solo envia una por cada redireccion"*/
    let navigationextras: NavigationExtras = {

      state: {
        nom: this.nombre,
        email: this.correo,
        fono: this.telefono,
        tipo: this.tip,
        car: this.carrera,
        desc: this.descripcion
        
        
      }
      

    }
    
    
    this.router.navigate(['/perfil'],navigationextras);
    
  }
  
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
      handler: () => {
        //this.router.navigate(['/editar-perfil'] );
        console.log("no");
      }
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.irPagina(); 
        console.log("si");
      }
    }
  ];
  
  

  ngOnInit() {
  }
  
}
