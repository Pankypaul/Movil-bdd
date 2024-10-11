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

  nombre: string = "";
  telefono!: number;
  correo: string = "";
  tipos: string = "";
  descripcion: string = "";
  foto: string = "";
  id_usuario: string = "";
  rol1!: number;

  id!: number;

  constructor(private router: Router,
    private toastController: ToastController,
    private activateroute: ActivatedRoute,
    private bd: ServicebdService,
    private storage: NativeStorage) {
    this.activateroute.queryParams.subscribe(() => {
      //valido si viene o no información en la ruta

      if (this.router.getCurrentNavigation()?.extras.state) {
        this.nombre = this.router.getCurrentNavigation()?.extras?.state?.['nom'];
        this.rol1 = this.router.getCurrentNavigation()?.extras?.state?.['rol'];
        this.correo = this.router.getCurrentNavigation()?.extras?.state?.['email'];
        this.foto = this.router.getCurrentNavigation()?.extras?.state?.['img'];
        this.id_usuario = this.router.getCurrentNavigation()?.extras?.state?.['id'];
      }
    })

  }

  ngOnInit() {
  }


  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Haz agregado a ' + this.nombre + ' a tus amigos',
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
