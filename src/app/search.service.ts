import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchResults = new Subject();

  constructor() {}

  setResults(results: any): void {
    this.searchResults.next(results);
  }

  getResults(): Observable<any> {
    return this.searchResults.asObservable();
  }
}
