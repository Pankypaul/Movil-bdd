import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  id: string= "";


  arregloPublicacion: any = [
    {
      id: '',
      titulo: '',
      descripcion: '',
      foto_publi: '',
      activo: '',  //Agregue el activo aqui tambien
    }
  ]
  constructor(private router:Router /*,private activateroute:ActivatedRoute*/, private bd: ServicebdService) { 

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
  }
  irPagina(){
    this.router.navigate(['/chat'])
  }

  irPerfil(){
    this.router.navigate(['/perfil-agregar-amigos'])
  }

  mostrarCard(id: string) {
    this.id = id;
  }

}
