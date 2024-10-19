import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-mi-publicacion',
  templateUrl: './mi-publicacion.page.html',
  styleUrls: ['./mi-publicacion.page.scss'],
})
export class MiPublicacionPage implements OnInit {

  arregloPublicacion: any = [
    {
      id: '',
      titulo: '',
      descripcion: '',
      foto_publi: '',
      activo: '',  //Agregue el activo aqui tambien
    }
  ]

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

  constructor(private router: Router, private bd: ServicebdService, private alertController: AlertController) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      //validar si la bd esta lista
      if (data) {
        //subscribir al observable de la listaNoticias
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
    //this.presentAlert12('ID', x.id_publi);
    let navigationsExtras: NavigationExtras = {
      state: {
        publicar: x
      }
    }

    this.router.navigate(['/editar-publicacion'], navigationsExtras);

  }

  eliminar(x: any) {
    //this.presentAlert12('ID para eliminar ', x.id_publi); //Este funciona (x.id_publi)
    this.bd.eliminarPublicacion(x.id_publi); //no cambie nada de esto ya que ocupe la misma funcion...
   
  }
}
