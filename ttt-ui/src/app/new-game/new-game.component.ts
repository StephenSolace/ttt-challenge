import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { GameService } from '../game.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss']
})
export class NewGameComponent implements OnInit {
  constructor(private location: Location, private gameService: GameService) { }

  GoBack() : void {
    this.location.back();
  }

  ngOnInit() {
  }

}
