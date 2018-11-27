import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public Board: number[][] = null;
  public Winner: number = null;
  public BoardSize = 3;
  private currentPlayer: number;
  private icons: { [key: number]: string; } = {};

  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute) { }

  hasWinner(x: number, y: number, player: number): boolean {
    var column = 0;
    var row = 0;
    var diagnol = 0;
    var antiDiagnol = 0;

    for (var i = 0; i < this.BoardSize; i++) {
      if (this.Board[i][i] === player) diagnol++;
      if (this.Board[i][this.BoardSize - (i + 1)] === player) antiDiagnol++;
      if (this.Board[i][y] === player) row++;
      if (this.Board[x][i] === player) column++;
    }

    if (diagnol === this.BoardSize ||
      antiDiagnol === this.BoardSize ||
      column === this.BoardSize ||
      row === this.BoardSize) {
      this.Winner = player;

      return true;
    }

    return false;
  }

  SaveGame(): void {
    this.gameService.SaveBoard(this.Board);
  }

  Rematch(): void {
    this.Board = null;
    this.initializeBoard();
    this.Winner = null;
  }

  PlaceMove(x: number, y: number, player: number): void {
    this.Board[x][y] = player;
    
    if (this.hasWinner(x, y, player)) return;
    else if (this.isStalemate()) return;
    else this.changePlayer();
  }

  isStalemate(): boolean {
    for (var i: number = 0; i < this.BoardSize; i++) {
      for (var j: number = 0; j < this.BoardSize; j++) {
        if (this.Board[i][j] === null) {
          return false;
        }
      }
    }
    this.Winner = -1;
    return true;
  }

  initializeBoard(): void {
    if (this.Board === null) {
      this.Board = [];
      for (var i: number = 0; i < this.BoardSize; i++) {
        this.Board[i] = [];
        for (var j: number = 0; j < this.BoardSize; j++) {
          this.Board[i][j] = null;
        }
      }
    }
  }

  chooseFirstPlayer() {
    this.currentPlayer = Math.round(Math.random());
  }

  changePlayer() {
    this.currentPlayer = (this.currentPlayer ? 0 : 1);
  }


  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id') != null)
    {
      const id = this.route.snapshot.paramMap.get('id');

      this.gameService.LoadBoard(id).subscribe(game => {
        this.gameService.game = game.body; 
        this.Board = game.body.attributes.board.map(function(cell, index, arr){
            if(index % 3 === 0){
              return [cell, arr[index + 1], arr[index + 2]];
            }
          });
      });
    }

    else
    {
      this.initializeBoard();
      this.chooseFirstPlayer();
    }

    this.icons[0] = "reddit-alien";
    this.icons[1] = "fighter-jet";
  }

}
