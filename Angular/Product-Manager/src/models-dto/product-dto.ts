export interface ProductDto {
    categoryId: string;
    name: string;
    price: number;
    expirationDate: string; 
    batch: string;
    stockQuantity?: number;
    isDeleted?: boolean;
}
