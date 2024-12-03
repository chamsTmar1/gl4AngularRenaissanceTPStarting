import { Component } from "@angular/core";
import { BehaviorSubject, Observable, concatMap, map, scan, takeWhile,tap } from "rxjs";
import { Product } from "./dto/product.dto";
import { ProductService } from "./services/product.service";
import { Settings } from "./dto/product-settings.dto";
import { ProductApiResponse } from "./dto/product-api-response.dto";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  products$!: Observable<Product[]>;
  private loadMore$ = new BehaviorSubject<Settings>({ limit: 12, skip: 0 });
  private totalProducts: number = 0;  

  constructor(private productService: ProductService) {
    this.products$ = this.loadMore$.pipe(
      concatMap((settings) =>
        this.productService.getProducts(settings).pipe(//pourquoi quand j'utilise mergeMap  le takewhile n'a aucun effet 
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
      map((accumaltedlist) => accumaltedlist.products),  //ml5r map bch ta5ou reuslt ili jaya ml scan w bch traj3 observable fih list of products accumated
      /* role of true : When set to true the value that caused predicate to return false will also be emitted.*/

      /* Quand tu ajoutes true, la dernière valeur qui fait que la condition devient fausse est incluse dans l'émission.
       Cela garantit que la liste finale des produits (ayant une longueur 194 de dans notre exemple) 
       est émise avant que le flux ne se termine.*/ 
      takeWhile( (products) => products.length < this.totalProducts,true)
      //ne sera pas realise
      )
      
    ;
  }

  loadMore() {
    const currentSkip = this.loadMore$.value.skip;
    const currentLimit = this.loadMore$.value.limit;
    this.loadMore$.next({ limit: currentLimit, skip: currentSkip + currentLimit });
  }
}
