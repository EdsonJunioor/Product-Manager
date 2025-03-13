import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryDto } from '../../models-dto/category-dto';
import { CategoryModel } from '../../models-dto/category-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private api =  'https://localhost:7218/Category';

  constructor(private http: HttpClient) {};

  getAllCategories(): Observable<CategoryModel[]> {
    try {
      return this.http.get<CategoryModel[]>(`${this.api}/getAll`);
    
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error; 
    }
  }

  createCategory(category: CategoryModel): Observable<CategoryModel> {
    
    let categoryTosend: CategoryDto = {
      name: category.name, 
      isDeleted: false
    };

    return this.http.post<CategoryModel>(`${this.api}/create`, categoryTosend);
  }

 getCategoryById(id: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`${this.api}/${id}`);
  }

  updateCategory(id: string, category: CategoryModel): Observable<void> {

    let categoryTosend: CategoryDto = {
      name: category.name, 
      isDeleted: false
    };

    return this.http.put<void>(`${this.api}/update/${id}`, categoryTosend);
  }

  softDeleteCategory(id: string): Observable<void> {
    return this.http.put<void>(`${this.api}/delete/${id}`, {});
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/deleteDefinitely/${id}`,);
  }
}
