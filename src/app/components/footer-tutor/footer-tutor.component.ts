import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-footer-tutor',
  templateUrl: './footer-tutor.component.html',
  styleUrls: ['./footer-tutor.component.scss'],
})
export class FooterTutorComponent  implements OnInit {

  constructor(private router: Router, private toastController:ToastController,
    private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {}
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
}



