import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  arregloCurso: any = [
    {
      id_curso: '',
      nombre_curso: '',
      descripcion_curso: '',
      foto_curso: '',
      activo: '',  //Agregue el activo aqui tambien
    }
  ]

  constructor(private router: Router, private bd: ServicebdService, private alertController: AlertController) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      //validar si la bd esta lista
      if (data) {
        //subscribir al observable de la listaNoticias
        this.bd.fetchCurso().subscribe(res => {
          this.arregloCurso = res;
        })
      }
    })
  }

  irPagina(){
    this.router.navigate(['/editar-curso'])
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
    this.presentAlert12('ID', x.id_curso);
    let navigationsExtras: NavigationExtras = {
      state: {
        curso: x
      }
    }

    this.router.navigate(['/editar-curso'], navigationsExtras);

  }

  eliminar(x: any) {
    this.presentAlert12('ID para eliminar ', x.id_curso); //Este funciona (x.id_publi)
    this.bd.eliminarCurso(x.id_curso); //no cambie nada de esto ya que ocupe la misma funcion...
   
  }

}
