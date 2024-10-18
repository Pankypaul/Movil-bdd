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

  photoUrl: string = ''; // Inicializa photoUrl como cadena vacía
  public hasPhoto: boolean = false; // Variable para determinar si hay una foto


  nombre: string = "Romina Riquelme";
  telefono: string = "9 1213 5445";
  correo: string = "Ro_Riquelme@gmail.com";
  tip: String = 'Tutor';

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

  arregloLista: any = [
    {
      id_lista: '',
      fecha_inscripcion: '',
      curso_id_curso: '',
      usuario_id_usuario: '',
    }
  ];

  


  curso1: any;

  usuarioUnico1!: boolean;
  
  id_curs!: number; //contex desde asignatura

  constructor(private router: Router,
    private activateroute: ActivatedRoute,
    private bd: ServicebdService,
    private storage: NativeStorage,
    private alertController: AlertController) {
    this.activateroute.queryParams.subscribe(() => {
      //valido si viene o no información en la ruta

      if (this.router.getCurrentNavigation()?.extras.state) {
        this.id_curs = this.router.getCurrentNavigation()?.extras?.state?.['id_cur'];
        this.curso1 = this.router.getCurrentNavigation()?.extras?.state?.['curso'];
      }
    })
  }

  async ngOnInit() {
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

    this.bd.dbState().subscribe(data => {
      //validar si la bd esta lista
      if (data) {
        //subscribir al observable de la listaNoticias
        this.bd.fetchLista().subscribe(res => {
          this.arregloLista = res;
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


    //----------

    
    
    


    this.initializeData();
  }

  async initializeData() {
    try {
      this.rol = await this.storage.getItem('Rol');
      this.id = await this.storage.getItem('Id');

      // Verificar el estado del seguimiento inicial
      if (await this.bd.isDBReady) {
        const usuarioUnico = await this.bd.seleccionarVerificacionLista(this.id, this.id_curs);
        this.usuarioUnico1 = !!usuarioUnico; // true si sigue el curso, false si no
      }
    } catch (error) {
      console.error('Error al inicializar los datos:', error);
    }
  }
  

  irPagina() {
    let navigationextras: NavigationExtras = {
      state: {
        name: this.nombre,
        phone: this.telefono,
        email: this.correo,
        tipo: this.tip
      }
    };
    this.router.navigate(['/perfil-agregar-amigos'], navigationextras);
  }
  irPubli() {
    let navigationextras: NavigationExtras = {

      state: {
        id_c: this.id_curs
      }
    }
    this.router.navigate(['/publicar1'], navigationextras)
  }
  irLista() {
    let navigationextras: NavigationExtras = {

      state: {
        id_c: this.id_curs,
        curso: this.curso1
      }
    }
    this.router.navigate(['/lista'], navigationextras)
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

  today = new Date();

  // Obtener día, mes y año
  day = ('0' + this.today.getDate()).slice(-2);  // Asegurarse de que tenga 2 dígitos
  year = this.today.getFullYear().toString().slice(-2);  // Obtener los últimos 2 dígitos del año

  // Nombres de los meses abreviados
  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  month = this.months[this.today.getMonth()];  // Obtener el nombre abreviado del mes

  // Formato final DD-MON-YY
  fecha_publi = `${this.day}-${this.month}-${this.year}`;  // Ahora está en el formato correcto

  

  async listar() {
    try {
      if (await this.bd.isDBReady) {
        const usuarioUnico = await this.bd.seleccionarVerificacionLista(this.id, this.id_curs);

        if (this.rol === 0 && usuarioUnico) {
          // Usuario sigue el curso, entonces lo eliminamos de la lista
          this.bd.eliminarUsuarioLista(this.id, this.id_curs);
          this.presentAlert12('Haz dejado de seguir este curso', 'Nos veremos pronto, sigue aprendiendo!');
          this.usuarioUnico1 = false; // Cambiar estado de seguimiento
        } else if (this.rol === 0 && !usuarioUnico) {
          // Usuario no sigue el curso, entonces lo agregamos a la lista
          const fechaActual = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: '2-digit' });
          this.bd.insertarLista(fechaActual, this.id_curs, this.id);
          this.presentAlert12('Bienvenido al curso', this.nombre);
          this.usuarioUnico1 = true; // Cambiar estado de seguimiento
        }
      }
    } catch (error) {
      console.error('Error al actualizar la lista de seguimiento:', error);
    }
  }
}
