import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo : string = '';
  contrasena : string = '';

  constructor(private router: Router) {}

  ngOnInit() {
  }

  onSubmit(){
    if (!this.correo || !this.contrasena) {
      alert('Porfavor, rellene los campos en blanco');

    }
    else{
      
      console.log('Correo:', this.correo);
      console.log('Contraseña:', this.contrasena);

      
      this.router.navigate(['/menu']);
    }


  }
}
