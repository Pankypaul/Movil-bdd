import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-codigo-email',
  templateUrl: './codigo-email.page.html',
  styleUrls: ['./codigo-email.page.scss'],
})
export class CodigoEmailPage implements OnInit {

  codigo!: number;
  correo!: string;

  constructor(private router: Router,
    private activedrouter: ActivatedRoute,
    private alertController: AlertController) {

    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.codigo = this.router.getCurrentNavigation()?.extras?.state?.['codigo'];
        this.correo = this.router.getCurrentNavigation()?.extras?.state?.['correo'];
      }
    })
  }

  codigo1!: number;
  mensaje_1: string = '';


  ngOnInit() {
  }
  codigoCorrecto = String(this.codigo1).length === 6;


  validateNumero(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, ''); // Permite solo dígitos numéricos
  }

  validarCodigo() {

    this.mensaje_1 = '';

    Number(this.codigo1);
    Number(this.codigo);

    if (!this.codigoCorrecto) {
      this.mensaje_1 = 'No puede estar vacio';

    }

    if (this.codigo !== this.codigo1) {
      this.mensaje_1 = 'El código no coincide';
    }
    if (this.codigo.toString() === this.codigo1.toString()) {
      //this.presentAlert('PASO','PASO');
      let navigationsExtras: NavigationExtras = {
        state: {
          correo: this.correo
        }
      }
      this.router.navigate(['/codigo-contrasena'], navigationsExtras);
    }
  }

  async presentAlert(titulo_publi: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo_publi,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
