import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs"

class Title {
  name;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http : HttpClient){}
  title = 'ttt-ui';

  ngOnInit(){
    this.getTitle().subscribe(
      x => this.title = x.name,
      x => console.log(x),
      () => console.log("Finished call")
    );
  }

  getTitle(): Observable<Title> {
    const url = "http:\\www.localhost:8080";
    return this.http.get<Title>(url);
  }
}
