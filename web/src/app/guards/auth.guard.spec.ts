import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
	const router = jasmine.createSpyObj('Router', ['navigate']);
	const authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
	let guard: AuthGuard;

	beforeEach(() => {
    guard = new AuthGuard(authService, router);
	});

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

	describe('#canActivate/0', () => {
		it('returns false if is not authenticated', () => {
			expect(guard.canActivate()).toBeFalsy();
		});

		it('returns true if is authenticated', () => {
      authService.isAuthenticated =
        jasmine.createSpy().and.returnValue(true);

			expect(guard.canActivate()).toBeTruthy();
		});
  });
});
