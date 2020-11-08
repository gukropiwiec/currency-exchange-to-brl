import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  /*
    key: {exp: int, data: any}
  */
  getOrSetCache(key: string, request: Observable<any>, msToExpire = 1800000): Observable<any> {
    let cache: any = {};

    cache = JSON.parse(localStorage.getItem(key));

    return (cache?.data && (cache?.exp > Date.now())) ?
      of(cache.data) :
      request.pipe(tap(v => {
        localStorage.setItem(key, JSON.stringify({data: v, exp: (Date.now() + msToExpire)}));
      }));
  }
}
