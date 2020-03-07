import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movie-api.service';
import { RatingsService } from '../ratings.service';
import { Subscription } from 'rxjs';
import { Movie } from '../models/Movie.model';

@Component({
  selector: 'app-highest-rated',
  templateUrl: './highest-rated.component.html',
  styleUrls: ['./highest-rated.component.scss']
})
export class HighestRatedComponent implements OnInit {
  movies: Movie[];
  region: string;
  rating: string;
  subscription: Subscription;

  constructor(
    private movieApiService: MovieApiService,
    private ratingsService: RatingsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.ratingsService
      .getRegionAndRating()
      .subscribe(regionAndRating => {
        this.region = regionAndRating.region;
        this.rating = regionAndRating.rating;
        this.getHighestRated();
      });

    this.ratingsService.resendRegionsAndRatings();
  }

  getHighestRated(): any {
    this.movieApiService
      .index(this.region, this.rating, 'average_vote')
      .subscribe(movies => (this.movies = movies.results));
  }
}
