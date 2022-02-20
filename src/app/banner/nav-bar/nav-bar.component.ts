import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  onProfilePage: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  toProfile(): void {
    this.router.navigate(['users']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  toMovies(): void {
    this.router.navigate(['movies']);
  }
}
