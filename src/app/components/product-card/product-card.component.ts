import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  providers: [CurrencyPipe]
})
export class ProductCardComponent {
  @Input()
  product!: Product;

  constructor(
    private currencyPipe: CurrencyPipe
  ) {}

  formatToVND(amount: number): string | null {
    return this.currencyPipe.transform(amount, 'VND', 'symbol', '1.0-0');
  }
}
