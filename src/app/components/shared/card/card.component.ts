import { Component, Input } from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styles: []
})
export class CardComponent {
  @Input() title;
  @Input() movies;

  constructor() {}
}
