import { Component, OnInit } from '@angular/core';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  deleteUser() {
    console.log('deleteUser');
    this.router.navigate(['welcome']);

    this.fetchApiData.deleteUser().subscribe;
    this.snackBar.open('Your Account has been successfully deleted!', 'OK', {
      duration: 5000,
    });
    localStorage.clear();

    // in case of error, the error will be catched below
  }
}
