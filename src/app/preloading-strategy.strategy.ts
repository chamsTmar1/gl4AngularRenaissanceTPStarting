import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//Docs Preloading Strategy : 

//abstract class PreloadingStrategy {
//    abstract preload(route: Route, fn: () => Observable<any>): Observable<any>;
//}

export class PreloadingStrategyStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return load();
    } else {
      return of(null);
    }
  }
}
