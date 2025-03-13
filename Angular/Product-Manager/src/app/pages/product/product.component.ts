import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProductModel } from '../../../models-dto/product-model';
import { CategoryModel } from '../../../models-dto/category-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  constructor(private productService: ProductService, private categoryService: CategoryService, private snackBar: MatSnackBar) {}

  products: ProductModel[] = [];
  selectedProduct?: ProductModel;
  product: ProductModel = { id: '', name: '', categoryId: '', price: 0, expirationDate: '', batch: '', stockQuantity: 0 };
  categories: CategoryModel[] = [];
  isLoading = false;
  isSaving = false;
  
  async ngOnInit(): Promise<void> {
    await this.loadProducts();
    await this.loadCategories();
  }

  async loadProducts(): Promise<void> {
    this.isLoading = true;

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
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
        this.product = { id: '', name: '', categoryId: '', price: 0, expirationDate: '', batch: '', stockQuantity: 0 };
        this.isSaving = false;
      },
      error: (error) => {
        this.showMessage('Ocorreu um erro ao criar o produto.', true);
        this.isSaving = false;
      }
    });
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
        this.product = { id: '', name: '', categoryId: '', price: 0, expirationDate: '', batch: '', stockQuantity: 0 };
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
    this.product = { id: '', name: '', categoryId: '', price: 0, expirationDate: '', batch: '', stockQuantity: 0 };
    tabGroup.selectedIndex = 0;  
  }

  showMessage(message: string, isError: boolean = false) {
    this.snackBar.open(message, 'Fechar', {
      duration: 10000,
      panelClass: isError ? 'error-snackbar' : 'success-snackbar'
    });
  }

}
