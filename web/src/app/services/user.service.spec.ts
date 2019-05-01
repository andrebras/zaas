import { UserService } from './user.service';
import { Observable, of } from 'rxjs';

describe('UserService', () => {
	const router = jasmine.createSpyObj('Router', ['navigate']);
	const apiService = jasmine.createSpyObj('ApiService', ['']);
	let service: UserService;

	beforeEach(() => {
    service = new UserService(router, apiService);
	});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

	describe('#register/3', () => {
		it('navigates to the login page', () => {
      apiService.register = jasmine
        .createSpy()
        .and.returnValue(of(Object));

			service.register('user@example.com', 'pa$$w0rd', 'pa$$w0rd');

			expect(apiService.register)
        .toHaveBeenCalledWith('user@example.com', 'pa$$w0rd', 'pa$$w0rd');

			expect(router.navigate).toHaveBeenCalledWith(['login']);
		});
	});
});
