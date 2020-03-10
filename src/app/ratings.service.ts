import { Injectable } from '@angular/core';
import { MovieApiService } from './movie-api.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
  public regionsAndRatings = new Subject<any>();

  response: any;
  regions: string[];
  currentRegion: string;
  currentRating: string;

  constructor(private movieApiService: MovieApiService) {
    this.initializetRatings();
  }

  initializetRatings(): void {
    this.movieApiService.getRatings().subscribe(response => {
      this.response = response;
      this.regions = Object.keys(response.certifications);
      this.currentRegion = this.regions[0];
      this.currentRating = this.response.certifications[
        this.currentRegion
      ][0].certification;

      this.setRegionAndRating(
        this.response,
        this.regions,
        this.currentRegion,
        this.currentRating
      );
    });
  }

  setRegionAndRating(
    response: any,
    regions: string[],
    region: string,
    rating: string
  ): void {
    this.currentRegion = region;
    this.currentRating = rating;
    this.regionsAndRatings.next({ response, regions, region, rating });
  }

  resendRegionsAndRatings(): void {
    this.regionsAndRatings.next({
      response: this.response,
      regions: this.regions,
      region: this.currentRegion,
      rating: this.currentRating
    });
  }
}
