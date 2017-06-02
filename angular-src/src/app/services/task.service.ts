import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import { AuthService } from './auth.service';

@Injectable()
export class TaskService {
  baseUrl = 'http://localhost:8080';

  constructor(private http:Http, private authService: AuthService) {
    console.log('Task Service Initialized');
  }

  getTasks(){
    let headers = this.getHeaders();

    var user = JSON.parse(localStorage.getItem('user'));
    var userId = user.id;

    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl +'/api/tasks/'+userId, {
      headers: headers
    })
      .map(res => res.json());
  }

  addTask(newTask){
    var headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', "application/json");
    return this.http.post(this.baseUrl + '/api/task', JSON.stringify(newTask), {headers: headers})
      .map(res => res.json());

  }

  deleteTask(id){
    var headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
    headers.append('Content-Type', "application/json");
    return this.http.delete(this.baseUrl + '/api/task/' + id, {headers: headers})
      .map(res => res.json());
  }

  updateStatus(task){
    var headers = new Headers();
    this.authService.loadToken();
    headers.append('Authorization', this.authService.authToken);
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
