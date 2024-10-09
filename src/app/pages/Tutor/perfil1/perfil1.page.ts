import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil1',
  templateUrl: './perfil1.page.html',
  styleUrls: ['./perfil1.page.scss'],
})
export class PerfilPage implements OnInit {
  descripcion: string = "Soy estudiante de tercer año, estudio ingenieria en informatica, me gusta el deporte y ver animes, me especializo en programación web y bases de datos.";

  constructor(private router: Router) { 
  }

  ngOnInit() {
  }

  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.router.navigate(['/home']); 
      }
    }
  ];

}
