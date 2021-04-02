import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

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
    const auth_token = 'AAAAAAAAAAAAAAAAAAAAAJcVOAEAAAAAQ1gZgYqpMTY1E5P8%2Bp%2FISUA5FqM%3DSA1cSxhpAarsVcqkZf97BRWoNULh8s0WYp2KGunUuvUh9jgOs0';
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth_token
    });
    return this.http.get<any[]>(`/api/1.1/statuses/user_timeline.json?screen_name=${userName}`,
      { headers: reqHeader })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  // getUsers(userName: any) {
  //   const auth_token = 'AAAAAAAAAAAAAAAAAAAAAJcVOAEAAAAAQ1gZgYqpMTY1E5P8%2Bp%2FISUA5FqM%3DSA1cSxhpAarsVcqkZf97BRWoNULh8s0WYp2KGunUuvUh9jgOs0';
  //   var reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + auth_token
  //   });
  //   return this.http.get<any[]>(`/api/1.1/users/search.json?q=soccer`,
  //     { headers: reqHeader })
  //     .pipe(
  //       map(data => data),
  //       catchError(this.handleError)
  //     );
  // }



  getTimeline1() {
    // return this.http
    //   .get<any[]>(this.api_url+'/home_timeline')
    //   .pipe(map(data => data));

    // return this.http.get<any[]>(this.api_url + '/home_timeline')
    //   .pipe(
    //     map(data => data),
    //     catchError(this.handleError)
    //   );
    // const auth_token = 'AAAAAAAAAAAAAAAAAAAAAJcVOAEAAAAAXj8RIA%2FbGZh8P5i69L8X8Mc7SCU%3DzCYbFFiJVfRehFE2mIIM23URvZKQ5SRpwlNKuPsDXPBm8JqsTJ';


    // const headers = new Headers({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${auth_token}`
    // })

    // var reqHeader = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + auth_token
    // });
    // return this.http.get<any[]>('/auth/1.1/statuses/user_timeline.json?screen_name=hole_ravindra&count=2',

    // return this.http.get<any[]>('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=twitterapi&count=2',
    //   { headers: reqHeader })
    //   .pipe(
    //     map(data => data),
    //     catchError(this.handleError)
    //   );

    // return this.http.get<any[]>('/api/1.1/statuses/user_timeline.json?screen_name=VrushabhSarode',
    //   { headers: reqHeader })
    //   .pipe(
    //     map(data => data),
    //     catchError(this.handleError)
    //   );



  }

  // getMentions() {
  //   return this.http
  //     .get<any[]>(this.api_url+'/mentions_timeline')
  //     .pipe(map(data => data));

  // }

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
