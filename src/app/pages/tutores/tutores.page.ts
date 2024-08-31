import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tutores',
  templateUrl: './tutores.page.html',
  styleUrls: ['./tutores.page.scss'],
})
export class TutoresPage implements OnInit {
  
  //Es la lista de los amigos pero falsa xd
  items: Array<{ name: string, phone: string, email: string }> = [];

  //Activamos el item para que pueda desplegarse la informacion
  activeItem: { name: string, phone: string, email: string } | null = null;
  constructor() { }

  ngOnInit() {
    this.items = this.generateItems(5);
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
    const names = ['Juan Vasquez', 'Maria', 'Pedro', 'Ana', 'Luis', 'Carlos', 'Lucia', 'Jorge', 'Laura', 'Marta'];
    
    const phones = ['123-456-7890', '098-765-4321', '555-123-4567', '555-765-4321', '555-987-6543'];

    //Y queda como un nuevo objeto al igual que en java
    const newItems: Array<{ name: string, phone: string, email: string }> = [];

    //Aqui pasa el for para crear y hacer un push al igual que lo hacemos en git
    for (let i = 0; i < count; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomPhone = phones[Math.floor(Math.random() * phones.length)];
      newItems.push({
        name: `${randomName}`,
        phone: randomPhone,
        email: `${randomName.toLowerCase()}${i + 1}@gmail.com` //Se muestra la info con esta `` raras
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
