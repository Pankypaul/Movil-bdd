import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-menu-asignatura',
  templateUrl: './menu-asignatura.page.html',
  styleUrls: ['./menu-asignatura.page.scss'],
})
export class MenuAsignaturaPage implements OnInit {
  nombre:string="Romina Riquelme"; 
  telefono:string="9 1213 5445";
  correo:string="Ro_Riquelme@gmail.com"; 
  tip:String='Tutor';

  arregloTema: any = [
    {
      id_tema: '',
      titulo_tema: '',
      descripcion_tema: '',
      fecha_tema: '',
      foto_tema: '',
      curso_id_curso: '',
      activo: '',  //Agregue el activo aqui tambien
    }
  ];

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

  id!: number; //id del localStorage
  rol!: number; //rol del localStorage
  
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


  id_curs!: number; //contex desde asignatura
  constructor(private router:Router, 
              private activateroute: ActivatedRoute,
              private bd: ServicebdService, 
              private storage: NativeStorage, 
              private alertController: AlertController){ 
    this.activateroute.queryParams.subscribe(() => {
      //valido si viene o no información en la ruta

      if (this.router.getCurrentNavigation()?.extras.state) {
        this.id_curs = this.router.getCurrentNavigation()?.extras?.state?.['id_cur'];
      }
    })
  }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      //validar si la bd esta lista
      if (data) {
        //subscribir al observable de la listaNoticias
        this.bd.fetchTema().subscribe(res => {
          this.arregloTema = res;
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
      //validar si la bd esta lista
      if (data) {
        //subscribir al observable de la listaNoticias
        this.bd.fetchCurso().subscribe(res => {
          this.arregloCurso = res;
        })
      }
    })

    //--------

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

  irPagina() {
  let navigationextras: NavigationExtras = {
      state: {
        name: this.nombre,
        phone: this.telefono,
        email: this.correo,
        tipo:  this.tip
      }
    };
    this.router.navigate(['/perfil-agregar-amigos'], navigationextras);
  }
  irPubli(){
    let navigationextras: NavigationExtras = {

      state: {
        id_c: this.id_curs
      }
    }
    this.router.navigate(['/publicar1'],navigationextras)
  }
  irLista(){
    this.router.navigate(['/lista'])
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
    let navigationsExtras: NavigationExtras = {
      state: {
        tema: x
      }
    }

    this.router.navigate(['/editar-tema'], navigationsExtras);

  }

  eliminar(x: any) {
    this.presentAlert12('ID para eliminar ', x.id_tema); //Este funciona (x.id_publi)
    this.bd.eliminarTema(x.id_tema); //no cambie nada de esto ya que ocupe la misma funcion...
  }

}
