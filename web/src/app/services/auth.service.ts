import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
		private jwtHelperService: JwtHelperService,
		private router: Router,
		private apiService: ApiService
	) {}

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token && !this.jwtHelperService.isTokenExpired(token);
  }

  login(email: string, password: string) {
    this.apiService.login(email, password)
			.pipe(
				tap(response => {
					this.setToken(response.token);
					this.router.navigate(['dashboard']);
				}),
			)
			.subscribe()
  }

  logout() {
    this.removeToken();
    this.router.navigate(['login']);
  }

  private setToken(token) {
	  localStorage.setItem('token', token);
  }

  private removeToken() {
    localStorage.removeItem('token');
  }
}
