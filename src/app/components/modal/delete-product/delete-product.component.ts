import { Component, Input } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss',
  providers: [ProductsService]
})
export class DeleteProductComponent {
  constructor(
    private productsService: ProductsService,
    private toastr: ToastrService
  ) {}

  @Input() product: any;

  deleteProduct() {
    this.productsService.deleteProduct(this.product.id).subscribe({
      next: (res) => this.toastr.success('Delete'),
      error: (err) => this.toastr.error(err)
    });

  }
}
