import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string= "";      //correo que entrega registrar (context)
  contras: string= "";    //contraseña que entrega registrar (context)

  correo: string = '';     //correo del input
  contrasena: string = ''; //contraseña del input

  tipo: string= "";         //tipo del registrar (context)
  
  validarContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!-_()]).{8,}$/;


  constructor(private router: Router, private toastController: ToastController, private activateroute:ActivatedRoute) { 
    this.activateroute.queryParams.subscribe(param =>{
      //valido si viene o no información en la ruta
      
      if(this.router.getCurrentNavigation()?.extras.state){
        this.tipo =this.router.getCurrentNavigation()?.extras?.state?.['tip'];
        this.email =this.router.getCurrentNavigation()?.extras?.state?.['correo1'];
        this.contras =this.router.getCurrentNavigation()?.extras?.state?.['contra'];
      }
    })
  }

  ngOnInit() {
  }

  irPagina(){
    let navigationextras: NavigationExtras= {
      state: {
        tipo1: this.tipo,
        contrase: this.contrasena,
        correo2: this.correo
      }
    }

    console.log("correo1",this.email);
    console.log("contraseña",this.contras);
    if (!this.correo || !this.contrasena) {
      this.CamposVacios('bottom');
    } else if (this.correo.length >= 50 || this.contrasena.length >= 25) {
      this.maxCaracter('bottom')
    } else{
      
      //Valide que haya un punto y una arroba y que haya algo antes y después de ellos

      // Validación mejorada del correo 
      const tieneArroba = this.correo.includes('@');       //Incluye '@' (Devuelve true or false)
      const posicionArroba = this.correo.indexOf('@');     //Ver la posición del '@' (Devuelve numeros)
      const posicionPunto = this.correo.lastIndexOf('.');  //Incluye si incluye '.' (Devuelve numeros)

      //indexOf(): Se utiliza para encontrar la primera aparición de un carácter o subcadena.
      //lastIndexOf(): Se utiliza para encontrar la última aparición de un carácter o subcadena.
      
      const algoAntesArroba = posicionArroba > 0; // Se Asegura que haya algo antes de '@' (Devuelve true or false)
      const algoEntreArrobaYPunto = posicionPunto > posicionArroba + 1; // Se Asegura que haya algo entre el '@' y el '.' (Devuelve true or false)
      const algoDespuesPunto = posicionPunto < this.correo.length - 1; // Se asegura que haya algo después del '.' (Punto) (Devuelve true or false)
      
      if (tieneArroba && algoAntesArroba && algoEntreArrobaYPunto && algoDespuesPunto && this.correo == this.email && this.contras == this.contrasena) {
        console.log("El correo es válido");
        
        this.router.navigate(['/menu'],navigationextras);
        /*console.log("tieneArroba",tieneArroba);
        console.log("posicionArroba",posicionArroba);
        console.log("posicionPunto",posicionPunto);

        console.log("algoAntesArroba",algoAntesArroba);
        console.log("algoEntreArrobaYPunto",algoEntreArrobaYPunto);
        console.log("algoDespuesPunto",algoDespuesPunto);*/  
      }else {
        this.correoYContrasenaInvalido('bottom');
      }
      

    }

  }

  onSubmit() {


    
  }
  async CamposVacios(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Por favor, rellene los campos en blanco',
      duration: 1500,
      position: position,
    });

    await toast.present();
  } 

  async correoYContrasenaInvalido(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Correo o contraseña incorrecta.',
      duration: 1500,
      position: position,
    });

    await toast.present();
  } 

  async maxCaracter(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Supera el maximo de caracteres.',
      duration: 1500,
      position: position,
    });

    await toast.present();
  } 

}
