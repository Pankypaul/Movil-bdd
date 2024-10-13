import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  id!: number; //id del localStorage
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

  arregloPublicacion: any = [
    {
      id_publi: '',
      id_usuario: '',
      titulo: '',
      descripcion: '',
      foto_publi: '',
      activo: '',  //Agregue el activo aqui tambien
    }
  ]
  constructor(private router:Router /*,private activateroute:ActivatedRoute*/, 
              private bd: ServicebdService,
              private alertController: AlertController,
              private storage: NativeStorage) { 

    /*this.activateroute.queryParams.subscribe(param =>{
      //valido si viene o no información en la ruta
      
      if(this.router.getCurrentNavigation()?.extras.state){
        this.tipo =this.router.getCurrentNavigation()?.extras?.state?.['tipo1'];
        this.correo =this.router.getCurrentNavigation()?.extras?.state?.['correo2'];
        this.contrasena =this.router.getCurrentNavigation()?.extras?.state?.['contrase'];
      }
    })*/

  }

  ngOnInit() {
    this.bd.dbState().subscribe(data=>{
      //validar si la bd esta lista
      if(data){
        //subscribir al observable de la listaNoticias
        this.bd.fetchPublicacion().subscribe(res=>{
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
  
  irPagina(id_usuario: number, id_publi: number){

      id_usuario;
      console.log('ID del usuario:', id_usuario, id_publi); // Esto muestra el ID en la consola
      let navigationextras: NavigationExtras = {
  
        state: {
          id_us: id_usuario,
          id_cu: id_publi
        }
      }
      this.router.navigate(['/chat'],navigationextras);
    
  }

  irPerfil(){
    this.router.navigate(['/perfil-agregar-amigos'])
  }

  /*mostrarCard(id: string) {
    this.id = id;
  }*/

}
