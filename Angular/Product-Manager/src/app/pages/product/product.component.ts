import { Component } from '@angular/core';
import { CategoryModel } from '../../../models-dto/category-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsModalComponent } from '../../modals/product-details-modal/product-details-modal.component';

import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductModel } from '../../../models-dto/product-model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  constructor(private productService: ProductService, 
    private categoryService: CategoryService, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  products: ProductModel[] = [];
  selectedProduct?: ProductModel;
  product: ProductModel = { id: '', name: '', categoryId: '', price: 0, expirationDate: '', batch: '', stockQuantity: 0, category: ''};
  categories: CategoryModel[] = [];
  filter: string = '';
  filteredProducts: ProductModel[] = [];
  isLoading = false;
  isSaving = false;
  
  openProductDetails(product: ProductModel): void {
    
    const category = this.categories.find(a => a.id === product.categoryId);

    let productData: ProductModel = { 
      ...product, 
      category: category?.name || 'Categoria Desconhecida'
    };
    
    this.dialog.open(ProductDetailsModalComponent, {
      width: '400px',
      data: productData,
      
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
    await this.loadCategories();
  }

  async loadProducts(): Promise<void> {
    this.isLoading = true;

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.showMessage('Não foi possível carregar os produtos.', true); 
      }
    });

  }

  async loadCategories(): Promise<void> {
    this.isLoading = true;

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.showMessage('Não foi possível carregar produtos.', true);  
      }
    });
  }

  async createProduct(): Promise<void> {

    if (this.selectedProduct){
      await this.updateProduct(this.selectedProduct.id);
      return;
    }

    this.isSaving = true;
    this.productService.createProduct(this.product).subscribe({
      next: (product) => {
        this.loadProducts();
        this.showMessage('Produto criado com sucesso!');
        this.product = { id: '', name: '', categoryId: '', price: 0, expirationDate: '', batch: '', stockQuantity: 0, category: ''};
        this.isSaving = false;
      },
      error: (error) => {
        this.showMessage('Ocorreu um erro ao criar o produto.', true);
        this.isSaving = false;
      }
    });
  }

  filterByCategory(): void {
    if (this.filter) {
      this.filteredProducts = this.products.filter(product => product.categoryId === this.filter);
    } else {
      this.filteredProducts = this.products;
    }
  }

  async getProductByCategoryId(id: string): Promise<void> {
    this.productService.getProductsByCategory(id).subscribe({
      next: (product) => this.products = product
    });
  }

  async updateProduct(id: string): Promise<void> {
    if (!this.selectedProduct) return;

    this.isSaving = true;

    this.productService.updateProduct(id, this.selectedProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.showMessage('Produto atualizado com sucesso!');
        this.isSaving = false;
        this.product = { id: '', name: '', categoryId: '', price: 0, expirationDate: '', batch: '', stockQuantity: 0, category: ''};
      },
      error: (error) => {
        this.showMessage('Erro ao atualizar produto.', true);
        this.isSaving = false;
      }
    });
  }

  async deleteProduct(id: string): Promise<void> {
    this.productService.softDeleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (error) => {
        this.showMessage('Erro ao excluir produto.', true);
      }
    });
  }

  onEdit(product: ProductModel, tabGroup: any) {
    this.selectedProduct = { ...product };
    this.product = this.selectedProduct;
    tabGroup.selectedIndex = 1;
  }

  async onSubmit() {
    if (this.product.name.trim()) {
      await this.createProduct();
    }
  }

  onCancel(tabGroup: any) {
    this.product = { id: '', name: '', categoryId: '', price: 0, expirationDate: '', batch: '', stockQuantity: 0, category: '' };
    tabGroup.selectedIndex = 0;  
  }

  showMessage(message: string, isError: boolean = false) {
    this.snackBar.open(message, 'Fechar', {
      duration: 10000,
      panelClass: isError ? 'error-snackbar' : 'success-snackbar'
    });
  }

}
