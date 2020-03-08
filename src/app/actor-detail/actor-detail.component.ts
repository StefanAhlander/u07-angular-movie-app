import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { API_CONFIG } from '../../api-config';

import { MovieApiService } from '../movie-api.service';
import { Actor } from '../models/Actor.model';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.scss']
})
export class ActorDetailComponent implements OnInit {
  actor: Actor;
  id: number;
  age: number;
  imageUri = API_CONFIG['image-url'];

  constructor(
    private route: ActivatedRoute,
    private movieApiService: MovieApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.getActor();
  }

  getActor(): void {
    this.movieApiService.getActor(this.id).subscribe(actor => {
      this.actor = actor;
      let now;
      if (actor.deathday) {
        now = new Date(actor.deathday).getTime();
      } else {
        now = Date.now();
      }
      const birth = new Date(actor.birthday).getTime();
      const timeDiff: number = now - birth;
      this.age = Math.floor(timeDiff / 31536000000);
    });
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

  goBack(): void {
    this.location.back();
  }
}
