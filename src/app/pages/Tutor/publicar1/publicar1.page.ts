import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, ActionSheetController } from '@ionic/angular';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // ESTO ES DE LA CAMARA
import { defineCustomElements } from '@ionic/pwa-elements/loader'; // ESTO ES DE LA CAMARA
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

/*---------------------------------------------------------------------------------
// PONER ESTO EN EL CMD

npm install @capacitor/pwa-elements

Y ESTO OTRO VA ARRIBA IMPORTADO:

import { defineCustomElements } from '@capacitor/pwa-elements/loader';
// Llama a esta función para cargar los elementos de la PWA

CON ESTA ULTIMA LINEA LO HACEMOS FUNCIONAR:

defineCustomElements(window);

---------------------------------------------------------------------------------*/

@Component({
  selector: 'app-publicar1',
  templateUrl: './publicar1.page.html',
  styleUrls: ['./publicar1.page.scss'],
})
export class PublicarPage implements OnInit {
  photoUrl: string = ''; // Inicializa photoUrl como cadena vacía
  public hasPhoto: boolean = false; // Variable para determinar si hay una foto

  titulo_tema: string = "";
  descripcion_tema:string = "";

  id!: number;
  mensaje_1!: string;
  mensaje_2!: string;

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

  arregloCurso: any = [
    {
      nombre_curso: '',
      
    }
  ];

  id_cur!: number; //context desde menu-asignatura

  constructor(
    private toastController:ToastController,
    private router:Router, 
    private actionSheetCtrl: ActionSheetController,
    private bd: ServicebdService,
    private storage: NativeStorage, 
    private activateroute: ActivatedRoute) {
      this.activateroute.queryParams.subscribe(() => {
      //valido si viene o no información en la ruta

      if (this.router.getCurrentNavigation()?.extras.state) {
        this.id_cur = this.router.getCurrentNavigation()?.extras?.state?.['id_c'];
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

  today = new Date();

  // Obtener día, mes y año
  day = ('0' + this.today.getDate()).slice(-2);  // Asegurarse de que tenga 2 dígitos
  year = this.today.getFullYear().toString().slice(-2);  // Obtener los últimos 2 dígitos del año

  // Nombres de los meses abreviados
  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  month = this.months[this.today.getMonth()];  // Obtener el nombre abreviado del mes

  // Formato final DD-MON-YY
  fecha_tema = `${this.day}-${this.month}-${this.year}`;  // Ahora está en el formato correcto

  irPagina(){

    console.log(this.fecha_tema);  // Esto mostrará la fecha en formato DD/MM/YYYY

    // Convertir la fecha a YYYY-MM-DD para crear un objeto Date
    let [day, month, year] = this.fecha_tema.split('/'); // Descomponer la fecha
    let formattedForDate = `${year}-${month}-${day}`; // Reorganizar a YYYY-MM-DD
    let dateObj = new Date(formattedForDate); // Crear un objeto Date

    console.log('Objeto Date:', dateObj); // Verificar el objeto Date

    this.mensaje_1 = '';
    this.mensaje_2 = '';

    if(this.titulo_tema === ""){
      this.mensaje_1 = 'Este campo es obligatorio ';
    }

    if(this.descripcion_tema === ""){
      this.mensaje_2 = 'Este campo es obligatorio ';
    }

    if(this.descripcion_tema !== "" && this.titulo_tema !== ""){
      this.presentToast('top');
      console.log(this.titulo_tema, (' '), this.descripcion_tema, (' '), this.fecha_tema, (' '), this.photoUrl, (' '), this.id_cur);
      this.bd.insertarTema(this.titulo_tema, this.descripcion_tema, this.fecha_tema, this.photoUrl, this.id_cur, 1); // Pasar el objeto Date
      this.bd.NotificacionNuevoTema();
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

    this.bd.dbState().subscribe(data => {
      // validar si la bd está lista
      if (data) {
        // suscribirse al observable de fetchUsuario
        this.bd.fetchCurso().subscribe(res => {
          this.arregloCurso = res;
        })
      }
    })

    this.storage.getItem('Id').then((id_usuario: number) => {
      this.id = id_usuario;
    }).catch(err => {
      console.error('Error al obtener el rol:', err);
    });
  }

}
