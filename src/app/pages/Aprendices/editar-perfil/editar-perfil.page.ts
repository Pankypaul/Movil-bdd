import { Component, OnInit } from '@angular/core';
import {  NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  nombre:string="Carlos Espinoza";
  correo:string="carlos54@gmail.com";
  telefono:string="9 2342 8729";
  tip:string="Aprendiz";
  carrera:string="Ingenieria en informatica";
  descripcion:string="Soy estudiante de tercer año, estudio ingenieria en informatica, me gusta el deporte y ver animes, me especializo en programación web y bases de datos.";

  

  constructor(private router:Router) { 
    
  }

  irPagina() {
    

    /*ejemplo contexto  "ojala no sea la misma variable es opcional solo envia una por cada redireccion"*/
    let navigationextras: NavigationExtras = {

      state: {
        nom: this.nombre,
        email: this.correo,
        fono: this.telefono,
        tipo: this.tip,
        car: this.carrera,
        desc: this.descripcion
        
      }
      

    }
    
    
    this.router.navigate(['/perfil'],navigationextras);
    
  }
  
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
      handler: () => {
        //this.router.navigate(['/editar-perfil'] );
        console.log("no");
      }
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.irPagina(); 
        console.log("si");
      }
    }
  ];
  
  

  ngOnInit() {
  }
  
}
