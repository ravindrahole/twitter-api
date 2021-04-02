import { Component, ElementRef, ViewChild } from '@angular/core';
import { TwitterserviceService } from '../twitterservice.service';
import * as moment from 'moment';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './twitter-search.component.html',
  styleUrls: ['./twitter-search.component.scss']
})
export class TwitterSearchComponent {
  userTweets: any[] = [];

  userName: any = 'Platform9Sys';
  showSpinner: Boolean = false;
  apiError: Boolean = false;
  inlineError: Boolean = false;

  @ViewChild("inputElement") inputElement: any;

  constructor(private api: TwitterserviceService
  ) {

  }

  ngOnInit() {
    // this.api.getLocalData().subscribe((data: any) => {
    //   console.log(data);
    //   this.userTweets = data;
    // })
    this.searchTweets();
  }

  searchTweets() {
    this.inlineError = false;
    if (this.userName) {
      this.apiError = false;
      this.showSpinner = true
      this.api.getTimeline(this.userName).subscribe(
        (resp: any) => {
          console.log('response', resp);
          this.userTweets = resp;
          this.showSpinner = false
        },
        (error: any) => {
          console.log('error', error);
          this.showSpinner = false
          this.apiError = true;
        })
    } else {
      this.inlineError = true;
    }
  }

  getData(dt: any) {
    let temp: any = moment(dt, 'dd MMM DD HH:mm:ss ZZ YYYY');
    let moment1 = temp.format('DD-MM-YYYY THH:mm:ss')
    return moment1;
  }

}
