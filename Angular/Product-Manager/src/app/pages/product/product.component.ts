import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  product = { id: 0, name: '', categoryId: '', price: 0, expirationDate: '', batch: '', stockQuantity: 0 };
  categories = [
    { id: 1, name: 'Eletrônicos' },
    { id: 2, name: 'Roupas' },
    { id: 3, name: 'Alimentos' }
  ]; 

  products = [
    { id: 1, name: 'Smartphone', categoryId: '1', price: 1999, expirationDate: '2025-12-31', batch: 'A123', stockQuantity: 50 },
    { id: 2, name: 'Camiseta', categoryId: '2', price: 49.99, expirationDate: '2026-01-01', batch: 'B234', stockQuantity: 100 }
  ];

  onEdit(product: any, tabGroup: any) {
    this.product = { ...product };  
    tabGroup.selectedIndex = 1;
  }

  onSubmit() {
    if (this.product.name.trim()) {

      if (this.product.id) {
        const index = this.products.findIndex(p => p.id === this.product.id);
        if (index !== -1) {
          this.products[index] = { ...this.product };
        }
        
      } else {
        this.product.id = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
        this.products.push({ ...this.product });
      }

      this.product = { id: 0, name: '', categoryId: '', price: 0, expirationDate: '', batch: '', stockQuantity: 0 };
    }
  }

  onDelete(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    if (this.product.id === id) {
      this.product = { id: 0, name: '', categoryId: '', price: 0, expirationDate: '', batch: '', stockQuantity: 0 }; // Limpa o formulário se o produto deletado estava em edição
    }
  }

  onCancel(tabGroup: any) {
    this.product = { id: 0, name: '', categoryId: '', price: 0, expirationDate: '', batch: '', stockQuantity: 0 };  // Limpa o formulário
    tabGroup.selectedIndex = 0;  
  }

}
