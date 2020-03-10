import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  private apiUrl = API_CONFIG['api-url'];

  constructor(private httpClient: HttpClient) {}

  getRatings(): Observable<any> {
    const indexURL = `${this.apiUrl}/3/certification/movie/list?api_key=${this.apiKey}`;

    return this.httpClient.get<any>(indexURL);
  }

  getTrendingMovies(): any {
    const trendingUrl = `${this.apiUrl}/3/trending/movie/week?api_key=${this.apiKey}`;

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

    const indexURL = `${this.apiUrl}${params}`;

    return this.httpClient.get<any>(indexURL);
  }

  getMovie(id: number): Observable<any> {
    const movieUrl = `${this.apiUrl}/3/movie/${id}?api_key=${this.apiKey}`;

    return this.httpClient.get<any>(movieUrl);
  }

  getMovieCredits(id: number): Observable<any> {
    const creditsUrl = `${this.apiUrl}/3/movie/${id}/credits?api_key=${this.apiKey}`;

    return this.httpClient.get<any>(creditsUrl);
  }

  getActor(id: number): Observable<any> {
    const actorUrl = `${this.apiUrl}/3/person/${id}?api_key=${this.apiKey}`;

    return this.httpClient.get<any>(actorUrl);
  }

  // https://api.themoviedb.org/3/search/multi?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
  search(query: string): Observable<any> {
    const params: string = [`query=${query}`, `api_key=${this.apiKey}`].join(
      '&'
    );
    const queryUrl = `${this.apiUrl}/3/search/multi?${params}`;
    return this.httpClient.get(queryUrl);
  }
}
