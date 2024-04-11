import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { AxiosService } from './axios.service';
import { baseUrl } from './axios.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let httpMock: HttpTestingController;
  let axiosService: AxiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService, AxiosService],
    });

    usersService = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
    axiosService = TestBed.inject(AxiosService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(usersService).toBeTruthy();
  });

  it('should call getUsers and return expected data', () => {
    const expectedData = [{ id: 1, name: 'John Doe' }];

    usersService.getUsers().subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne(`${baseUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });

  it('should call getAllUsers and return expected data', () => {
    const expectedData = [{ id: 1, name: 'John Doe' }];

    usersService.getAllUsers().subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne(`${baseUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });

  it('should call getUserById and return expected data', () => {
    const userId = 1;
    const expectedData = { id: userId, name: 'John Doe' };

    usersService.getUserById(userId).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne(`${baseUrl}/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });

  it('should call getProfile and return expected data', () => {
    const expectedData = { id: 1, name: 'John Doe' };

    usersService.getProfile().subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne(`${baseUrl}/users/profile/me`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });

  it('should call createUser and return expected data', () => {
    const newUser = { name: 'Jane Doe' };
    const expectedData = { id: 1, name: 'Jane Doe' };

    usersService.createUser(newUser).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne(`${baseUrl}/users/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(expectedData);
  });

  it('should call updateUser and return expected data', () => {
    const userId = 1;
    const updatedUser = { name: 'John Doe Updated' };
    const expectedData = { id: userId, name: 'John Doe Updated' };

    usersService.updateUser(updatedUser, userId).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne(`${baseUrl}/users/update/${userId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedUser);
    req.flush(expectedData);
  });

  it('should call deleteUser and return expected data', () => {
    const userId = 1;
    const expectedData = { message: 'User deleted successfully' };

    usersService.deleteUser(userId).subscribe((data) => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne(`${baseUrl}/users/delete/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(expectedData);
  });
});
