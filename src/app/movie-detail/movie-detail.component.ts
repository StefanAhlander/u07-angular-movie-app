import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { API_CONFIG } from '../../api-config';

import { MovieApiService } from '../movie-api.service';
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

  constructor(
    private route: ActivatedRoute,
    private movieApiService: MovieApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getMovie();
  }

  getMovie(): void {
    this.movieApiService
      .getMovie(this.id)
      .subscribe(movie => (this.movie = movie));
  }

  getImageUri(movie: Movie): string {
    if (movie.poster_path) {
      return this.imageUri + movie.poster_path;
    }
    return '../../assets/film-placeholder.jpg';
  }

  goBack(): void {
    this.location.back();
  }
}
