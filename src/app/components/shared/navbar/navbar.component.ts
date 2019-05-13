import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent {
  constructor(private _router: Router) {}

  searchMovie(term: string) {
    if (term.length === 0) {
      return;
    }
    this._router.navigate(["/search", term]);
  }
}
