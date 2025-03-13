import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../../models-dto/product-model';
import { ProductDto } from '../../models-dto/product-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api =  'https://localhost:7218/Product';

  constructor(private http: HttpClient) {};

  getAllProducts(): Observable<ProductModel[]> {
    try {
      return this.http.get<ProductModel[]>(`${this.api}/getAll`);
    
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error; 
    }
  }

  createProduct(product: ProductModel): Observable<ProductModel> {
    
    let produtTosend: ProductDto = {
      name: product.name, 
      price: product.price,       
      stockQuantity: product.stockQuantity,   
      categoryId: product.categoryId,      
      expirationDate: product.expirationDate,  
      batch: product.batch,
      isDeleted: false
    };

    return this.http.post<ProductModel>(`${this.api}/create`, produtTosend);
  }

  getProductById(id: string): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${this.api}/${id}`);
  }

  getProductsByCategory(categoryId: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.api}/category/${categoryId}`);
  }

  updateProduct(id: string, product: ProductModel): Observable<void> {

    let produtTosend: ProductDto = {
      categoryId: product.categoryId,      
      name: product.name, 
      price: product.price,       
      expirationDate: product.expirationDate,  
      batch: product.batch,
      stockQuantity: product.stockQuantity,   
      isDeleted: false
    };

    return this.http.put<void>(`${this.api}/update/${id}`, produtTosend);
  }

  softDeleteProduct(id: string): Observable<void> {
    return this.http.put<void>(`${this.api}/delete/${id}`, {});
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/deleteDefinitely/${id}`,);
  }

}
