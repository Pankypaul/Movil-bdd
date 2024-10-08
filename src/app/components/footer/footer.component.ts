import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  constructor(private router:Router,private storage: NativeStorage,private alertController: AlertController) { }

  valor!: number;

  ngOnInit() {}

  async dividirRoles() {
    // Obtener el rol almacenado en el storage
    const rol = await this.storage.getItem('Rol');
  
    // Verificar el valor del rol y redirigir a la página correspondiente
    if (rol === '1') {
      // Redirigir a la página correspondiente si el rol es 1
      this.router.navigate(['/curso']);
    } else if (rol === '0') { //Aprendiz 
      // Redirigir a la página correspondiente si el rol es 0
      this.router.navigate(['/publicar']);
    } else {
      // Si no existe o es otro valor, puedes manejar el error o redirigir a una página por defecto
      this.presentAlert('Error' + 'No se pudo determinar el rol del usuario.');
    }
  }
  

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Info',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
