import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TrendingComponent } from './trending/trending.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { PopularComponent } from './popular/popular.component';
import { HighestRatedComponent } from './highest-rated/highest-rated.component';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { FavouritesComponent } from './favourites/favourites.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies/trending', pathMatch: 'full' },
  { path: 'movies/trending', component: TrendingComponent },
  { path: 'movies/popular', component: PopularComponent },
  { path: 'movies/favourites', component: FavouritesComponent },
  { path: 'movies/highest-rated', component: HighestRatedComponent },
  {
    path: 'movies/:id',
    component: MovieDetailComponent
  },
  { path: 'actors/:id', component: ActorDetailComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
