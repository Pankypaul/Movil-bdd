import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.page.html',
  styleUrls: ['./publicar.page.scss'],
})
export class PublicarPage implements OnInit {
  photoUrl: string = ''; // Inicializa photoUrl como cadena vacía
  constructor(private toastController:ToastController,private router:Router) { }
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
    },
  ];

  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });
  
      if (photo.webPath) {
        this.photoUrl = photo.webPath;
      } else {
        console.error('No se obtuvo una URL válida para la foto');
      }
  
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
  clearPhoto() {
    this.photoUrl = ''; // Restablece photoUrl para ocultar la imagen
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Publicado con exito',
      duration: 1500,
      position: position,
      
    });
    this.router.navigate(['/menu']);

    await toast.present();
  }

  
  
  ngOnInit() {
  }

}
