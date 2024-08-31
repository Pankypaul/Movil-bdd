import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isMenuDisabled = true;
  
  constructor(private router: Router) {  
    this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      console.log('Navigated to:', event.url);  

      //Si queremos mostramos el menu sera isMenuDisabled = false
      if (event.url.includes('/menu')) {  //Aqui muestra el menu
        this.isMenuDisabled = false;

      }else if (event.url.includes('/tutores')) {  //Aqui tammbien muestra el menu
        this.isMenuDisabled = false; 

      }else if (event.url.includes('/perfil')) {  //Aqui tammbien muestra el menu
        this.isMenuDisabled = false; 

      }else if (event.url.includes('/nosotros')) {  //Aqui tammbien muestra el menu
        this.isMenuDisabled = false; 

      }else if (event.url.includes('/perfil')) {  //Aqui tammbien muestra el menu
        this.isMenuDisabled = false; 

      }else if (event.url.includes('/ayuda')) {  //Aqui tammbien muestra el menu
        this.isMenuDisabled = false; 

      }else if (event.url.includes('/asignaturas')) {  //Aqui tammbien muestra el menu
        this.isMenuDisabled = false; 

      } else {          
        this.isMenuDisabled = true;       //Si el menu no es ninguno de los anteriores este no mostrara el menu.
      }
    }
    
  });

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
  },
  
];




}
