import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movie-api.service';
import { IMovie } from '../models/imovie.model';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  movies: IMovie[];

  constructor(private movieApiService: MovieApiService) {}

  ngOnInit(): void {
    this.getTrending();
  }

  getTrending(): any {
    this.movieApiService.getTrendingMovies().subscribe(
      (movies: { results: IMovie[] }) => (this.movies = movies.results),
      error => {
        console.error(error);
      }
    );
  }
}
