import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // ESTO ES DE LA CAMARA
import { defineCustomElements } from '@ionic/pwa-elements/loader'; // ESTO ES DE LA CAMARA
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.page.html',
  styleUrls: ['./editar-curso.page.scss'],
})
export class EditarCursoPage implements OnInit {
  photoUrl: string = ''; // Inicializa photoUrl como cadena vacía
  public hasPhoto: boolean = false; // Variable para determinar si hay una foto

  nombre_curso: string = "";
  descripcion_curso: string = "";

  mensaje_1!: string;
  mensaje_2!: string;


  curso: any;

  constructor(
    private toastController: ToastController,
    private activedrouter: ActivatedRoute,
    private router: Router,
    private bd: ServicebdService,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController) {

    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.curso = this.router.getCurrentNavigation()?.extras?.state?.['curso'];
      }
    })
  }


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
  async presentAlert12(title: string, msj: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  volver(){
    this.router.navigate(['/asignaturas1']);
  }

  irPagina() {



    this.mensaje_1 = '';
    this.mensaje_2 = '';

    if (this.curso.nombre_curso.trim() === "") {
      this.curso.nombre_curso = '';
      this.mensaje_1 = 'Este campo es obligatorio ';
    }

    if (this.curso.descripcion_curso.trim() === "") {
      this.curso.descripcion_curso = '';
      this.mensaje_2 = 'Este campo es obligatorio ';
    }


    if (this.hasPhoto === false) {
      this.photoUrl = this.curso.foto_curso;
    }

    if (this.curso.descripcion_curso.trim() !== "" && this.curso.nombre_curso.trim() !== "") {
      this.presentToast('top');
      this.presentAlert12('ID', this.curso.id_curso + ('nombre_curso') + this.curso.nombre_curso + ('descripcion_curso') + this.curso.descripcion_curso + ('photoUrl') + this.photoUrl);
      this.bd.modificarCurso(this.curso.id_curso, this.curso.nombre_curso, this.curso.descripcion_curso, this.photoUrl);
      this.router.navigate(['/asignaturas1 '])
    }
  }

  
  

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Curso creado con exito',
      duration: 1500,
      position: position,

    });
    this.router.navigate(['/menu1']);

    await toast.present();
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

  ngOnInit() {

  }

}