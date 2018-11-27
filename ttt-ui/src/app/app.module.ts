import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';
import { BoardComponent } from './board/board.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NewGameComponent } from './new-game/new-game.component';
import { LoadGameComponent } from './load-game/load-game.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'new-game', component: NewGameComponent },
  { path: 'load-game', component: LoadGameComponent },
  { path: 'board', component: BoardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    HomeComponent,
    NewGameComponent,
    LoadGameComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
