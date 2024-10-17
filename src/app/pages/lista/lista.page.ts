import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  arregloUsuario: any = [
    {
      id_usuario: '',
      rol_id_rol: '',
      nombre_usuario: '',
      telefono_usuario: '',
      correo_usuario: '',
      foto: '',
    }
  ];

  arregloLista: any = [
    {
      id_lista: '',
      fecha_inscripcion: '',
      curso_id_curso: '',
      usuario_id_usuario: '',
    }
  ];

  arregloCurso: any = [
    {
      id_curso: '',
      nombre_curso: '',
      descripcion_curso: '',
      foto_curso: '',
      usuario_id_usuario: '',
      activo: '',  //Agregue el activo aqui tambien
    }
  ]

  curso1: any;



  id_curso_c!: number; //contex

  items: Array<{ name: string, phone: string, email: string }> = [];

  //Activamos el item para que pueda desplegarse la informacion
  activeItem: { name: string, phone: string, email: string } | null = null;
  constructor(private router:Router, 
    private activateroute: ActivatedRoute,
    private bd: ServicebdService, 
    private storage: NativeStorage, 
    private alertController: AlertController) { 
    this.activateroute.queryParams.subscribe(() => {
    //valido si viene o no información en la ruta

    if (this.router.getCurrentNavigation()?.extras.state) {
      this.id_curso_c = this.router.getCurrentNavigation()?.extras?.state?.['id_c'];
      this.curso1 = this.router.getCurrentNavigation()?.extras?.state?.['curso'];
    }
  })}

  ngOnInit() {

    this.bd.dbState().subscribe(data => {
      // validar si la bd está lista
      if (data) {
        // suscribirse al observable de fetchUsuario
        this.bd.fetchUsuario().subscribe(res => {
          this.arregloUsuario = res;
        })
      }
    })

    this.bd.dbState().subscribe(data => {
      // validar si la bd está lista
      if (data) {
        // suscribirse al observable de fetchUsuario
        this.bd.fetchLista().subscribe(res => {
          this.arregloLista = res;
        })
      }
    })

    
    this.bd.dbState().subscribe(data => {
      // validar si la bd está lista
      if (data) {
        // suscribirse al observable de fetchUsuario
        this.bd.fetchCurso().subscribe(res => {
          this.arregloCurso = res;
        })
      }
    })
    
  }

  
  //Esto lo del scroll infito

  /*loadData(event: CustomEvent) {
    setTimeout(() => {
      const newItems = this.generateItems(20);
      this.items = [...this.items, ...newItems];
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }*/

  //Aqui se crea el item al azar como lo hacimos en python
  generateItems(count: number): Array<{ name: string, phone: string, email: string }> {
    const names = ['Juan Vasquez', 'Maria Anaiz Riquelme', 'Pedro Salasar', 'Ana Palma', 'Luis Antonio Rios', 'Carlos Gonzales', 'Melissa Torres', 'Jorge Vicente Fuentes', 'Laura Flor Hortencia', 'Marta Victoria Torres', 'Martin Elias Salvador'];
    
    const phones = ['9 7890 1222', '9 8765 4321', '9 5123 4567', '9 5765 4321', '9 2987 6543'];

    //Y queda como un nuevo objeto al igual que en java
    const newItems: Array<{ name: string, phone: string, email: string }> = [];

    //Aqui pasa el for para crear y hacer un push al igual que lo hacemos en git
    for (let i = 0; i < count; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomPhone = phones[Math.floor(Math.random() * phones.length)];
      newItems.push({
        name: `${randomName}`,
        phone: randomPhone,
        email: `${randomName.toLowerCase().slice(0, 3)}@gmail.com` //Se muestra la info con esta `` raras
      });
    }

    return newItems;
  }

  //Aquii activamos el panel para que se despliegue (solo se activa) 
  togglePanel(item: { name: string, phone: string, email: string }) {
    this.activeItem = this.activeItem === item ? null : item; 
  }

  //Al presionar se abre la pestaña por asi decir y muestra la información  
  isExpanded(item: { name: string, phone: string, email: string }): boolean {
    return this.activeItem === item;
  }

}

