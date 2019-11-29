import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from '../models/state';
import { Task } from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  public url: string;

  constructor(private _http: HttpClient, ) {
    //Get url api back-end
    this.url = GLOBAL.url;
  }

  //function to make a request to the back-end and obtain a list of tasks with their status
  getStates(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'states', { headers: headers });
  }

  //function to request the back-end and update the status of tasks in the database
  updateStates(states: State[]): Observable<any> {
    let params = JSON.stringify(states);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'states', params, { headers: headers });
  }

  //function to make request to the back-end and save task in the database
  saveStateTask(state: State, task:Task): Observable<any> {
    let params = JSON.stringify(task);
    let idState = state._id;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url+'save-task/'+idState, params, {headers:headers});
  
   
  }
}
