import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { API_CONFIG } from '../../api-config';

import { MovieApiService } from '../movie-api.service';
import { FavouritesService } from '../favourites.service';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie;
  id: number;
  imageUri = API_CONFIG['image-url'];
  isFavourite: boolean;

  constructor(
    private route: ActivatedRoute,
    private movieApiService: MovieApiService,
    private favouritesService: FavouritesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getMovie();
  }

  getMovie(): void {
    this.movieApiService.getMovie(this.id).subscribe(
      movie => {
        this.movie = movie;
        this.isFavourite = this.favouritesService.isFavourite(this.movie);
      },
      error => {
        console.error(error);
      }
    );
  }

  getImageUri(movie: Movie): string {
    if (movie.poster_path) {
      return this.imageUri + movie.poster_path;
    }
    return '../../assets/film-placeholder.jpg';
  }

  addToFavourites(movie: Movie): void {
    this.favouritesService.addToFavourites(movie);
    this.isFavourite = true;
  }

  removeFromFavourites(movie: Movie): void {
    this.favouritesService.removeFromFavourites(movie);
    this.isFavourite = false;
  }

  goBack(): void {
    this.location.back();
  }
}
