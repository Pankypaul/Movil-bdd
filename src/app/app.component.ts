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

      
      if (event.url.includes('/menu')) {
        this.isMenuDisabled = false; 
      }else if (event.url.includes('/tutores')) {
        this.isMenuDisabled = false; 
      }else if (event.url.includes('/perfil')) {
        this.isMenuDisabled = false; 
      }else if (event.url.includes('/nosotros')) {
        this.isMenuDisabled = false; 
      }else if (event.url.includes('/perfil')) {
        this.isMenuDisabled = false; 
      }else if (event.url.includes('/ayuda')) {
        this.isMenuDisabled = false; 
      }else if (event.url.includes('/asignaturas')) {
        this.isMenuDisabled = false; 
      } else {
        this.isMenuDisabled = true; 
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
