import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movie-api.service';
import { RatingsService } from '../ratings.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {
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
        this.getPopular();
      },
      error => {
        console.error(error);
      }
    );

    this.ratingsService.resendRegionsAndRatings();
  }

  getPopular(): any {
    this.movies$ = this.movieApiService.index(
      this.region,
      this.rating,
      'popular'
    );
  }
}
