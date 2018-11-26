import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Board Mechanics", function () {
    it('should initialize board', () => {
      component.initializeBoard()

      expect(component.Board).toEqual([[null, null, null],
      [null, null, null],
      [null, null, null]]);
    });

    it('should allow a move to be placed', () => {
      component.initializeBoard()
      component.PlaceMove(1, 1, 0);

      expect(component.Board[1][1]).toEqual(0);
    });
  });

  describe("Determine Winner", function () {
    it('should recognize no winner', () => {
      component.Board = [[0, 0, 0],
                        [null, null, null],
                        [null, null, null]]

      component.hasWinner(1, 2, null);

      expect(component.Winner).toEqual(null);
    });

    it('should recognize a horizontal victory', () => {
      component.Board = [[0, 0, 0],
      [null, null, null],
      [null, null, null]]

      component.hasWinner(0, 2, 0);

      expect(component.Winner).toEqual(0);
    });

    it('should recognize a vertical victory', () => {
      component.Board = [[1, null, null],
      [1, null, null],
      [1, null, null]]

      component.hasWinner(1, 0, 1);

      expect(component.Winner).toEqual(1);
    });

    it('should recognize an antidiagnol victory', () => {
      component.Board = [[1, null, null],
      [null, 1, null],
      [null, null, 1]]

      component.hasWinner(0, 0, 1);

      expect(component.Winner).toEqual(1);
    });

    it('should recognize an antidiagnol victory', () => {
      component.Board = [[null, null, 0],
      [null, 0, null],
      [0, null, null]]

      component.hasWinner(2, 0, 0);

      expect(component.Winner).toEqual(0);
    });
  });

  describe("Stalemate", function () {
    it('should recognize when the board still has plays', () => {
      component.Board = [[null, null, 0],
                        [null, 1, null],
                        [0, null, null]]

      expect(component.isStalemate()).toEqual(false);
    });

    it('should recognize when the board is full', () => {
      component.Board = [[1, 0, 1],
                         [1, 1, 0],
                         [0, 1, 0]]

      expect(component.isStalemate()).toEqual(true);
    });
  });
});
