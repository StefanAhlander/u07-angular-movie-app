import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  private apiKey = API_CONFIG['api-key'];
  private apiURL = API_CONFIG['api-url'];

  constructor(private httpClient: HttpClient) {}

  getRatings(): Observable<any> {
    const indexURL = `${this.apiURL}/3/certification/movie/list?api_key=${this.apiKey}`;

    return this.httpClient.get<any>(indexURL);
  }

  getTrendingMovies(): any {
    const trendingUrl = `${this.apiURL}/3/trending/movie/week?api_key=${this.apiKey}`;

    return this.httpClient.get<any>(trendingUrl);
  }

  index(
    region: string,
    rating: string,
    sort: string = 'popularity'
  ): Observable<any> {
    if (region === undefined || rating === undefined) {
      return of({
        results: []
      });
    }

    const params = [
      `/3/discover/movie?region=${region}`,
      `certification_country=${region}`,
      `certification=${rating}`,
      `sort_by=${sort}.desc`,
      `api_key=${this.apiKey}`
    ].join('&');

    const indexURL = `${this.apiURL}${params}`;

    return this.httpClient.get<any>(indexURL);
  }

  getMovie(id: number): Observable<any> {
    const movieUrl = `${this.apiURL}/3/movie/${id}?api_key=${this.apiKey}`;

    return this.httpClient.get<any>(movieUrl);
  }

  getMovieCredits(id: number): Observable<any> {
    const creditsUrl = `${this.apiURL}/3/movie/${id}/credits?api_key=${this.apiKey}`;

    return this.httpClient.get<any>(creditsUrl);
  }

  getActor(id: number): Observable<any> {
    const actorUrl = `${this.apiURL}/3/person/${id}?api_key=${this.apiKey}`;
    console.log(actorUrl);

    return this.httpClient.get<any>(actorUrl);
  }
}
