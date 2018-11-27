import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-load-game',
  templateUrl: './load-game.component.html',
  styleUrls: ['./load-game.component.scss']
})
export class LoadGameComponent implements OnInit {

  constructor(private location: Location) { }

  GoBack() : void {
    this.location.back();
  }

  ngOnInit() {
  }

}
