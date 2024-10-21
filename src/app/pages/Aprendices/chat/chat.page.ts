import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  photoUrl: string = ''; // Inicializa photoUrl como cadena vacía
  public hasPhoto: boolean = false; // Variable para determinar si hay una foto

  comentario: string = ""; //input comentar

  id!: number; //localStorage
  rol!: number; //localStorage

  id_usu!: number; //contex
  id_pub!: number; //contex

  //bdd
  arregloPublicacion: any = [
    {
      id_publi: '', 
      usuario_id_usuario: '',
      titulo: '',
      descripcion: '',
      foto_publi: '',
      activo: '',  //Agregue el activo aqui tambien
    }
  ]

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

  arregloComentario: any = [
    {
      idcomentario: '',
      comentario: '',
      usuario_id_usuario: '',
      fecha_comentario: '',
      publicacion_id_publi: '',
      activo: '',
    }
  ];

  constructor(private router: Router,
              private activateroute: ActivatedRoute,
              private bd: ServicebdService,
              private toastController: ToastController,
              private storage: NativeStorage) { 

    this.activateroute.queryParams.subscribe(() => {
      //valido si viene o no información en la ruta

      if (this.router.getCurrentNavigation()?.extras.state) {
        this.id_usu = this.router.getCurrentNavigation()?.extras?.state?.['id_us'];
        this.id_pub = this.router.getCurrentNavigation()?.extras?.state?.['id_cu'];
      }
    })
  }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      // validar si la bd está lista
      if (data) {
        // suscribirse al observable de fetchUsuario
        this.bd.fetchPublicacion().subscribe(res => {
          this.arregloPublicacion = res;
        })
      }
    })
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
        this.bd.fetchComentario().subscribe(res => {
          this.arregloComentario = res;
        })
      }
    })

    this.storage.getItem('Id').then((id_usuario: number) => {
      this.id = id_usuario;
    }).catch(err => {
      console.error('Error al obtener el rol:', err);
    });

    this.storage.getItem('Rol').then((rol: number) => {
      this.rol = rol;
    }).catch(err => {
      console.error('Error al obtener el rol:', err);
    });
  }

  today = new Date();

  // Obtener día, mes y año
  day = ('0' + this.today.getDate()).slice(-2);  // Asegurarse de que tenga 2 dígitos
  year = this.today.getFullYear().toString().slice(-2);  // Obtener los últimos 2 dígitos del año

  // Nombres de los meses abreviados
  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  month = this.months[this.today.getMonth()];  // Obtener el nombre abreviado del mes

  // Formato final DD-MON-YY
  fecha_comentario = `${this.day}-${this.month}-${this.year}`;  // Ahora está en el formato correcto

  enviar(){
    console.log(this.fecha_comentario);  // Esto mostrará la fecha en formato DD/MM/YYYY

    // Convertir la fecha a YYYY-MM-DD para crear un objeto Date
    let [day, month, year] = this.fecha_comentario.split('/'); // Descomponer la fecha
    let formattedForDate = `${year}-${month}-${day}`; // Reorganizar a YYYY-MM-DD
    let dateObj = new Date(formattedForDate); // Crear un objeto Date

    console.log('Objeto Date:', dateObj); // Verificar el objeto Date

    if (this.comentario.trim() !== "" ) {/*&& this.hasPhoto === true*/

      this.presentToast('top');
      console.log(this.comentario, (' '), this.id,(' '), this.fecha_comentario,(' '), this.id_pub,(' '), 1);
      this.bd.insertarComentario(this.comentario, this.id, this.fecha_comentario, this.id_pub, 1); // Pasar el objeto Date
      this.comentario = '';
    }
  }

  irPagina(id_usuario: number) { // Accede al primer elemento del arreglo
    this.arregloUsuario.id_usuario;
    console.log('ID del usuario:', id_usuario); // Esto muestra el ID en la consola
    let navigationextras: NavigationExtras = {

      state: {
        id_usuar: id_usuario
      }
    }
    this.router.navigate(['/perfil-agregar-amigos'], navigationextras);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Publicado con exito',
      duration: 1500,
      position: position,

    });

    await toast.present();
  }

}
