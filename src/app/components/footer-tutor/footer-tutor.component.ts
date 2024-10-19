import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ToastController, ActionSheetController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-footer-tutor',
  templateUrl: './footer-tutor.component.html',
  styleUrls: ['./footer-tutor.component.scss'],
})
export class FooterTutorComponent  implements OnInit {

  valor!: number;

  constructor(private router: Router, private toastController:ToastController,
    private actionSheetCtrl: ActionSheetController,private storage: NativeStorage,private alertController: AlertController) { }

  ngOnInit() {}

  irPerfil(){
    this.router.navigate(['/perfil'])
  }

  irPagina(){
    this.router.navigate(['/publicar1']);
  }
  irCurso(){
    this.router.navigate(['/curso']);
  }

  async presentActionSheet() {
    const actionSheetButtons = [
      {
        text: 'Crear Curso',
        data: {
          action: 'Crear Curso',
        },
        handler: () => {
          this.irCurso();
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        data: {
          action: 'cancelar',
        },
        handler: () => {
          console.log('Cancelar clicado');
        }
        
      }
      
    ];
    
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: actionSheetButtons,
    });

    await actionSheet.present();
  

  }
  
  async dividirRoles() {
    // Obtener el rol almacenado en el storage
    const rol = await this.storage.getItem('Rol');
  
    // Verificar el valor del rol y redirigir a la página correspondiente
    if (rol === 1) {
      // Redirigir a la página correspondiente si el rol es 1
      this.presentActionSheet();
    } else if (rol === 0) { //Aprendiz 
      // Redirigir a la página correspondiente si el rol es 0
      this.router.navigate(['/publicar']);
    } else {
      // Si no existe o es otro valor, puedes manejar el error o redirigir a una página por defecto
      //this.presentAlert('Error' + 'No se pudo determinar el rol del usuario.');
    }
  }

  async dividirRolesAsig(){

    const rol = await this.storage.getItem('Rol');
  
    // Verificar el valor del rol y redirigir a la página correspondiente
    if (rol === 1 || rol === 0) {
      // Redirigir a la página correspondiente si el rol es 1
      this.router.navigate(['/asignaturas1'])

    } else {
      // Si no existe o es otro valor, puedes manejar el error o redirigir a una página por defecto
      //this.presentAlert('Error' + 'No se pudo determinar el rol del usuario.');
    }
  }

  async irUsuarios(){
    const rol = await this.storage.getItem('Rol');
  
    // Verificar el valor del rol y redirigir a la página correspondiente
    if (rol === 1 || rol === 0) {
      // Redirigir a la página correspondiente si el rol es 1
      this.router.navigate(['/aprendiz'])

    } else {
      // Si no existe o es otro valor, puedes manejar el error o redirigir a una página por defecto
      //this.presentAlert('Error' + 'No se pudo determinar el rol del usuario.');
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



