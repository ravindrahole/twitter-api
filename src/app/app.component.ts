import { Component } from '@angular/core';
import { TwitterserviceService } from './twitterservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twitter-assignment';
  userTweets: any[] = [];
  constructor() {
  }
}
