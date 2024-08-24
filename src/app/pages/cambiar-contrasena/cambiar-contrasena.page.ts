import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {
  correo: string = '';
  nueva: string = '';
  repetirNueva: string = '';


  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {

    if (!this.correo || !this.nueva || !this.repetirNueva) {
      console.log("Porfavor, rellene los campos en blanco");
      alert('Porfavor, rellene los campos en blanco');
    } else {
      if(this.nueva == this.repetirNueva){

        console.log('Correo:',this.correo);
        console.log('Contraseña 1:',this.nueva);
        console.log('Contraseña 2:',this.repetirNueva);
        this.router.navigate(['/login']);
        
      }else{
        alert('Las contraseñas no son iguales')
        console.log('Las contraseñas no son iguales');
      }
    }
  }
}

