import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private subject = new Subject();

  constructor() {}

  setResults(results: object[]): void {
    this.subject.next(results);
  }

  getResults(): Observable<any> {
    return this.subject.asObservable();
  }
}
