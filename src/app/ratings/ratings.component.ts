import { Component, OnInit } from '@angular/core';
import { RatingsService } from '../ratings.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  response: any;
  regions: string[];
  ratings: any[];
  currentRegion: string;
  currentRating: string;
  ratingDesc: string;

  constructor(private ratingsService: RatingsService) {}

  ngOnInit(): void {
    this.populateVars();
    this.ratingsService.resendRegionsAndRatings();
  }

  populateVars(): void {
    this.ratingsService.getRegionAndRating().subscribe((data: any) => {
      if (data.response === undefined) {
        return;
      }
      this.response = data.response;
      this.regions = data.regions;
      this.currentRegion = data.region;
      this.currentRating = data.rating;
      this.ratings = this.response.certifications[this.currentRegion];
      this.ratingDesc = this.response.certifications[data.region].filter(
        i => i.certification === data.rating
      )[0].meaning;
    });
  }

  onRegionChange(region: string): void {
    this.currentRegion = region;
    this.currentRating = this.response.certifications[
      this.currentRegion
    ][0].certification;
    this.onRatingChange(this.currentRating);
  }

  onRatingChange(rating: string): void {
    this.currentRating = rating;
    this.ratingsService.setRegionAndRating(
      this.response,
      this.regions,
      this.currentRegion,
      this.currentRating
    );
  }
}
