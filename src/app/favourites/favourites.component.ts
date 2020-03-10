import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/Movie.model';
import { FavouritesService } from '../favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  favourites: Movie[] | undefined;
  hasFavourites: boolean;

  constructor(private favouritesService: FavouritesService) {}

  ngOnInit(): void {
    this.getFavourites();
  }

  getFavourites(): void {
    this.favourites = this.favouritesService.getFavourites();
    this.hasFavourites = this.favourites.length > 0;
  }

  addToFavourites(movie: Movie): void {}

  removeFromFavourites(movie: Movie): void {
    this.favouritesService.removeFromFavourites(movie);
    this.getFavourites();
  }
}
