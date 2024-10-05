import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publicacion } from './publicacion';
import { Curso } from './curso';
@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexión a Base de Datos
  public database!: SQLiteObject;

  /*
  rol (ya que otras tablas, como usuario, dependen de ella).
  usuario (depende de rol).
  curso (depende del usuario).
  tema (depende de curso).
  publicación (depende de usuario).
  comentario (depende de publicación y usuario).
  respuesta (depende de tema y usuario).   --PENDIENTE POR LE MOMENTO
  lista (depende de curso y usuario).*/



  //variables de creación de Tablas

  //ROL
  tablaRol: string = "CREATE TABLE IF NOT EXISTS roles( id_rol INTEGER PRIMARY KEY autoincrement, tipo_rol VARCHAR (10) NOT NULL);";

  //USUARIO
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario( id_usuario INTEGER PRIMARY KEY autoincrement, nombre_usuario VARCHAR (60) NOT NULL, correo_usuario VARCHAR(320) NOT NULL, telefono_usuario INTEGER NOT NULL, contrasena_usuario VARCHAR(25) NOT NULL, rol_id_rol INTEGER NOT NULL, descripcion VARCHAR(250), foto VARCHAR(300), FOREIGN KEY(rol_id_rol) REFERENCES rol(id_rol));";

  //CURSO
  tablaCurso: string = "CREATE TABLE IF NOT EXISTS curso( id_curso INTEGER PRIMARY KEY autoincrement, nombre_curso VARCHAR(100) NOT NULL, descripcion_curso  VARCHAR(250) NOT NULL, foto_curso VARCHAR(300) NOT NULL, fecha_inicio DATE NOT NULL, usuario_id_usuario INTEGER NOT NULL, activo INTEGER DEFAULT 1, FOREIGN KEY(usuario_id_usuario) REFERENCES usuario(id_usuario));";

  //TEMA
  tablaTema: string = "CREATE TABLE IF NOT EXISTS tema ( id_tema INTEGER PRIMARY KEY autoincrement, titulo_tema VARCHAR(100) NOT NULL, descripcion_tema VARCHAR(250) NOT NULL, fecha_tema DATE NOT NULL, curso_id_curso INTEGER NOT NULL, activo INTEGER DEFAULT 1, FOREIGN KEY (curso_id_curso) REFERENCES curso(id_curso));";

  //PUBLICACIÓN
  tablaPublicacion: string = "CREATE TABLE IF NOT EXISTS publicacion ( id_publi INTEGER PRIMARY KEY autoincrement, titulo_publi VARCHAR(100) NOT NULL, descripcion_publi  VARCHAR(250) NOT NULL, foto_publi VARCHAR(300), fecha_publi VARCHAR(100) NOT NULL, usuario_id_usuario INTEGER NOT NULL, activo INTEGER DEFAULT 1, FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";

  //COMENTARIO
  tablaComentario: string = "CREATE TABLE IF NOT EXISTS comentario( idcomentario INTEGER PRIMARY KEY autoincrement, comentario VARCHAR(220) NOT NULL, usuario_id_usuario INTEGER NOT NULL, fecha_comentario DATE NOT NULL, publicacion_id_publi INTEGER NOT NULL, FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY (publicacion_id_publi) REFERENCES publicacion(id_publi));"

  //RESPUESTA
  //PENDIENTE POR LE MOMENTO

  //LISTA
  tablaLista: string = "CREATE TABLE IF NOT EXISTS lista ( id_lista INTEGER PRIMARY KEY autoincrement, fecha_inscripcion VARCHAR(100) NOT NULL, curso_id_curso INTEGER NOT NULL, usuario_id_usuario INTEGER NOT NULL, FOREIGN KEY (curso_id_curso) REFERENCES curso(id_curso), FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";


  //-- 1 para activo, 0 para inactivo

  //variables para los insert por defecto en nuestras tablas
  //registroNoticia: string = "INSERT or IGNORE INTO noticia(idnoticia, titulo, texto, activo) VALUES (1,'Soy un titulo', 'Soy el texto de esta noticia que se esta insertando de manera autmática',1)";
  // DESACTIVADO ES 0
  //ACTIVADO ES 1
  //variables para guardar los datos de las consultas en las tablas

  listadoRol = new BehaviorSubject([]);
  listadoUsuario = new BehaviorSubject([]);
  listadoCurso = new BehaviorSubject([]);
  listadoTema = new BehaviorSubject([]);

  listadoPublicacion = new BehaviorSubject([]);
  listadoComentario = new BehaviorSubject([]);
  listadoLista = new BehaviorSubject([]);

  //variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.createBD();
  }

  async presentAlert(titulo_publi: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo_publi,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  

  //metodos para manipular los observables
  fetchPublicacion(): Observable<Publicacion[]> {
    return this.listadoPublicacion.asObservable();
  }


  dbState() {
    return this.isDBReady.asObservable();
  }

  //función para crear la Base de Datos
  async createBD() {
    try {
      // Verificar si la plataforma está disponible
      await this.platform.ready();

      // Crear la Base de Datos
      this.database = await this.sqlite.create({
        name: 'taskapp.db',
        location: 'default'
      });

      console.log('Base de datos creada exitosamente');

      // Llamamos a la función para crear las tablas
      await this.crearTablas();  // Asegúrate de que `crearTablas` retorne una promesa
    } catch (e) {
      this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
    }
  }

  async crearTablas() {
    try {
      // Ejecutar la creación de Tablas
      await this.database.executeSql(this.tablaPublicacion, []);

      // Agregar otras tablas aquí, por ejemplo:
      // await this.database.executeSql(this.tablaUsuario, []);
      // await this.database.executeSql(this.tablaCurso, []);

      this.seleccionarPublicacion();
      // Modificar el estado de la Base de Datos
      this.isDBReady.next(true);
    } catch (e) {
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }


  seleccionarPublicacion() {
    return this.database.executeSql('SELECT * FROM publicacion WHERE activo = 1', []).then(res => {  // Agrege "Where activo = 1" el 1 son para las cosas habilitadas.
      //variable para almacenar el resultado de la consulta
      let items: Publicacion[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los registros a mi lista
          items.push({

            id_publi: res.rows.item(i).id_publi,
            titulo_publi: res.rows.item(i).titulo_publi,
            descripcion_publi: res.rows.item(i).descripcion_publi,
            foto_publi: res.rows.item(i).foto_publi,
            fecha_publi: res.rows.item(i).fecha_publi,
            usuario_id_usuario: res.rows.item(i).usuario_id_usuario,
            activo: res.rows.item(i).activo //Agrege el activo
          })
        }

      }
      //actualizar el observable
      this.listadoPublicacion.next(items as any);

    })
  }
  insertarPublicacion(titulo: string, descripcion: string, photoUrl: string, fecha_publi: string, usuarioId: number = 1, activo: number = 1) {
    // Asegurarte de que fecha_publi sea un objeto Date
    return this.database.executeSql('INSERT INTO publicacion(titulo_publi, descripcion_publi, foto_publi, fecha_publi, usuario_id_usuario, activo) VALUES (?,?,?,?,?,?)',
      [titulo, descripcion, photoUrl, fecha_publi, usuarioId, activo]
    ).then(() => {
      this.presentAlert("Insertar", "Noticia Registrada");
      this.seleccionarPublicacion();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }


  eliminarPublicacion(id_publi: number) { //Cree un update que llama a la tabla y modifica el activo y coloca 0 para deshabilitarla 
    return this.database.executeSql('UPDATE publicacion SET activo = 0 WHERE id_publi = ?', [id_publi])  //Cambie toda esta funcion menos el nombre 
      .then(() => {
        this.presentAlert("Eliminar", "publicacion marcada como inactiva");
        this.seleccionarPublicacion();  // Actualizar la lista de noticias
      })
      .catch(e => {
        this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
      });
  }

  modificarPublicacion(id_publi: number, titulo_publi: string, descripcion_publi: string, foto_publi: string) {
    this.presentAlert("service", "ID: " + id_publi);
    return this.database.executeSql('UPDATE publicacion SET titulo_publi = ?, descripcion_publi = ?, foto_publi = ? WHERE id_publi = ?', [titulo_publi, descripcion_publi, foto_publi, id_publi]).then(() => {
      this.presentAlert("Modificar", "publicacion Modificada"+descripcion_publi);
      this.seleccionarPublicacion();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
  }

  seleccionarCurso(){

  }

  insertarCurso(){

  }

  modificarCurso(){

  }

  eliminarCurso(){
    
  }

  /*
  eliminarNoticia(id: string) { //Cree un update que llama a la tabla y modifica el activo y coloca 0 para deshabilitarla 
    return this.database.executeSql('UPDATE noticia SET activo = 0 WHERE idnoticia = ?', [id])  //Cambie toda esta funcion menos el nombre 
      .then(res => {
        this.presentAlert("Eliminar", "Noticia marcada como inactiva");
        this.seleccionarNoticias();  // Actualizar la lista de noticias
      })
      .catch(e => {
        this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
      });
  }*/

  /*
  modificarNoticia(id: string, titulo: string, texto: string) {
    this.presentAlert("service", "ID: " + id);
    return this.database.executeSql('UPDATE noticia SET titulo_publi = ?, texto = ? WHERE idnoticia = ?', [titulo_publi, texto, id]).then(res => {
      this.presentAlert("Modificar", "Noticia Modificada");
      this.seleccionarNoticias();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })

  }*/

  /*
  insertarNoticia(titulo: string, texto: string) {
    return this.database.executeSql('INSERT INTO noticia(titulo,texto) VALUES (?,?)', [titulo, texto]).then(res => {
      this.presentAlert("Insertar", "Noticia Registrada");
      this.seleccionarNoticias();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }*/

  /*
  eliminarTablaNoticia() {
    return this.database.executeSql('DROP TABLE IF EXISTS noticia', [])
      .then(res => {
        this.presentAlert("Eliminar Tabla", "Tabla noticia eliminada");
        // Puedes llamar a crearTablas() si quieres recrear las tablas después de eliminar
        this.crearTablas();
      })
      .catch(e => {
        this.presentAlert('Eliminar Tabla', 'Error: ' + JSON.stringify(e));
      });
  }*/


}
