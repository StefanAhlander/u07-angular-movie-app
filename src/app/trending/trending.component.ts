import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movie-api.service';
import { RatingsService } from '../ratings.service';
import { Subscription } from 'rxjs';
import { Movie } from '../models/Movie.model';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {
  movies: any[];
  region: string;
  rating: string;
  subscription: Subscription;

  constructor(
    private movieApiService: MovieApiService,
    private ratingsService: RatingsService
  ) {}

  ngOnInit(): void {
    const current: any = this.ratingsService.getCurrentRegionAndRatingValues();
    if (current.region) {
      this.region = current.region;
      this.rating = current.rating;
      this.getTrending();
    }

    this.subscription = this.ratingsService
      .getRegionAndRating()
      .subscribe(regionAndRating => {
        this.region = regionAndRating.region;
        this.rating = regionAndRating.rating;
        this.getTrending();
      });

    this.ratingsService.resendRegionsAndRatings();
  }

  getTrending(): any {
    this.movieApiService
      .getTrendingMovies()
      .subscribe(movies => (this.movies = movies.results));
  }
}
