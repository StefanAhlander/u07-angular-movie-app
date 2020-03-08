import { Component, OnInit, Input } from '@angular/core';
import { API_CONFIG } from '../../api-config';
import { MovieApiService } from '../movie-api.service';
import { Actor } from '../models/Actor.model';

@Component({
  selector: 'app-cast-list',
  templateUrl: './cast-list.component.html',
  styleUrls: ['./cast-list.component.scss']
})
export class CastListComponent implements OnInit {
  credits: object;
  cast: any[];
  imageUri = API_CONFIG['image-url'];
  @Input() id: number;

  constructor(private movieApiService: MovieApiService) {}

  ngOnInit(): void {
    this.getCredits();
  }

  getCredits(): void {
    this.movieApiService.getMovieCredits(this.id).subscribe(
      credits => {
        this.credits = credits;
        this.cast = credits.cast.sort((a, b) => a.order - b.order);
      },
      error => {
        console.error(error);
      }
    );
  }

  getActorProfileUri(actor: Actor): string {
    if (actor.profile_path) {
      return this.imageUri + actor.profile_path;
    }
    let gender: string;

    switch (actor.gender) {
      case 0:
        gender = 'neutral_placeholder.png';
        break;
      case 1:
        gender = 'female_placeholder.jpg';
        break;
      case 2:
        gender = 'male_placeholder.jpg';
        break;
      default:
        gender = 'neutral_placeholder.png';
    }

    return `../../assets/${gender}`;
  }
}
