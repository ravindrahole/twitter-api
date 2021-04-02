import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AppConfig } from './app.config';

@Injectable({
  providedIn: 'root'
})
export class TwitterserviceService {

  api_url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getLocalData(): Observable<any> {
    return this.http.get("assets/usertweets.json").pipe(map(data => data));
  }

  getTimeline(userName: any):any {
    const auth_token = AppConfig.auth_token;
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth_token
    });
    return this.http.get<any[]>(`${AppConfig.time_line_url}?screen_name=${userName}`,
      { headers: reqHeader })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
