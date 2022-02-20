import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.userData.Username = resp.Username;
      this.userData.Email = resp.Email;
      this.userData.Birthday = formatDate(resp.Birthday, 'yyyy-MM-dd', 'en_US');

      console.log('user Data: ', this.userData);
      return this.userData;
    });
  }

  updateUser(): void {
    console.log('userdata: ', this.userData);
    this.fetchApiData.updateUserData(this.userData).subscribe(
      (response: any) => {
        localStorage.setItem('username', response.Username);
        // Logic for a successful user update goes here! (To be implemented)
        this.snackBar.open(
          response.Username + ' You have successfully updated you Profile!',
          '',
          {
            duration: 2000,
          }
        );
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
