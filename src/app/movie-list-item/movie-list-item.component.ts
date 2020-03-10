import { Component, OnInit, Input } from '@angular/core';
import { IMovie } from '../models/imovie.model';
import { API_CONFIG } from '../../api-config';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrls: ['./movie-list-item.component.scss']
})
export class MovieListItemComponent implements OnInit {
  @Input() movie: IMovie;
  imageUri = API_CONFIG['image-url'];

  constructor() {}

  ngOnInit(): void {}

  getImageUri(movie: IMovie): string {
    if (movie.poster_path) {
      return this.imageUri + movie.poster_path;
    }
    return '../../assets/film-placeholder.jpg';
  }
}
