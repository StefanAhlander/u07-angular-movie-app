import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private subject = new Subject();
  private searchString = new Subject();

  constructor() {}

  setResults(results: object[]): void {
    this.subject.next(results);
  }

  getResults(): Observable<any> {
    return this.subject.asObservable();
  }
}
