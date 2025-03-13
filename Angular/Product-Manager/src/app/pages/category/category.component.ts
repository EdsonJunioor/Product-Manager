import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../../models-dto/category-model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  
  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar) {};

  category: CategoryModel = { id: '', name: ''};
  selectedCategory?: CategoryModel;
  categories: CategoryModel[] = [];
  isLoading = false;
  isSaving = false;


  async ngOnInit(): Promise<void> {
    await this.loadCategories();
  }

  async onEdit(category: CategoryModel, tabGroup: any) {
    this.selectedCategory = {...category}
    this.category = this.selectedCategory;
    tabGroup.selectedIndex = 1;
  }

  async onSubmit() {
    if (this.category.name.trim()) {
      await this.createCategory();
      return;
    }

    return;
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
        this.showMessage('Não foi possível carregar categorias.', true);      }
    });
  }

  async createCategory(): Promise<void> {

    if(this.selectedCategory) {
      this.updateCategory(this.selectedCategory.id);
      return;
    }

    this.isSaving = true;

    this.categoryService.createCategory(this.category).subscribe({
      next: (catecogy) => {
        this.loadCategories();
        this.showMessage('Categoria criada com sucesso!');
        this.isSaving = false;
      },
      error: (error) => {
        this.showMessage('Ocorreu um erro ao criar categoria.', true);
        this.isSaving = false;
      }
    });
  }

  async updateCategory(id: string): Promise<void> {
    if (!this.selectedCategory) return;

    this.isSaving = true;

    this.categoryService.updateCategory(id, this.selectedCategory).subscribe({
      next: () => {
        this.loadCategories();
        this.showMessage('Categoria atualizada com sucesso!');
        this.isSaving = false;
      },
      error: (error) => {
        this.showMessage('Erro ao atualizar categoria.', true);
        this.isSaving = false;
      }
    });
  }

  async deleteCategory(id: string): Promise<void> {
    this.categoryService.softDeleteCategory(id).subscribe({
      next: () => {
        this.loadCategories();
      },
      error: (error) => {
        this.showMessage('Erro ao excluir categoria.', true);
      }
    });
  }

  onCancel(tabGroup: any) {
    this.category = { id: '', name: '' };  
    tabGroup.selectedIndex = 0;  
  }

  showMessage(message: string, isError: boolean = false) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: isError ? 'error-snackbar' : 'success-snackbar'
    });
  }

}
