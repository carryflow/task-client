import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public url:string;

  constructor(private _http: HttpClient, ) {
    this.url = GLOBAL.url;
  }

  //test function to save task in the database
  getTasks():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'tasks', {headers:headers});
  }

}
