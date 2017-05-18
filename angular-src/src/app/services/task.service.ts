import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";

@Injectable()
export class TaskService {
  baseUrl = 'https://mytasklist-71084.herokuapp.com';

  constructor(private http:Http) {
    console.log('Task Service Initialized');
  }

  getTasks(){
    let headers = this.getHeaders();
    return this.http.get(this.baseUrl +'/api/tasks', {
      headers: headers
    })
      .map(res => res.json());
  }

  addTask(newTask){
    var headers = new Headers();
    headers.append('Content-Type', "application/json");
    return this.http.post(this.baseUrl + '/api/task', JSON.stringify(newTask), {headers: headers})
      .map(res => res.json());

  }

  deleteTask(id){
    return this.http.delete(this.baseUrl + '/api/task/' + id)
      .map(res => res.json());
  }

  updateStatus(task){
    var headers = new Headers();
    headers.append('Content-Type', "application/json");
    return this.http.put(this.baseUrl + '/api/task/'+ task._id, JSON.stringify(task), {headers: headers})
      .map(res => res.json());
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    //\\headers.append("Authorization", "Bearer " + BackendService.token);
    return headers;
  }
}
