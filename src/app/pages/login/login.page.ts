import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email : string = '';
  password : string = '';

  constructor(private router:Router) { }

  ngOnInit() {
  }


  onSubmit(){
    if (!this.email || !this.password) {
      alert('Porfavor, rellene los campos en blanco');

    }
    else{
      // Aquí iría la lógica para enviar los datos al servidor
      console.log('Correo:', this.email);
      console.log('Contraseña:', this.password);

      // Navegar a otra página si el formulario es válido
      this.router.navigate(['/menu']);
    }
    
    
    
    
  }

  



}
