import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-perfil-agregar-amigos',
  templateUrl: './perfil-agregar-amigos.page.html',
  styleUrls: ['./perfil-agregar-amigos.page.scss'],
})
export class PerfilAgregarAmigosPage implements OnInit {

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
  
  id!: number;

  constructor(private router: Router,
    private toastController: ToastController,
    private activateroute: ActivatedRoute,
    private bd: ServicebdService,
    private storage: NativeStorage) {
    this.activateroute.queryParams.subscribe(() => {
      //valido si viene o no información en la ruta

      if (this.router.getCurrentNavigation()?.extras.state) {
        this.id = this.router.getCurrentNavigation()?.extras?.state?.['id'];
      }
    })

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
  }


  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Haz agregado a ' + this.arregloUsuario.nombre + ' a tus amigos',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.router.navigate(['/login']);
      }
    }
  ];

}
