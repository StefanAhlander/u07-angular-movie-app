import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  searchResults: any;

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {
    this.searchService.searchResults.subscribe(
      success => {
        this.searchResults = success;
      },
      error => {
        console.error(error);
      }
    );
  }

  goTo(path: string, id: number): void {
    this.searchResults = null;
    const searchBoxElm: HTMLInputElement = document.querySelector('#searchBox');
    searchBoxElm.value = '';
    this.router.navigate([path, id]);
  }
}
