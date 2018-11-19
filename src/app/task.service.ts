import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';

import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  dataSource = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    this.getAllTasks();
  }

  handshake() {
    return this.http.get('/api/handshake');
  }

  getAllTasks() {
    this.http.get('/api/getAllTask').subscribe((res) => {
      this.dataSource.next(res['data']);
    });
  }

  createNewTask(task: Task) {
    this.http.put('/api/createNewTask', task).subscribe((res) => {
      this.dataSource.next(this.dataSource.getValue().concat(res['data']));
    });
  }

  deleteTask(task: Task) {
    this.http.delete('/api/deleteTask/' + task._id).subscribe((res) => {
      this.getAllTasks();
    });
  }

  strikeTask(task: Task) {
    this.http.post('/api/strikeTask', task).subscribe((res) => {
      this.getAllTasks();
    });
  }


}
