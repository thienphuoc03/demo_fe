import { Component, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ProductsService],
})
export class HomeComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productsService
      .getAllProducts()
      .subscribe((res) => (this.products = res));
  }
}
