import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductModel } from '../../../models-dto/product-model';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrl: './product-details-modal.component.css'
})
export class ProductDetailsModalComponent {

  constructor (
    public dialogRef: MatDialogRef<ProductDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public productData: ProductModel

  ) { }

  close(): void {
    this.dialogRef.close();
  }

}
