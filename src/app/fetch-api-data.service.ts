/**
 * This file contains all the functions for API calls.
 *
 * @module FetchApiDataService
 */
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The root URL for the hosted API
 * Declaring the api url that will provide data for the client app
 */
const apiUrl = 'https://fathomless-plains-90381.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  /**
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   */
  constructor(private http: HttpClient) {}

  /**
   * Making the api call for the user registration endpoint to register a new user.
   * @param userDetails {Username: <string>, Password: <string>
   * Email: <string>, BirthDate: <string (optional)>}
   * @returns data for new user in JSON format
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: []
   * }
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/registration', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to login an existing user
   * @param userDetails {Username: <string>, Password: <string>}
   * @returns  data for logged in user and JWT in JSON format
   * { user: {
   *   _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>,
   *   FavoriteMovies: [<string>]
   *   },
   *   token: <string>
   * }
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to get data for all movies after log-In.
   * Pulls token from localStorage for auth.
   * @returns object containing array of data for all movies
   * {[
   *   Genre: { Name: <string>, Description: <string> },
   *   Director: { Name: <string>, Bio: <string>, Birth: <string>, Deth: <string> },
   *   _id: <string>,
   *   Title: <string>,
   *   Description: <string>,
   *   Featured: <boolean>,
   *   ImagePath: <string> (example: "SchindlersList.png"),
   * ]}
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to get data for one movie.
   * Pulls token from localStorage for auth.
   * @param title <any>
   * @returns object containing data for one movie.
   * {
   *   Genre: { Name: <string>, Description: <string> },
   *   Director: { Name: <string>, Bio: <string>, Birth: <string>, Deth: <string> },
   *   _id: <string>,
   *   Title: <string>,
   *   Description: <string>,
   *   Featured: <boolean>,
   *   ImagePath: <string> (example: "SchindlersList.png"),
   * }
   */
  public getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/' + title, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to get data for a genre.
   * Pulls token from localStorage for auth.
   * @param Genre <any>
   * @returns object containing data for one Genre
   * { Name: <string>, Description: <string> }
   */
  public getGenre(Genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/genres/' + Genre, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to get data for a director.
   * Pulls token from localStorage for auth.
   * @param Director <any>
   * @returns object containing data for one Director
   * { Name: <string>, Bio: <string>, Birth: <string>, Deth: <string> },
   */
  public getDirector(Director: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/director/' + Director, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to get data for one user.
   * Pulls token from localStorage.
   * @param (void)
   * @returns object containing user's data.
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: [<string>]
   * }
   */
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .get(apiUrl + '/users/' + username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to update a users account info.
   * Pulls username and token from local storage to use for endpoint and authorization.
   * @param userDetails {Username: <string>, Password: <string>,
   * Email: <string>, BirthDate: <string>} (all fields optional)
   * @returns updated user info
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: [<string>]
   * }
   */
  public updateUserData(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .put(apiUrl + '/users/' + username, userDetails, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to add a movie to a users favorite Movies list.
   * Pulls username and token from localStorage.
   * @param movieID <any>
   * @returns updated user data
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: [<string>]
   * }
   */
  public addFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .post(
        apiUrl + '/users/' + username + '/FavoriteMovies/' + movieID,
        null,
        {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to remove a movie from a users favorite Movies list.
   * Pulls username and token from localStorage.
   * @param movieID <any>
   * @returns updated user data
   * { _id: <string>,
   *   Username: <string>,
   *   Password: <string> (hashed),
   *   Email: <string>,
   *   Birthday: <string>
   *   FavoriteMovies: [<string>]
   * }
   */
  public removeFavoriteMovie(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + '/users/' + username + '/FavoriteMovies/' + movieID, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to get an array of movie IDs corresponding to the users favorite Movies.
   * Pulls username and token from localStorage.
   * @returns [<string>]
   */
  public getFavoriteMoviesList(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .get(apiUrl + '/users/' + username + '/FavoriteMovies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * API call to delete a User Account.
   * Pulls username and token from localStorage.
   * @returns <string> message indicated the user was deleted.
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + '/deregistrate/' + username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // error handler
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        'Error Status code',
        error.status,
        'Error body is: ',
        error.error
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
