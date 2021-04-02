import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TwitterSearchComponent } from './twitter-search.component';
import { TwitterserviceService } from '../twitterservice.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import {of, Observable, throwError} from 'rxjs';

describe('AppComponent', () => {
    let mockService: TwitterserviceService;
    let fixture:ComponentFixture<TwitterSearchComponent>;
    let component:TwitterSearchComponent;
    beforeEach( () => {
         TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                FormsModule, HttpClientTestingModule
            ],
            declarations: [
                TwitterSearchComponent,
                HeaderComponent
            ],
            providers: [
                { provide: TwitterserviceService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    beforeEach( () => {
        fixture = TestBed.createComponent(TwitterSearchComponent);
        component = fixture.componentInstance;
        mockService = TestBed.inject(TwitterserviceService);
        fixture.detectChanges();
    })

    it('should create the app', () => {
        const fixture = TestBed.createComponent(TwitterSearchComponent);
        const app = fixture.componentInstance;
        const fixture1 = TestBed.createComponent(HeaderComponent);
        const app1 = fixture1.componentInstance;
        expect(app).toBeTruthy();
    });

    it('if search box empty, show inline error', () => {
        const fixture = TestBed.createComponent(TwitterSearchComponent);
        const app = fixture.componentInstance;
        app.userName = '';
        app.searchTweets();
        expect(app.inlineError).toBeTruthy();
    });

    it('should display api error, if api is down or authorization error', ()=>{
       
        component.userName = 'hole_ravindra';

        const response = [
            {
                "created_at": "Sun Mar 07 18:05:53 +0000 2021",
                "id": 1368623956744228865,
                "id_str": "1368623956744228865",
                "text": "@vikasp38 \ud83d\ude02\ud83d\ude02\ud83d\ude02\ud83d\ude02\ud83d\udc4c",
                "truncated": false,
                }
            ];
       
         spyOn(mockService, 'getTimeline').and.returnValue(throwError(new Error("Internal server error")));
       
        component.searchTweets();
        expect(component.apiError).toBeTruthy();

    });

    it('should display user tweets, when user click on search button', ()=>{
       
        component.userName = 'hole_ravindra';

        const response = [
            {
                "created_at": "Sun Mar 07 18:05:53 +0000 2021",
                "id": 1368623956744228865,
                "id_str": "1368623956744228865",
                "text": "@vikasp38 \ud83d\ude02\ud83d\ude02\ud83d\ude02\ud83d\ude02\ud83d\udc4c",
                "truncated": false
                }
            ];
       
         spyOn(mockService, 'getTimeline').and.returnValue(of(response));
       
        component.searchTweets();
        expect(component.showSpinner).toBeFalsy();
        expect(component.userTweets.length).toBe(1);
    })
   
});
