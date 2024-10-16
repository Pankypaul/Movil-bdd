import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publicacion } from './publicacion';
import { Curso } from './curso';
import { Usuario } from './usuario';
import { Tema } from './tema';
import { Comentario } from './comentario';
import { Lista } from './lista';

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
  tablaRol: string = "CREATE TABLE IF NOT EXISTS roles( id_rol INTEGER PRIMARY KEY, tipo_rol VARCHAR (10) NOT NULL);";

  //USUARIO
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario( id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre_usuario VARCHAR (60) NOT NULL, correo_usuario VARCHAR(320) NOT NULL UNIQUE, telefono_usuario INTEGER NOT NULL, contrasena_usuario VARCHAR(25) NOT NULL, rol_id_rol INTEGER NOT NULL, descripcion VARCHAR(250), foto VARCHAR(300), FOREIGN KEY(rol_id_rol) REFERENCES rol(id_rol));";
  
  //CURSO
  tablaCurso: string = "CREATE TABLE IF NOT EXISTS curso( id_curso INTEGER PRIMARY KEY AUTOINCREMENT, nombre_curso VARCHAR(100) NOT NULL, descripcion_curso  VARCHAR(250) NOT NULL, foto_curso VARCHAR(300), fecha_inicio VARCHAR (100) NOT NULL, usuario_id_usuario INTEGER NOT NULL, activo INTEGER DEFAULT 1, FOREIGN KEY(usuario_id_usuario) REFERENCES usuario(id_usuario));";

  //TEMA
  tablaTema: string = "CREATE TABLE IF NOT EXISTS tema ( id_tema INTEGER PRIMARY KEY AUTOINCREMENT, titulo_tema VARCHAR(100) NOT NULL, descripcion_tema VARCHAR(250) NOT NULL, fecha_tema VARCHAR(100) NOT NULL, foto_tema VARCHAR(300), curso_id_curso INTEGER NOT NULL, activo INTEGER DEFAULT 1, FOREIGN KEY (curso_id_curso) REFERENCES curso(id_curso));";

  //PUBLICACIÓN
  tablaPublicacion: string = "CREATE TABLE IF NOT EXISTS publicacion ( id_publi INTEGER PRIMARY KEY AUTOINCREMENT, titulo_publi VARCHAR(100) NOT NULL, descripcion_publi  VARCHAR(250) NOT NULL, foto_publi VARCHAR(300), fecha_publi VARCHAR(100) NOT NULL, usuario_id_usuario INTEGER NOT NULL, activo INTEGER DEFAULT 1, FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";

  //COMENTARIO
  tablaComentario: string = "CREATE TABLE IF NOT EXISTS comentario( idcomentario INTEGER PRIMARY KEY AUTOINCREMENT, comentario VARCHAR(220) NOT NULL, usuario_id_usuario INTEGER NOT NULL, fecha_comentario VARCHAR(100) NOT NULL, publicacion_id_publi INTEGER NOT NULL, activo INTEGER DEFAULT 1, FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario), FOREIGN KEY (publicacion_id_publi) REFERENCES publicacion(id_publi));";

  //RESPUESTA
  //PENDIENTE POR LE MOMENTO

  //LISTA
  tablaLista: string = "CREATE TABLE IF NOT EXISTS lista ( id_lista INTEGER PRIMARY KEY AUTOINCREMENT, fecha_inscripcion VARCHAR(100) NOT NULL, curso_id_curso INTEGER NOT NULL, usuario_id_usuario INTEGER NOT NULL, FOREIGN KEY (curso_id_curso) REFERENCES curso(id_curso), FOREIGN KEY (usuario_id_usuario) REFERENCES usuario(id_usuario));";

  //user: string = "INSERT or IGNORE INTO usuario(id_usuario, nombre_usuario, correo_usuario, telefono_usuario, contrasena_usuario , rol_id_rol ,descripcion , foto) VALUES (100,'PAUL HIDALGO', 'hidalgo2024@gmail.com', 949826942, '#Maleta123', 1, '','')"
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
  public isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

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

  fetchCurso(): Observable<Curso[]> {
    return this.listadoCurso.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]> {
    return this.listadoUsuario.asObservable();
  }

  fetchTema(): Observable<Tema[]> {
    return this.listadoTema.asObservable();
  }

  fetchComentario(): Observable<Comentario[]> {
    return this.listadoComentario.asObservable();
  }

  fetchLista(): Observable<Lista[]> {
    return this.listadoLista.asObservable();
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
      await this.database.executeSql(this.tablaCurso, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaTema, []);
      await this.database.executeSql(this.tablaComentario, []);
      await this.database.executeSql(this.tablaLista, []);

      //await this.database.executeSql(this.user, []);
      // await this.database.executeSql(this.tablaCurso, []);

      this.seleccionarPublicacion();
      this.seleccionarCurso();
      this.seleccionarUsuario();
      this.seleccionarTema();
      this.seleccionarComentario();
      this.seleccionarLista();
      // Modificar el estado de la Base de Datos
      this.isDBReady.next(true);
    } catch (e) {
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }





  seleccionarPublicacion() {
    return this.database.executeSql('SELECT * FROM publicacion WHERE activo = 1 ORDER BY fecha_publi DESC', []).then(res => {  // Agrege "Where activo = 1" el 1 son para las cosas habilitadas.
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
  insertarPublicacion(titulo: string, descripcion: string, photoUrl: string, fecha_publi: string, usuarioId: number, activo: number = 1) {
    // Asegurarte de que fecha_publi sea un objeto Date
    return this.database.executeSql('INSERT INTO publicacion(titulo_publi, descripcion_publi, foto_publi, fecha_publi, usuario_id_usuario, activo) VALUES (?,?,?,?,?,?)',
      [titulo, descripcion, photoUrl, fecha_publi, usuarioId, activo]
    ).then(() => {
      //this.presentAlert("Insertar", "publicación Registrada");
      this.seleccionarPublicacion();
    }).catch(e => {
      //this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }


  eliminarPublicacion(id_publi: number) { //Cree un update que llama a la tabla y modifica el activo y coloca 0 para deshabilitarla 
    return this.database.executeSql('UPDATE publicacion SET activo = 0 WHERE id_publi = ?', [id_publi])  //Cambie toda esta funcion menos el nombre 
      .then(() => {
        //this.presentAlert("Eliminar", "publicacion marcada como inactiva");
        this.seleccionarPublicacion();  // Actualizar la lista de noticias
      })
      .catch(e => {
        //this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
      });
  }

  modificarPublicacion(id_publi: number, titulo_publi: string, descripcion_publi: string, foto_publi: string) {
    //this.presentAlert("service", "ID: " + id_publi);
    return this.database.executeSql('UPDATE publicacion SET titulo_publi = ?, descripcion_publi = ?, foto_publi = ? WHERE id_publi = ?', [titulo_publi, descripcion_publi, foto_publi, id_publi]).then(() => {
      //this.presentAlert("Modificar", "publicacion Modificada" + descripcion_publi);
      this.seleccionarPublicacion();
    }).catch(e => {
      //this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
  }


  //curso



  seleccionarCurso() {
    return this.database.executeSql('SELECT * FROM curso WHERE activo = 1 ORDER BY fecha_inicio DESC', []).then(res => {  // Agrege "Where activo = 1" el 1 son para las cosas habilitadas.
      //variable para almacenar el resultado de la consulta
      let items: Curso[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los registros a mi lista
          items.push({

            id_curso: res.rows.item(i).id_curso,
            nombre_curso: res.rows.item(i).nombre_curso,
            descripcion_curso: res.rows.item(i).descripcion_curso,
            foto_curso: res.rows.item(i).foto_curso,
            fecha_inicio: res.rows.item(i).fecha_inicio,
            usuario_id_usuario: res.rows.item(i).usuario_id_usuario,
            activo: res.rows.item(i).activo //Agrege el activo
          })
        }

      }
      //actualizar el observable
      this.listadoCurso.next(items as any);

    })
  }

  insertarCurso(nombre_curso: string, descripcion_curso: string, foto_curso: string, fecha_inicio: string, usuario_id_usuario: number, activo: number = 1) {
    // Asegurarte de que c sea un objeto Date
    return this.database.executeSql('INSERT INTO curso (nombre_curso, descripcion_curso, foto_curso, fecha_inicio, usuario_id_usuario, activo) VALUES (?,?,?,?,?,?)',
      [nombre_curso, descripcion_curso, foto_curso, fecha_inicio, usuario_id_usuario, activo]
    ).then(() => {
      //this.presentAlert("Insertar", "Curso Registrado");
      this.seleccionarCurso();
    }).catch(e => {
      //this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }

  modificarCurso(id_curso: number, nombre_curso: string, descripcion_curso: string, foto_curso: string) {
    //this.presentAlert("service", "ID: " + id_curso);
    return this.database.executeSql('UPDATE curso SET nombre_curso = ?, descripcion_curso = ?, foto_curso = ? WHERE id_curso = ?', [nombre_curso, descripcion_curso, foto_curso, id_curso]).then(() => {
      //this.presentAlert("Modificar", "curso Modificado" + descripcion_curso);
      this.seleccionarCurso();
    }).catch(e => {
      //this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
  }


  eliminarCurso(id_curso: number) { //Cree un update que llama a la tabla y modifica el activo y coloca 0 para deshabilitarla 
    return this.database.executeSql('UPDATE curso SET activo = 0 WHERE id_curso = ?', [id_curso])  //Cambie toda esta funcion menos el nombre 
      .then(() => {
        //this.presentAlert("Eliminar", "publicacion marcada como inactiva");
        this.seleccionarCurso();  // Actualizar la lista de noticias
      })
      .catch(e => {
        //this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
      });
  }

  //usuario

  seleccionarUsuario() {

    return this.database.executeSql('SELECT * FROM usuario ORDER BY id_usuario DESC', []).then(res => {  // Agrege "Where activo = 1" el 1 son para las cosas habilitadas.
      //variable para almacenar el resultado de la consulta
      let items: Usuario[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los registros a mi lista
          items.push({

            id_usuario: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            correo_usuario: res.rows.item(i).correo_usuario,
            telefono_usuario: res.rows.item(i).telefono_usuario,
            contrasena_usuario: res.rows.item(i).contrasena_usuario,
            rol_id_rol: res.rows.item(i).rol_id_rol,
            descripcion: res.rows.item(i).descripcion,
            foto: res.rows.item(i).foto

          })
        }

      }
      //actualizar el observable
      this.listadoUsuario.next(items as any);

    })



  }



  //-----------------------------------------------------------------------------------------------------------------------------
  guardarTipoStorage(correo: string, contrasena: string) {
    return this.database.executeSql(
      'SELECT id_usuario, rol_id_rol FROM usuario WHERE correo_usuario = ? AND contrasena_usuario = ?',
      [correo, contrasena]  // Asegúrate de pasar los parámetros correctos
    ).then(res => {
      // variable para almacenar el resultado de la consulta
      let items: any[] = [];

      // valido si trae al menos un registro
      if (res.rows.length > 0) {
        // recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          // agrego los registros a mi lista
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            rol_id_rol: res.rows.item(i).rol_id_rol
          });
        }
      }

      // Retornar los datos del usuario autenticado
      return items; // Retorna los datos
    }).catch(error => {
      // Manejo de errores
      //this.presentAlert("Error al ejecutar la consulta SQL: ", error);
      return []; // Retornar arreglo vacío en caso de error
    });
  }


  //-----------------------------------------------------------------------------------------------------------------------------

  seleccionarUsuarioLogin(correo: string, contrasena: string): Promise<Usuario | null> {
    return this.database.executeSql('SELECT * FROM usuario WHERE correo_usuario = ? AND contrasena_usuario = ?',
      [correo, contrasena]).then(res => {
        // Valido si trae al menos un registro
        if (res.rows.length > 0) {
          const usuario = res.rows.item(0); // Obtiene el primer registro
          // Retorno el objeto usuario encontrado
          return {
            id_usuario: usuario.id_usuario,
            nombre_usuario: usuario.nombre_usuario,
            correo_usuario: usuario.correo_usuario,
            telefono_usuario: usuario.telefono_usuario,
            contrasena_usuario: usuario.contrasena_usuario,
            rol_id_rol: usuario.rol_id_rol,
            descripcion: usuario.descripcion,
            foto: usuario.foto
          } as Usuario;
        } else {
          return null; // Retorna null si no hay coincidencias
        }
      })
      .catch(e => {
        //this.presentAlert('Error al buscar usuario', JSON.stringify(e));
        return null; // Asegúrate de retornar null en caso de error
      });
  }


  seleccionarVerificacionCorreo(correo: string): Promise<Usuario | null> {
    return this.database.executeSql('SELECT * FROM usuario WHERE correo_usuario = ?',
      [correo]).then(res => {
        // Valido si trae al menos un registro
        if (res.rows.length > 0) {
          const usuario = res.rows.item(0); // Obtiene el primer registro
          // Retorno el objeto usuario encontrado
          return {
            id_usuario: usuario.id_usuario,
            nombre_usuario: usuario.nombre_usuario,
            correo_usuario: usuario.correo_usuario,
            telefono_usuario: usuario.telefono_usuario,
            contrasena_usuario: usuario.contrasena_usuario,
            rol_id_rol: usuario.rol_id_rol,
            descripcion: usuario.descripcion,
            foto: usuario.foto
          } as Usuario;
        } else {
          return null; // Retorna null si no hay coincidencias
        }
      })
      .catch(e => {
        //this.presentAlert('Error al verificar datos duplicados', JSON.stringify(e));
        return null; // Asegúrate de retornar null en caso de error
      });
  }

  insertarUsuario(nombre_usuario: string, correo_usuario: string, telefono_usuario: number, contrasena_usuario: string, rol_id_rol: number, descripcion: string, foto: string) {
    // Asegurarte de que c sea un objeto Date
    return this.database.executeSql('INSERT INTO usuario (nombre_usuario, correo_usuario, telefono_usuario, contrasena_usuario, rol_id_rol, descripcion, foto) VALUES (?,?,?,?,?,?,?)',
      [nombre_usuario, correo_usuario, telefono_usuario, contrasena_usuario, rol_id_rol, descripcion, foto]
    ).then(() => {
      //this.presentAlert("Insertar", "Usuario Registrado");
      this.seleccionarUsuario();
    }).catch(e => {
      //this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }

  modificarUsuario(id_usuario: number, nombre_usuario: string, correo_usuario: string, telefono_usuario: number, descripcion: string, foto: string) {
    // Comprobar si los campos obligatorios son válidos
    if (!id_usuario || !nombre_usuario || !correo_usuario || !telefono_usuario) {
        //this.presentAlert("Modificar", "Error: Todos los campos son obligatorios.");
        return;
    }
    //this.presentAlert("service", "ID: " + id_usuario);
    return this.database.executeSql('UPDATE usuario SET nombre_usuario = ?, correo_usuario = ?, telefono_usuario = ?, descripcion = ?, foto = ? WHERE id_usuario = ?', [nombre_usuario, correo_usuario, telefono_usuario, descripcion, foto, id_usuario]).then(() => {
      //this.presentAlert("Modificar", "Usuario Modificado" + nombre_usuario + ('correo ') + correo_usuario);
      this.seleccionarUsuario();
    }).catch(e => {
      //this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
  }

  //-----------------------------------------------

  seleccionarCorreo(id_usuario: number): Promise<string | null> {
    return this.database.executeSql(
      'SELECT correo_usuario FROM usuario WHERE id_usuario = ?',
      [id_usuario]
    ).then(res => {
      if (res.rows.length > 0) {
        // Retorna directamente el valor de 'correo_usuario' del primer (y único) registro
        return res.rows.item(0).correo_usuario as string;
      } else {
        return null; // Retorna null si no hay resultados
      }
    }).catch(e => {
      //this.presentAlert('Error al obtener el correo', JSON.stringify(e));
      return null; // Maneja el error retornando null
    });
  }

  //--------------------------------------------------------------------------

  // tema

  seleccionarTema() {

    return this.database.executeSql('SELECT * FROM tema WHERE activo = 1 ORDER BY id_tema DESC', []).then(res => {  // Agrege "Where activo = 1" el 1 son para las cosas habilitadas.
      //variable para almacenar el resultado de la consulta
      let items: Tema[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los registros a mi lista
          items.push({

            id_tema: res.rows.item(i).id_tema,
            titulo_tema: res.rows.item(i).titulo_tema,
            descripcion_tema: res.rows.item(i).descripcion_tema,
            fecha_tema: res.rows.item(i).fecha_tema,
            foto_tema: res.rows.item(i).foto_tema,
            curso_id_curso: res.rows.item(i).curso_id_curso,
            activo: res.rows.item(i).activo

          })
        }

      }
      //actualizar el observable
      this.listadoTema.next(items as any);

    })
  }


  insertarTema(titulo_tema: string, descripcion_tema: string, fecha_tema: string, foto_tema: string, curso_id_curso: number, activo: number = 1) {
    // Asegurarte de que fecha_publi sea un objeto Date
    return this.database.executeSql('INSERT INTO tema(titulo_tema, descripcion_tema, fecha_tema, foto_tema, curso_id_curso, activo) VALUES (?,?,?,?,?,?)',
      [titulo_tema, descripcion_tema, fecha_tema, foto_tema, curso_id_curso, activo]
    ).then(() => {
      this.presentAlert("Insertar", "Tema Registrado");
      this.seleccionarTema();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }


  eliminarTema(id_tema: number) { //Cree un update que llama a la tabla y modifica el activo y coloca 0 para deshabilitarla 
    return this.database.executeSql('UPDATE tema SET activo = 0 WHERE id_tema = ?', [id_tema])  //Cambie toda esta funcion menos el nombre 
      .then(() => {
        this.presentAlert("Eliminar", "tema marcada como inactiva");
        this.seleccionarTema();  // Actualizar la lista de noticias
      })
      .catch(e => {
        this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
      });
  }

  modificarTema(id_tema: number, titulo_tema: string, descripcion_tema: string, foto_tema: string) {
    this.presentAlert("service", "ID: " + id_tema);
    return this.database.executeSql('UPDATE tema SET titulo_tema = ?, descripcion_tema = ?, foto_tema = ? WHERE id_tema = ?', [titulo_tema, descripcion_tema, foto_tema, id_tema]).then(() => {
      this.presentAlert("Modificar", "tema Modificado" + descripcion_tema);
      this.seleccionarTema();
    }).catch(e => {
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    });
  }

  //----------------------------------------------------

  // Comentario

  seleccionarComentario() {

    return this.database.executeSql('SELECT * FROM comentario WHERE activo = 1', []).then(res => {  // Agrege "Where activo = 1" el 1 son para las cosas habilitadas.
      //variable para almacenar el resultado de la consulta
      let items: Comentario[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los registros a mi lista
          items.push({

            idcomentario: res.rows.item(i).idcomentario,
            comentario: res.rows.item(i).comentario,
            usuario_id_usuario: res.rows.item(i).usuario_id_usuario,
            fecha_comentario: res.rows.item(i).fecha_comentario,
            publicacion_id_publi: res.rows.item(i).publicacion_id_publi,
            activo: res.rows.item(i).activo,

          })
        }

      }
      //actualizar el observable
      this.listadoComentario.next(items as any);

    })
  }

  insertarComentario(comentario: string, usuario_id_usuario: number, fecha_comentario: string, publicacion_id_publi: number, activo: number = 1) {
    // Asegurarte de que fecha_publi sea un objeto Date
    return this.database.executeSql('INSERT INTO comentario(comentario, usuario_id_usuario, fecha_comentario, publicacion_id_publi, activo) VALUES (?,?,?,?,?)',
      [comentario, usuario_id_usuario, fecha_comentario, publicacion_id_publi, activo]
    ).then(() => {
      this.presentAlert("Insertar", "Comentario Registrado");
      this.seleccionarComentario();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }

  eliminarComentario(idcomentario: number) { //Cree un update que llama a la tabla y modifica el activo y coloca 0 para deshabilitarla 
    return this.database.executeSql('UPDATE comentario SET activo = 0 WHERE idcomentario = ?', [idcomentario])  //Cambie toda esta funcion menos el nombre 
      .then(() => {
        this.presentAlert("Eliminar", "comentario marcada como inactiva");
        this.seleccionarComentario();  // Actualizar la lista de noticias
      })
      .catch(e => {
        this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
      });
  }

  //------lista-------------------------------

  seleccionarLista() {

    return this.database.executeSql('SELECT * FROM lista', []).then(res => {  // Agrege "Where activo = 1" el 1 son para las cosas habilitadas.
      //variable para almacenar el resultado de la consulta
      let items: Lista[] = [];
      //valido si trae al menos un registro
      if (res.rows.length > 0) {
        //recorro mi resultado
        for (var i = 0; i < res.rows.length; i++) {
          //agrego los registros a mi lista
          items.push({

            id_lista: res.rows.item(i).id_lista,
            fecha_inscripcion: res.rows.item(i).fecha_inscripcion,
            curso_id_curso: res.rows.item(i).curso_id_curso,
            usuario_id_usuario: res.rows.item(i).usuario_id_usuario,

          })
        }

      }
      //actualizar el observable
      this.listadoLista.next(items as any);

    })
  }


  insertarLista(fecha_inscripcion: string, curso_id_curso: number, usuario_id_usuario: number) {
    // Asegurarte de que fecha_publi sea un objeto Date
    return this.database.executeSql('INSERT INTO lista(fecha_inscripcion, curso_id_curso, usuario_id_usuario) VALUES (?,?,?)',
      [fecha_inscripcion, curso_id_curso, usuario_id_usuario]
    ).then(() => {
      this.presentAlert("Insertar", "Lista Registrado");
      this.seleccionarLista();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }


  seleccionarVerificacionLista(id_usuario: number): Promise<Lista | null> {
    return this.database.executeSql('SELECT * FROM Lista WHERE usuario_id_usuario = ?',
      [id_usuario]).then(res => {
        // Valido si trae al menos un registro
        if (res.rows.length > 0) {
          const lista = res.rows.item(0); // Obtiene el primer registro
          // Retorno el objeto usuario encontrado
          return {
            id_lista: lista.id_lista,
            fecha_inscripcion: lista.fecha_inscripcion,
            curso_id_curso: lista.curso_id_curso,
            usuario_id_usuario: lista.usuario_id_usuario
          } as Lista;
        } else {
          return null; // Retorna null si no hay coincidencias
        }
      })
      .catch(e => {
        //this.presentAlert('Error al verificar datos duplicados', JSON.stringify(e));
        return null; // Asegúrate de retornar null en caso de error
      });
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
