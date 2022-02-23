/**
 * Renders a login form for users to enter their Username and Password.
 * @module UserLoginFormComponent
 */
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// This imorts the routing
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * The input userData is empty strings by default.
   * This is updated when the user types into the form fields.
   */
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * This is the function responsible for sending the form inputs to the backend
   * Attempts to log the user in with the input credentials.
   * Uses [[FetchApiDataService.userLogin]].
   * Saves Username and token in localStorage and redirects to `/movies` upon successful login.
   * Gives a snackbar message if login fails.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        // Logic for a successful user login goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!
        localStorage.setItem('username', response.user.Username);
        localStorage.setItem('token', response.token);
        this.snackBar.open(
          'Logged In successfully! Welcome: ' + response.user.Username,
          '',
          {
            duration: 2000,
          }
        );
        this.router.navigate(['movies']);
      },
      // in case of error, the error will be catched below
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
