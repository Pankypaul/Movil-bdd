import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ActionSheetController, AlertController } from '@ionic/angular';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // ESTO ES DE LA CAMARA
import { defineCustomElements } from '@ionic/pwa-elements/loader'; // ESTO ES DE LA CAMARA
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
@Component({
  selector: 'app-editar-publicacion',
  templateUrl: './editar-publicacion.page.html',
  styleUrls: ['./editar-publicacion.page.scss'],
})
export class EditarPublicacionPage implements OnInit {
  photoUrl: string = ''; // Inicializa photoUrl como cadena vacía
  public hasPhoto: boolean = false; // Variable para determinar si hay una foto

  titulo_publi: string = "";
  descripcion_publi :string = "";

  mensaje_1!: string;
  mensaje_2!: string;

  publicacion: any;

  id!: number; //id del localStorage
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

  constructor(
    private toastController:ToastController,
    private activedrouter: ActivatedRoute, 
    private router: Router,
    private bd: ServicebdService, 
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private storage: NativeStorage) { 

      this.activedrouter.queryParams.subscribe(res=>{
        if(this.router.getCurrentNavigation()?.extras.state){
          this.publicacion = this.router.getCurrentNavigation()?.extras?.state?.['publicar'];
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
  irPubli(){
    this.router.navigate(['/menu']);
  }

  irPagina(){

    this.mensaje_1 = '';
    this.mensaje_2 = '';

    if(this.publicacion.titulo_publi.trim() === ""){
      this.publicacion.titulo_publi = '';
      this.mensaje_1 = 'Este campo es obligatorio ';
    }

    if(this.publicacion.descripcion_publi.trim() === ""){
      this.publicacion.descripcion_publi = '';
      this.mensaje_2 = 'Este campo es obligatorio ';
    }

    if (this.hasPhoto === false) {
      this.photoUrl = this.publicacion.foto_publi;
    }

    if( this.publicacion.descripcion_publi.trim() !== ""  && this.publicacion.titulo_publi.trim() !== "" ){
      this.presentToast('top');
      this.presentAlert12('ID', this.publicacion.id_publi+this.publicacion.descripcion_publi);
      this.bd.modificarPublicacion(this.publicacion.id_publi, this.publicacion.titulo_publi, this.publicacion.descripcion_publi, this.photoUrl);
      this.router.navigate(['/menu'])
    }
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

  async presentAlert12(title: string, msj: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
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
    this.bd.dbState().subscribe(data => {
      // validar si la bd está lista
      if (data) {
        // suscribirse al observable de fetchUsuario
        this.bd.fetchUsuario().subscribe(res => {
          this.arregloUsuario = res;
        })
      }
    })
    this.storage.getItem('Id').then((id: number) => {
      this.id = id;
    }).catch(err => {
      console.error('Error al obtener el rol:', err);
    });
  }
  


}