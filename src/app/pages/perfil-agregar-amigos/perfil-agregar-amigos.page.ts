import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
 
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-perfil-agregar-amigos',
  templateUrl: './perfil-agregar-amigos.page.html',
  styleUrls: ['./perfil-agregar-amigos.page.scss'],
})
export class PerfilAgregarAmigosPage implements OnInit {
  nombre: string="";
  telefono: string="";
  correo: string="";
  tipos: string="";

  constructor( private router:Router,private toastController: ToastController,private activateroute:ActivatedRoute) {
    this.activateroute.queryParams.subscribe(param =>{
      //valido si viene o no información en la ruta
      
      if(this.router.getCurrentNavigation()?.extras.state){
        this.nombre =this.router.getCurrentNavigation()?.extras?.state?.['name'];
        this.telefono =this.router.getCurrentNavigation()?.extras?.state?.['phone'];
        this.correo =this.router.getCurrentNavigation()?.extras?.state?.['email'];
        this.tipos = this.router.getCurrentNavigation()?.extras?.state?.['tipo'];
      }
    })

   }

  ngOnInit() {
  } 

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Haz agregado a ' +this.nombre+ ' a tus amigos',
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
