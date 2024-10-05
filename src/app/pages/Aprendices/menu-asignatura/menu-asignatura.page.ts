import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-menu-asignatura',
  templateUrl: './menu-asignatura.page.html',
  styleUrls: ['./menu-asignatura.page.scss'],
})
export class MenuAsignaturaPage implements OnInit {
  nombre:string="Romina Riquelme"; 
  telefono:string="9 1213 5445";
  correo:string="Ro_Riquelme@gmail.com"; 
  tip:String='Tutor';
  constructor(private router:Router) { }

  ngOnInit() {
  }

  irPagina() {
  let navigationextras: NavigationExtras = {
      state: {
        name: this.nombre,
        phone: this.telefono,
        email: this.correo,
        tipo:  this.tip
      }
    };
    this.router.navigate(['/perfil-agregar-amigos'], navigationextras);
  }
  irPubli(){
    this.router.navigate(['/publicar1'])
  }
  irLista(){
    this.router.navigate(['/lista'])
  }

}
