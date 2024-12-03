import { Component } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  map,
  scan,
  takeWhile,
} from 'rxjs';
import { Product } from './dto/product.dto';
import { ProductService } from './services/product.service';
import { Settings } from './dto/product-settings.dto';
import { ProductApiResponse } from './dto/product-api-response.dto';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$!: Observable<Product[]>;
  private loadMore$ = new BehaviorSubject<Settings>({ limit: 12, skip: 0 });
  private totalProducts: number = 0;

  constructor(private productService: ProductService) {
    this.products$ = this.loadMore$.pipe(
      concatMap((settings) =>
        this.productService.getProducts(settings).pipe(
          map((response: ProductApiResponse) => {
            if (this.totalProducts === 0) {
              this.totalProducts = response.total;
            }
            return {
              products: response.products,
            };
          })
        )
      ),
      scan(
        (acc, { products }) => ({
          products: [...acc.products, ...products],
        }),
        { products: [] as Product[] }
      ),
      map((accumaltedlist) => accumaltedlist.products),
      takeWhile((products) => products.length < this.totalProducts, true)
    );
  }

  loadMore() {
    const currentSkip = this.loadMore$.value.skip;
    const currentLimit = this.loadMore$.value.limit;
    this.loadMore$.next({
      limit: currentLimit,
      skip: currentSkip + currentLimit,
    });
  }
}
