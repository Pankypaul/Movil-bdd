import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre:string="Carlos Espinoza";
  correo:string="carlos54@gmail.com";
  telefono:string="9 2342 8729";
  tip:string="Aprendiz";
  carrera:string="Ingenieria en informatica";
  descripcion:string="Soy estudiante de tercer año, estudio ingenieria en informatica, me gusta el deporte y ver animes, me especializo en programación web y bases de datos.";


  

  constructor(private router: Router, private activateroute:ActivatedRoute) { 

    this.activateroute.queryParams.subscribe(param =>{
      //valido si viene o no información en la ruta
      
      if(this.router.getCurrentNavigation()?.extras.state){
        
        this.nombre =this.router.getCurrentNavigation()?.extras?.state?.['nom'];
        this.correo =this.router.getCurrentNavigation()?.extras?.state?.['email'];
        this.telefono =this.router.getCurrentNavigation()?.extras?.state?.['fono'];
        this.tip =this.router.getCurrentNavigation()?.extras?.state?.['tipo'];
        this.carrera =this.router.getCurrentNavigation()?.extras?.state?.['car'];
        this.descripcion =this.router.getCurrentNavigation()?.extras?.state?.['desc'];
      }
    })
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
        this.router.navigate(['/login']); 
      }
    }
  ];

}
