import { Component } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styles: []
})
export class SearchComponent {
  term: string = "";
  loading: boolean = false;

  constructor(
    public _moviesService: MoviesService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe(params => {
      if (params["term"]) {
        this.term = params["term"];
        this.search();
      } else if (this._moviesService.moviesSearched.length > 0) {
        this.term = this._moviesService.lastTermSearched;
      }
    });
  }

  search() {
    if (this.term.length === 0) {
      return;
    }
    this.loading = true;
    this._moviesService.searchMovie(this.term).subscribe(
      () => {
        this.loading = false;
      },
      () => (this.loading = false)
    );
  }
}
