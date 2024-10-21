import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  
  arregloCurso: any = [
    {
      id_curso: '',
      nombre_curso: '',
      descripcion_curso: '',
      foto_curso: '',
      usuario_id_usuario: '',
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

  rol!: number;
  id!: number;


  buscador1!: string;
  tituloEncontrado!: string;

  resultado1: any;



  constructor(private router: Router, 
              private bd: ServicebdService, 
              private alertController: AlertController, 
              private storage: NativeStorage) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      //validar si la bd esta lista
      if (data) {
        //subscribir al observable de la listaNoticias
        this.bd.fetchCurso().subscribe(res => {
          this.arregloCurso = res;
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

    this.storage.getItem('Rol').then((rol: number) => {
      this.rol = rol;
    }).catch(err => {
      console.error('Error al obtener el rol:', err);
    });

    this.storage.getItem('Id').then((id: number) => {
      this.id = id;
    }).catch(err => {
      console.error('Error al obtener el rol:', err);
    });
  }

  irPagina(){
    
    this.router.navigate(['/editar-curso'])
  }

  async presentAlert12(title: string, msj: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  modificar(x: any) {
    //this.presentAlert12('ID', x.id_curso);
    let navigationsExtras: NavigationExtras = {
      state: {
        curso: x
      }
    }

    this.router.navigate(['/editar-curso'], navigationsExtras);

  }

  eliminar(x: any) {
    //this.presentAlert12('ID para eliminar ', x.id_curso); //Este funciona (x.id_publi)
    this.bd.eliminarCurso(x.id_curso); //no cambie nada de esto ya que ocupe la misma funcion...
  }

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Info',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  ir(id_curso: number, x: any){ // Accede al primer elemento del arreglo
    this.arregloCurso.id_curso;
    console.log('ID del usuario:', id_curso); // Esto muestra el ID en la consola
    let navigationextras: NavigationExtras = {

      state: {
        id_cur: id_curso,
        curso: x

      }
    }
    this.router.navigate (['/menu-asignatura'],navigationextras);
  }

  onSearch(event: any) {
    const searchValue = event.target.value; // Obtiene el valor actual del ion-searchbar
    this.buscador1 = searchValue; // Actualiza el valor de buscador1
    this.buscador(searchValue); // Llama a la función buscador con el valor
  }


  async buscador(buscar: string){
    const resultado = await this.bd.buscadorCurso(buscar);
    console.log('buscador ', resultado);
    this.resultado1 = resultado;
    console.log(this.resultado1);

    if (resultado) {
      this.tituloEncontrado = resultado.nombre_curso; // Guarda el título en la variable
    } else {
      this.tituloEncontrado = 'No se encontro el curso'; // Mensaje si no se encuentra
    }
  }


}
