import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tutores',
  templateUrl: './tutores.page.html',
  styleUrls: ['./tutores.page.scss'],
})
export class TutoresPage implements OnInit {
  
  //Es la lista de los amigos pero falsa xd
  items: Array<{ name: string, phone: string, email: string }> = [];

  tip:String='Tutor';
  //Activamos el item para que pueda desplegarse la informacion
  activeItem: { name: string, phone: string, email: string } | null = null;
  constructor(private router:Router) { }

  ngOnInit() {
    this.items = this.generateItems(5);
  }

  // irpagina y le paso el item por que no me funcionaba asi
  irPagina(item: { name: string, phone: string, email: string }) {
    let navigationextras: NavigationExtras = {
      state: {
        name: item.name,
        phone: item.phone,
        email: item.email,
        tipo: this.tip
      }
    };
    this.router.navigate(['/perfil-agregar-amigos'], navigationextras);
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
