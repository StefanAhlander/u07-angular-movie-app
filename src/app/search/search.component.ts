import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../movie-api.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResult: any;
  timer: any;
  searchValue = '';

  constructor(
    private movieApiService: MovieApiService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {}

  search(query: string): void {
    this.searchResult = null;
    clearTimeout(this.timer);
    this.timer = setTimeout(this.executeSearch.bind(this), 250, query);
  }

  executeSearch(query: string): void {
    if (query === '') {
      this.searchService.setResults(null);
      return;
    }

    this.movieApiService.search(query).subscribe(
      success => {
        this.searchResult = success.results.filter(
          (item: { media_type: string }) =>
            item.media_type === 'movie' || item.media_type === 'person'
        );
        this.searchService.setResults(this.searchResult);
      },
      error => {
        console.error(error);
      }
    );
  }
}
