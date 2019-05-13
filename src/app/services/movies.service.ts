import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  private apiKey: string = "7ca802c71a7661f4403fcfd0a3a1a059";
  private urlMoviedb: string = "https://api.themoviedb.org/3";
  public moviesSearched: any = [];
  public lastTermSearched: string;

  constructor(private _httpClient: HttpClient) {}

  getMovieById(id: string) {
    let url = `${this.urlMoviedb}/movie/${id}?api_key=${
      this.apiKey
    }&language=es`;
    return this._httpClient.jsonp(url, "callback");
  }

  getMovies() {
    let fromDate = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    let fromDateStr = `${fromDate.getFullYear()}-${fromDate.getMonth() +
      1}-${fromDate.getDate()}`;
    let endDateStr = `${endDate.getFullYear()}-${endDate.getMonth() +
      1}-${endDate.getDate()}`;
    let url = `${
      this.urlMoviedb
    }/discover/movie?primary_release_date.gte=${fromDateStr}&primary_release_date.lte=${endDateStr}&api_key=${
      this.apiKey
    }&language=es`;
    return this._httpClient
      .jsonp(url, "callback")
      .pipe(map(data => data["results"]));
  }

  getPopularity() {
    let url = `${
      this.urlMoviedb
    }/discover/movie?sort_by=popularity.desc&api_key=${
      this.apiKey
    }&language=es`;
    return this._httpClient
      .jsonp(url, "callback")
      .pipe(map(data => data["results"]));
  }

  getPopularityKids() {
    let url = `${
      this.urlMoviedb
    }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${
      this.apiKey
    }&language=es`;
    return this._httpClient
      .jsonp(url, "callback")
      .pipe(map(data => data["results"]));
  }

  searchMovie(term: string) {
    let url = `${
      this.urlMoviedb
    }/search/movie?query=${term}&sort_by=popularity.desc&api_key=${
      this.apiKey
    }&language=es`;
    return this._httpClient.jsonp(url, "callback").pipe(
      map(data => {
        this.moviesSearched = data["results"];
        this.lastTermSearched = term;
        return data["results"];
      })
    );
  }
}
