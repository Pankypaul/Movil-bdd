import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
})
export class NosotrosPage implements OnInit {

  tipo: string ="";
  valor: string ="";
  

  constructor(private storage: NativeStorage,private alertController: AlertController) { }

  ngOnInit() {
    
  }

  consultar(){
    this.storage.getItem(this.tipo).then(data=>{
      this.presentAlert('Valor es : '+ data);
      this.valor = data;
    })
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
