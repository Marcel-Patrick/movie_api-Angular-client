import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openDescriptionDialog(movie: any): void {
    this.dialog.open(DescriptionComponent, {
      width: '280px',
      data: { movie },
    });
  }

  openGenreDialog(Genre: any): void {
    this.dialog.open(GenreComponent, {
      width: '280px',
      data: { Genre },
    });
  }

  openDirectorDialog(Director: any): void {
    this.dialog.open(DirectorComponent, {
      width: '280px',
      data: { Director },
    });
  }
}
