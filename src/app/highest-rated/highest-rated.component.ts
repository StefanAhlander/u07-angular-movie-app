import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movie-api.service';
import { RatingsService } from '../ratings.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-highest-rated',
  templateUrl: './highest-rated.component.html',
  styleUrls: ['./highest-rated.component.scss']
})
export class HighestRatedComponent implements OnInit {
  movies$: Observable<any>;
  region: string;
  rating: string;

  constructor(
    private movieApiService: MovieApiService,
    private ratingsService: RatingsService
  ) {}

  ngOnInit(): void {
    this.ratingsService.regionsAndRatings.subscribe(
      regionAndRating => {
        this.region = regionAndRating.region;
        this.rating = regionAndRating.rating;
        this.getHighestRated();
      },
      error => {
        console.error(error);
      }
    );

    this.ratingsService.resendRegionsAndRatings();
  }

  getHighestRated(): any {
    this.movies$ = this.movieApiService.index(
      this.region,
      this.rating,
      'average_vote'
    );
  }
}
