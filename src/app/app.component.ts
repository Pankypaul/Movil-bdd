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
      console.log('Navigated to:', event.url);  // Verifica la URL de navegación

      // Cambia 'tabs/home' al path de la pestaña donde deseas que el menú esté habilitado
      if (event.url.includes('/menu')) {
        this.isMenuDisabled = false; // Habilitar el menú
      } else {
        this.isMenuDisabled = true; // Deshabilitar el menú
      }
    }
    
  });
}




}
