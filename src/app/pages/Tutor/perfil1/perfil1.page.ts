import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil1',
  templateUrl: './perfil1.page.html',
  styleUrls: ['./perfil1.page.scss'],
})
export class PerfilPage implements OnInit {


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
        this.router.navigate(['/login']); 
      }
    }
  ];

}
