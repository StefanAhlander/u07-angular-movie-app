import { Injectable } from '@angular/core';
import { Movie } from './models/Movie.model';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  favourites: Movie[] | undefined;

  constructor() {
    this.favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  }

  getFavourites(): Movie[] {
    return this.favourites;
  }

  storeFavourites(): void {
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  addToFavourites(movie: Movie) {
    console.log(`Adding movie to favoutites: ${movie.id}`);
    this.favourites.push(movie);
    this.storeFavourites();
  }

  removeFromFavourites(movie: Movie) {
    console.log(`Removing movie to favoutites: ${movie.id}`);
    this.favourites = this.favourites.filter(i => i.id !== movie.id);
    this.storeFavourites();
  }

  isFavourite(movie: Movie) {
    return !!this.favourites.filter(i => {
      return i.id === movie.id;
    }).length;
  }
}
