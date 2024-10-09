import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-aprendiz',
  templateUrl: './aprendiz.page.html',
  styleUrls: ['./aprendiz.page.scss'],
})
export class AprendizPage implements OnInit {


  arregloUsuario: any = [
    {
      id_usuario: '',
      rol_id_rol: '',
      nombre_usuario: '',
      telefono_usuario: '',
      correo_usuario: '',
      foto: '',
    }
  ];
  /*
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario
  ( id_usuario INTEGER PRIMARY KEY autoincrement, 
    nombre_usuario VARCHAR (60) NOT NULL,
     correo_usuario VARCHAR(320) NOT NULL UNIQUE, 
     telefono_usuario INTEGER NOT NULL,
      contrasena_usuario VARCHAR(25) NOT NULL, 
      rol_id_rol INTEGER NOT NULL, 
      descripcion VARCHAR(250),
      foto VARCHAR(300), 
      FOREIGN KEY(rol_id_rol) REFERENCES rol(id_rol));";*/

  

  constructor(private bd: ServicebdService, private router: Router) { }

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
  }

  ir(){
    this.router.navigate (['/perfil-agregar-amigos'])
  }


}
