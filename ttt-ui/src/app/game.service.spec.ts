import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from "rxjs";
import { GameService } from './game.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { HttpClient } from 'selenium-webdriver/http';

describe('GameService', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [GameService] }));

  it('should be created', () => {
    const service: GameService = TestBed.get(GameService);
    expect(service).toBeTruthy();
  });

  describe("Initialize Game", function () {
    it('should set the default game values', () => {
      const service: GameService = TestBed.get(GameService);
      var id = service.GenerateId(9999999999);

      expect(id).toBeGreaterThan(-1);
      expect(id).toBeLessThan(9999999999);
    });
  });

  describe("Id Generation", function () {
    it('should generate a random id', () => {
      const service: GameService = TestBed.get(GameService);
      var id = service.GenerateId(9999999999);

      expect(id).toBeGreaterThan(-1);
      expect(id).toBeLessThan(9999999999);
    });
  });

  describe("Board Features", function () {

    it('should update the board', () => {
      const service: GameService = TestBed.get(GameService);
      var updatedGame = service.UpdateGame([[0, 0, null],
                                              [0, 0, null],
                                              [0, 0, null]])
      expect(updatedGame.attributes.board).toEqual([0, 0, null, 0, 0, null, 0, 0, null]);
    });

    it('should load the board', () => {
      const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
      const service = new GameService(httpSpy);

      httpSpy.get.and.returnValue(new Observable((ob) => {
        ob.next(new HttpResponse({
          body: {
                  type: "Game",
                  id: "141234567891011",
                  attributes: {
                    players:["Alice", "Bhopal"],
                    board: [0, 0, null, 0, 0, null, 0, 0, null]
                  }
            },
          status: 200
        }));
        ob.unsubscribe();
      }));
      var id = service.GenerateId(9999999999);

      service.LoadBoard(id).subscribe(resp => {
        expect(resp.body.attributes.board).toEqual([0, 0, null, 0, 0, null, 0, 0, null]);
      });
    });

    it('should return an error if nothing found', () => {
      const httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
      const service = new GameService(httpSpy);
      httpSpy.get.and.returnValue(new Observable((ob) => { 
        ob.error(new HttpResponse({
          status: 404
        }));
        ob.unsubscribe();
      }));
      var id = service.GenerateId(9999999999);

      service.LoadBoard(id).subscribe(board => { },
        error => expect(error.status).toEqual(404)
      );
    });

    it('should be able to save a game', () => {
      const httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
      const service = new GameService(httpSpy);
      
      httpSpy.post.and.returnValue(new Observable((ob) => { 
        ob.next(new HttpResponse({
          status: 200,
          body: "Game saved successfully!"
        }));
        ob.unsubscribe();
      }));

      service.SaveBoard([[0, 0, null], [0, 0, null],[0, 0, null]]).subscribe(resp => expect(resp.status).toEqual(200)
      );
    });

    it('should accurately post data back',
    // async(inject([HttpTestingController, GameService],
    // (httpBackend: HttpTestingController, service: GameService) => {
      () => {
        const httpBackend: HttpTestingController = TestBed.get(HttpTestingController);
        // const httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
        // const service = new GameService(httpSpy);
        const service = TestBed.get(GameService)
        // httpSpy.post.and.returnValue(new Observable((ob) => { 
        //   ob.next(new HttpResponse({
        //     status: 200,
        //     body: "Game saved successfully!"
        //   }));
        //   ob.unsubscribe();
        // }));

        var expectedPost = {
          type: "Game",
          id: "141234567891011",
          attributes: {
            players:["Alice", "Bhopal"],
            board: [0, 0, null, 0, 0, null, 0, 0, null]
          }
        };

        // expectedPost.id = service.GenerateId(9999999999);
        // console.log(expectedPost.id);
        service.SaveBoard([[0, 0, null], [0, 0, null],[0, 0, null]]).subscribe( resp => console.log(resp.body)); //expect(resp.status).toEqual(200));
        httpBackend.expectOne({url: `http://www.localhost:8080/api/games/${service.game.id}`, method: "POST" })
        .flush(null, { status: 200, statusText: 'Ok'});
          // .respond({"status": 200, "body": "Game saved successfully!"})
          // .flush();
    });
      // const httpSpy = jasmine.createSpyObj('HttpClient', ['post']); //HTtpClient
      // const http = TestBed.get(HttpClient);
      // const service = new GameService(http);
      // const httpTest =  TestBed.get(HttpTestingController);
      

      // httpSpy.post.and.returnValue(new Observable((ob) => { 
      //   ob.next(new HttpResponse({
      //     status: 200,
      //     body: "Game saved successfully!"
      //   }));
      //   ob.unsubscribe();
      // }));


  });
});
