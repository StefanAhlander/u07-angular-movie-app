import { Injectable } from '@angular/core';
import { IMovie } from './models/imovie.model';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  favourites: IMovie[] | undefined;

  constructor() {
    this.favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  }

  getFavourites(): IMovie[] {
    return this.favourites;
  }

  storeFavourites(): void {
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  addToFavourites(movie: IMovie) {
    this.favourites.push(movie);
    this.storeFavourites();
  }

  removeFromFavourites(movie: IMovie) {
    this.favourites = this.favourites.filter(i => i.id !== movie.id);
    this.storeFavourites();
  }

  isFavourite(movie: IMovie) {
    return !!this.favourites.filter(i => {
      return i.id === movie.id;
    }).length;
  }
}
