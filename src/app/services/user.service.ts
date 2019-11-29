import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: string;

  constructor(private _http: HttpClient, ) {
    this.url = GLOBAL.url;
  }

  //function to request the back-end api and get the list of paginated users
  getUsers(page = null): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'users/'+page, {headers: headers});
  }

  //function to request the back-end api and get a user with their assigned tasks from the database
  getUser(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'user/'+id, {headers:headers});
  }

  //function to request the back-end api and assign tasks to users.
  saveTaskInUser(user: User): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+'user', params ,{headers:headers});
  }
}
