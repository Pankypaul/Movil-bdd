import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-publicacion',
  templateUrl: './mi-publicacion.page.html',
  styleUrls: ['./mi-publicacion.page.scss'],
})
export class MiPublicacionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irPagina(){
    this.router.navigate(['/editar-publicacion'])
  }
}
