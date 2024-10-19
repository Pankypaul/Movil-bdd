import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mensaje_1!: string;
  mensaje_2!: string;
  mensaje_3!: string;

  correo: string = '';     //correo del input
  contrasena: string = ''; //contraseña del input

  tipo: string = "";         //tipo del registrar (context)

  usuario: any;

  validarContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!-_()]).{8,}$/;


  constructor(
    private router: Router,
    //private toastController: ToastController,
    private activedrouter: ActivatedRoute,
    private bd: ServicebdService,
    private alertController: AlertController,
    private storage: NativeStorage) {

    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
      }
    })
  }



  ngOnInit() {
    this.storage.clear()
      
  }

  async presentAlert12(title: string, msj: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }


  async borrarStorage() {
    await this.storage.clear();  // Borra todo el almacenamiento
    console.log("Storage borrado");
  }


  irPagina() {
    /*let navigationextras: NavigationExtras = {
      state: {
        tipo1: this.tipo,
        contrase: this.contrasena,
        correo2: this.correo
      }
    }*/
    this.borrarStorage();  // Se ejecuta automáticamente cuando se carga la página

    this.mensaje_3 = '';

    this.correo = this.correo.replace(/\s+/g, '');
    this.correo = this.correo.trim(); // Para el correo
    this.contrasena = this.contrasena.trim(); // Para el correo

    if (this.correo == "" || this.contrasena === "") {
      this.mensaje_3 = 'Rellena ambos campos.';
    }

    if (this.correo.trim() !== "" && this.contrasena.trim() !== "") {
      //console.log('correo y contraseña llenos');

      //Valide que haya un punto y una arroba y que haya algo antes y después de ellos

      const tieneArroba = (this.correo.match(/@/g) || []).length === 1; // Verifica que solo haya un '@'
      const tieneCaracteresInvalidos = /[(),<>;:\[\]{}]/.test(this.correo); // Verifica caracteres no permitidos

      const posicionArroba = this.correo.indexOf('@');
      const posicionPunto = this.correo.lastIndexOf('.');

      const algoAntesArroba = posicionArroba > 0; // Asegura que haya algo antes del '@'
      const algoEntreArrobaYPunto = posicionPunto > posicionArroba + 1; // Asegura que haya algo entre el '@' y el '.'
      const algoDespuesPunto = posicionPunto < this.correo.length - 1; // Asegura que haya algo después del '.'



      if (!this.correo || this.correo.trim() === "" || this.correo.trim().toUpperCase() === "NONE") {
        this.mensaje_3 = 'Los campos no pueden quedar vacios.';
      }
      else {

        if (tieneArroba && !tieneCaracteresInvalidos && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto) {
          console.log("El correo es válido");
        } else {
          this.mensaje_3 = 'El Correo o contraseña inválido.';
        }
      }

      // Validar la contraseña
      if (this.contrasena.trim() !== "") {
        if (!this.validarContraseña.test(this.contrasena) || this.contrasena.length < 8) {
          this.mensaje_3 = 'El Correo o contraseña inválido.';
        }
      }

      if (this.correo.trim() !== "" && this.contrasena.trim() !== "" && tieneArroba && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto && this.correo.length >= 8 && this.validarContraseña.test(this.contrasena) && this.contrasena.length >= 8) {
        
        this.bd.isDBReady.subscribe(async (val) => {
          if (val) {
            const usuarioAutenticado = await this.bd.seleccionarUsuarioLogin(this.correo, this.contrasena);
        
            if (usuarioAutenticado) {
              const usuarioStorage = await this.bd.guardarTipoStorage(this.correo, this.contrasena);
        
              if (usuarioStorage.length > 0) { // Asegúrate de que el arreglo tenga elementos
                const { id_usuario, rol_id_rol } = usuarioStorage[0]; // Desestructuramos para obtener id_usuario y rol_id_rol
                this.storage.setItem('Id', id_usuario); // Asegúrate de que sean strings si es necesario
                this.storage.setItem('Rol', rol_id_rol); // Asegúrate de que sean strings si es necesario
                //this.presentAlert12("Variables creadas", `ID: ${id_usuario}, Rol: ${rol_id_rol}`); // Mensaje informativo
        
                this.router.navigate(['/menu']); // Navegar si el usuario existe
              } else {
                // Si no se pudo obtener el usuario almacenado
                console.log("No se encontraron datos del usuario en el almacenamiento.");
              }
        
            } else {
              // Mostrar mensaje de error
              this.mensaje_3 = 'El Correo o contraseña son inválidos.';
            }
          }
        });
        
      }
    }
  }





  onSubmit() {

  }
}