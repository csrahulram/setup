import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';



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
    return this.http.get('/api/getAllTask');
  }

  createNewTask(task: Task) {
    return this.http.put('/api/createNewTask', task);
  }

  deleteTask(task: Task) {
    return this.http.delete('/api/deleteTask/' + task._id);
  }
}
