import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.page.html',
  styleUrls: ['./amigos.page.scss'],
})
export class AmigosPage implements OnInit {

  // Lista falsa de amigos
  items: Array<{ name: string, phone: string, email: string }> = [];
  activeItem: { name: string, phone: string, email: string } | null = null;

  constructor(private router: Router) { }
  tip:string="Aprendiz";
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
        tipo:  this.tip
      }
    };
    this.router.navigate(['/perfil-agregar-amigos'], navigationextras);
  }

  // Generación de items aleatorios
  generateItems(count: number): Array<{ name: string, phone: string, email: string }> {
    const names = ['Juan Perez', 'Julian Mendez', 'Maria Luisa Fernández', 'Pedro Andres Caceres', 'Ana Valenzuela', 'Luis Gonzales', 'Carlos Hector Ortiz', 'Lucia Victoria Torres', 'Jorge Rojas', 'Laura Hernández', 'Marta Nuñez'];
    const phones = ['9 7890 1222', '9 8765 4321', '9 5123 4567', '9 5765 4321', '9 2987 6543'];

    const newItems: Array<{ name: string, phone: string, email: string }> = [];

    for (let i = 0; i < count; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomPhone = phones[Math.floor(Math.random() * phones.length)];
      const randomEmail = `${randomName.replace(/ /g, '').toLowerCase().slice(0, 4)}${i+1}@gmail.com`;
      
      newItems.push({
        name: randomName,
        phone: randomPhone,
        email: randomEmail 
      });
    }

    return newItems;
  }

  // Activar o desactivar el panel de información
  togglePanel(item: { name: string, phone: string, email: string }) {
    this.activeItem = this.activeItem === item ? null : item; 
  }

  // Verificar si el panel está expandido
  isExpanded(item: { name: string, phone: string, email: string }): boolean {
    return this.activeItem === item;
  }
}
