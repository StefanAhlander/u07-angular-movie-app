import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movie-api.service';
import { RatingsService } from '../ratings.service';
import { Subscription } from 'rxjs';
import { IMovie } from '../models/imovie.model';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  movies: IMovie[];
  region: string;
  rating: string;
  subscription: Subscription;

  constructor(
    private movieApiService: MovieApiService,
    private ratingsService: RatingsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.ratingsService.getRegionAndRating().subscribe(
      regionAndRating => {
        this.region = regionAndRating.region;
        this.rating = regionAndRating.rating;
        this.getTrending();
      },
      error => {
        console.error(error);
      }
    );

    this.ratingsService.resendRegionsAndRatings();
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
