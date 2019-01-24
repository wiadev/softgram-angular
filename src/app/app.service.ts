import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // If false, the application will run on 4200 and call json-server directly
  // If true, the application will utilize node API
  DEBUG: Boolean = true;
  api: string;

  constructor(private http: HttpClient) {
    if (this.DEBUG) {
      this.api = 'http://localhost:3000';
    } else {
      this.api = 'http://localhost:8000/api';
    }
  }

  // Returns all members
  getMembers() {
    return this.http.get(`${this.api}/members`).pipe(catchError(this.handleError));
  }

  getMemberById(id) {
    return this.http.get(`${this.api}/members/${id}`).pipe(catchError(this.handleError));
  }

  addMember(memberForm) {
    return this.http.post(`${this.api}/members`, memberForm).pipe(catchError(this.handleError));
  }

  updateMemeber(id: string, memberForm) {
    return this.http.put(`${this.api}/members/${id}`, memberForm).pipe(catchError(this.handleError));
  }

  removeMember(id: string) {
    return this.http.delete(`${this.api}/members/${id}`).pipe(catchError(this.handleError));
  }

  getTeams() {
    return this.http.get(`${this.api}/teams`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return [];
  }
}
