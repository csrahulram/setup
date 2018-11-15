import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  handshake() {
    return this.http.get('/api/handshake');
  }

  getAllTasks() {
    return this.http.get('/api/get_all_task');
  }
}
