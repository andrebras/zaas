import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
		private router: Router,
		private apiService: ApiService
	) {}

  register(email: string, password: string, passwordConfirmation: string) {
    this.apiService.register(email, password, passwordConfirmation)
			.pipe(
				tap(response => {
					this.router.navigate(['login']);
				}),
			)
			.subscribe()
  }
}
