import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() =>  {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

	describe('#login/2', () => {
		it('performs a POST /login to the API', () => {
      const service: ApiService = TestBed.get(ApiService);
      spyOn(service, 'companySlug').and.returnValue('acme');

			service.login('user@example.com', 'pa$$w0rd').subscribe();

      const req = httpTestingController.expectOne('http://api.test:3000/acme/login');
      expect(req.request.method).toEqual('POST');
		});
	});

	describe('#register/3', () => {
		it('performs a POST /registrations to the API', () => {
      const service: ApiService = TestBed.get(ApiService);
      spyOn(service, 'companySlug').and.returnValue('acme');

			service.register('user@example.com', 'pa$$w0rd', 'pa$$word').subscribe();

      const req = httpTestingController.expectOne('http://api.test:3000/acme/registrations');
      expect(req.request.method).toEqual('POST');
		});
	});
});
