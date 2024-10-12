import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  id_usu!: number; //contex
  id_pub!: number; //contex

  //bdd
  arregloPublicacion: any = [
    {
      id_publi: '', 
      usuario_id_usuario: '',
      titulo: '',
      descripcion: '',
      foto_publi: '',
      activo: '',  //Agregue el activo aqui tambien
    }
  ]

  arregloUsuario: any = [
    {
      rol_id_rol: '',
      nombre_usuario: '',
      telefono_usuario: '',
      correo_usuario: '',
      foto: '',
      descripcion: '',
      id_usuario: '',
      
    }
  ];

  constructor(private router: Router,
              private activateroute: ActivatedRoute,
              private bd: ServicebdService) { 

    this.activateroute.queryParams.subscribe(() => {
      //valido si viene o no información en la ruta

      if (this.router.getCurrentNavigation()?.extras.state) {
        this.id_usu = this.router.getCurrentNavigation()?.extras?.state?.['id_us'];
        this.id_pub = this.router.getCurrentNavigation()?.extras?.state?.['id_cu'];
      }
    })
  }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      // validar si la bd está lista
      if (data) {
        // suscribirse al observable de fetchUsuario
        this.bd.fetchPublicacion().subscribe(res => {
          this.arregloPublicacion = res;
        })
      }
    })
    this.bd.dbState().subscribe(data => {
      // validar si la bd está lista
      if (data) {
        // suscribirse al observable de fetchUsuario
        this.bd.fetchUsuario().subscribe(res => {
          this.arregloUsuario = res;
        })
      }
    })
  }

  irPagina(){
    this.router.navigate(['/perfil-agregar-amigos'])
  }

}
