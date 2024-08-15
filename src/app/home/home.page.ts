import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {}

  home(){
    //Crear el codigo de que quiera de la logica
    this.router.navigate(['/home']);
  }

  perfil(){
    //Crear el codigo de que quiera de la logica
    this.router.navigate(['/Perfil']);
  }

  amigos(){
    //Crear el codigo de que quiera de la logica
    this.router.navigate(['/amigos']);
  }

  asignaturas(){
    //Crear el codigo de que quiera de la logica
    this.router.navigate(['/asignaturas'])
  }

  nosotros(){
    //Crear el codigo de que quiera de la logica
    this.router.navigate(['/nosotros'])
  }

  buscar(){
    //Crear el codigo de que quiera de la logica
    this.router.navigate(['/buscar'])
  }

}
