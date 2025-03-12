import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {


  category = { id: 0, name: '' };  // Categoria sendo editada ou nova
  categories = [
    { id: 1, name: 'Eletrônicos' },
    { id: 2, name: 'Roupas' },
    { id: 3, name: 'Alimentos' }
  ];  // Lista de categorias

  onEdit(category: any, tabGroup: any) {
    this.category = { ...category };  
    tabGroup.selectedIndex = 1;
  }

  onSubmit() {
    if (this.category.name.trim()) {
      if (this.category.id) {

        const index = this.categories.findIndex(cat => cat.id === this.category.id);
        if (index !== -1) {
          this.categories[index] = { ...this.category }; 
        }
      } else {

        this.category.id = this.categories.length ? Math.max(...this.categories.map(c => c.id)) + 1 : 1;
        this.categories.push({ ...this.category });
      }

      this.category = { id: 0, name: '' };
    }
  }

  onDelete(id: number) {
    this.categories = this.categories.filter(cat => cat.id !== id);
    if (this.category.id === id) {
      this.category = { id: 0, name: '' }; 
    }
  }

  onCancel(tabGroup: any) {
    this.category = { id: 0, name: '' };  
    tabGroup.selectedIndex = 0;  
  }

}
