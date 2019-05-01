import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
		private httpClient: HttpClient
	) {}

  login(email: string, password: string) {
		const request = this.httpClient
      .post<any>(
        `${environment.apiUrl}/${this.companySlug()}/login`,
        { email, password },
        this.headers
      );

    request.pipe(
	    catchError(this.handleError<any>('login', []))
    );

    return request;
  }

  register(email: string, password: string, passwordConfirmation: string) {
    const params = {
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

		const request = this.httpClient
      .post<any>(
        `${environment.apiUrl}/${this.companySlug()}/registrations`,
        params,
        this.headers
      );

    request.pipe(
	    catchError(this.handleError<any>('register', []))
    );

    return request;
  }

	companySlug() {
  	return window.location.hostname.match(/(.*?)\./)[1]
	}

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	private log(message: string) {
		console.log(`ApiService: ${message}`);
	}
}
