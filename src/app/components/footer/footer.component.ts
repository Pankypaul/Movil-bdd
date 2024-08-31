import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {}

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
