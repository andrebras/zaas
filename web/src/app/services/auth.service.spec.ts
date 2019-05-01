import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

describe('AuthService', () => {
	const jwtHelperService = jasmine.createSpyObj('JwtHelperService', ['isTokenExpired']);
	const router = jasmine.createSpyObj('Router', ['navigate']);
	const apiService = jasmine.createSpyObj('ApiService', ['']);
	let service: AuthService;

	beforeEach(() => {
		localStorage.removeItem('token');
    service = new AuthService(jwtHelperService, router, apiService);
	});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	describe('#isAuthenticated/0', () => {
		it('returns false if token is not present', () => {
			expect(service.isAuthenticated()).toBeFalsy();
		});

		it('returns false if token is expired', () => {
			localStorage.setItem('token', 'some-token');
			jwtHelperService.isTokenExpired = jasmine.createSpy().and.returnValue(true);

			expect(service.isAuthenticated()).toBeFalsy();
		});

		it('returns true if token is valid', () => {
			localStorage.setItem('token', 'some-token');
			jwtHelperService.isTokenExpired = jasmine.createSpy().and.returnValue(false);

			expect(service.isAuthenticated()).toBeTruthy();
		});
	});

	describe('#logout/0', () => {
		it('removes token from localStorage and navigates to the login page', () => {
			localStorage.setItem('token', 'some-token');

			service.logout();

			expect(localStorage.getItem('token')).toBe(null);
			expect(router.navigate).toHaveBeenCalledWith(['login']);
		});
	});

	describe('#login/2', () => {
		it('stores the jwt token into localStorage and navigates to dashboard', () => {
      apiService.login = jasmine
        .createSpy()
        .and.returnValue(of(Object));

      spyOn(localStorage, 'setItem');

			service.login('user@example.com', 'pa$$w0rd');

			expect(apiService.login)
        .toHaveBeenCalledWith('user@example.com', 'pa$$w0rd');

			expect(localStorage.setItem).toHaveBeenCalled();
			expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
		});
	});
});
