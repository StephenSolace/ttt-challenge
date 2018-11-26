import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public Board: number[][] = null;
  public Winner: number = null;
  public BoardSize = 3;


  constructor() { }

  hasWinner(x: number, y: number, player: number): boolean {
    var column = 0;
    var row = 0;
    var diagnol = 0;
    var antiDiagnol = 0;

    for (var i = 0; i < this.BoardSize; i++) {
      if (this.Board[i][y] === player) row++;
      if (this.Board[x][i] === player) column++;
      if (this.Board[i][i] === player) diagnol++;
      if (this.Board[i][this.BoardSize - (i + 1)] === player) antiDiagnol++;
    }

    if (column === this.BoardSize ||
      row === this.BoardSize ||
      diagnol === this.BoardSize ||
      antiDiagnol === this.BoardSize) {
      this.Winner = player;
      return true;
    }

    return false;
  }

  PlaceMove(x: number, y: number, player: number): void {
    this.Board[x][y] = player;

    if (!this.hasWinner(x, y, player)) {
      this.isStalemate();
    }
  }

  isStalemate(): boolean {
    for (var i = 0; i < this.BoardSize; i++) {
      if (!this.Board[i].includes(null)) {
        return true;
      }
    }
    return false;
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

  ngOnInit() {
    this.initializeBoard()
  }

}
