import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs"
import { Game } from "./models/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game = new Game();
  idLength = 9999999999;
  url = "http://www.localhost:8080";

  constructor(private http : HttpClient) { }

  UpdateGame( board: number[][]) : Game
  {
    var updatedBoard = [].concat.apply([], board);

    this.game.attributes.board = updatedBoard;
    return this.game;
  }

  LoadBoard (id: string) : Observable<HttpResponse<Game>>
  {
    return this.http.get<HttpResponse<Game>>(`${this.url}/api/games/${id}`);
  }

  SaveBoard (board: number[][], id: string = null): Observable<HttpResponse<string>>
  {
    if( id === null )
    {
      this.game.id = this.GenerateId(this.idLength);
    }
    return this.http.post<HttpResponse<string>>(`${this.url}/api/games/${this.game.id}`, this.UpdateGame(board));    
  }

  GenerateId(size: number) : string
  {
      return Math.floor(Math.random() * Math.floor(size)).toString();
  }

}
