import { Component } from "@angular/core";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: []
})
export class HomeComponent {
  releases: any;
  loadingReleases: boolean = true;
  popular: any;
  loadingPopular: boolean = true;
  popularKids: any;
  loadingPopularKids: boolean = true;

  constructor(private _moviesService: MoviesService) {
    this._moviesService.getMovies().subscribe(data => {
      this.releases = data;
      this.loadingReleases = false;
    });
    this._moviesService.getPopularity().subscribe(data => {
      this.popular = data;
      this.loadingPopular = false;
    });
    this._moviesService.getPopularityKids().subscribe(data => {
      this.popularKids = data;
      this.loadingPopularKids = false;
    });
  }
}
