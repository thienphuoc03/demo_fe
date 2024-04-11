import { Component, OnInit } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { DeleteProductComponent } from '../components/modal/delete-product/delete-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, DeleteProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductsService, DatePipe]
})
export class ProductsComponent implements OnInit {
  constructor(
    private readonly productsService: ProductsService,
    private readonly datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  products: any[] = [];

  getformattedDate(date: Date) {
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return transformDate;
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((res: any) => (this.products = res));
  }

  
}
