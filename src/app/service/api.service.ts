import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUri: string = 'http://10.10.18.161:5000/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Create
  createEmployee(data): Observable<any> {
    let url = `${this.baseUri}Guest`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Get all employees
  getEmployees() {
    return this.http.get(`${this.baseUri}Guest`);
  }

  // Get employee
  getEmployee(id): Observable<any> {
    let url = `${this.baseUri}Guest/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Update employee
  updateEmployee(id, data): Observable<any> {
    let url = `${this.baseUri}Guest/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete employee
  deleteEmployee(id): Observable<any> {
    let url = `${this.baseUri}Guest/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
