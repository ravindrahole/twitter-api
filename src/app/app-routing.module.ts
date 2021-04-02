import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TwitterSearchComponent } from './twitter-search/twitter-search.component';

const routes: Routes = [
  { path: 'app', component: TwitterSearchComponent },
  { path: '',   redirectTo: '/app', pathMatch: 'full' }, 
  { path: '**', component: TwitterSearchComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
