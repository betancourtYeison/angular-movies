import { Component } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styles: []
})
export class MovieComponent {
  movie: any;
  loading: boolean = true;

  constructor(
    public _moviesService: MoviesService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
  ) {
    this._activatedRoute.params.subscribe(params => {
      this._moviesService.getMovieById(params["id"]).subscribe(movie => {
        this.movie = movie;
        this.loading = false;
      });
    });
  }

  goBack() {
    this._location.back();
  }
}
