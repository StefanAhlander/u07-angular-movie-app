import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchResults: any[];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.getResults().subscribe(
      success => {
        this.searchResults = success;
      },
      error => {
        console.error(error);
      }
    );
  }
}
