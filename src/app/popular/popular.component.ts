import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movie-api.service';
import { RatingsService } from '../ratings.service';
import { Subscription } from 'rxjs';
import { IMovie } from '../models/imovie.model';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {
  movies: IMovie[];
  region: string;
  rating: string;
  subscription: Subscription;

  constructor(
    private movieApiService: MovieApiService,
    private ratingsService: RatingsService
  ) {}

  ngOnInit(): void {
    this.subscription = this.ratingsService.regionsAndRatings.subscribe(
      regionAndRating => {
        this.region = regionAndRating.region;
        this.rating = regionAndRating.rating;
        this.getPopular();
      },
      error => {
        console.error(error);
      }
    );

    this.ratingsService.resendRegionsAndRatings();
  }

  getPopular(): any {
    this.movieApiService.index(this.region, this.rating, 'popular').subscribe(
      movies => (this.movies = movies.results),
      error => {
        console.error(error);
      }
    );
  }
}
