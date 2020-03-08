// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RatingsComponent } from './ratings/ratings.component';
import { TrendingComponent } from './trending/trending.component';
import { MovieListItemComponent } from './movie-list-item/movie-list-item.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { PopularComponent } from './popular/popular.component';
import { HighestRatedComponent } from './highest-rated/highest-rated.component';

// Services
import { MovieApiService } from './movie-api.service';
import { RatingsService } from './ratings.service';
import { CastListComponent } from './cast-list/cast-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent,
    PageNotFoundComponent,
    RatingsComponent,
    TrendingComponent,
    MovieListItemComponent,
    MovieDetailComponent,
    PopularComponent,
    HighestRatedComponent,
    CastListComponent
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule],
  providers: [MovieApiService, RatingsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
