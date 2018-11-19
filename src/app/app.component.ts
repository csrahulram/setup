import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'setup';
  expressMessage = 'Loading...';
  task: Task = new Task();
  tasks = [];
  constructor(private taskService: TaskService) {
    this.task.title = '';
  }

  ngOnInit() {
    this.taskService.handshake().subscribe((res) => {
      this.expressMessage = res['data'];
    }, (err) => {
      this.expressMessage = err.message;
    });
    this.taskService.getAllTasks().subscribe((res) => {
      this.tasks = res['data'];
    }, (err) => {
      this.tasks = [{ 'task': err.message }];
    });
  }

  update(event) {
    if (event.code === 'Enter') {
      this.task.status = false;
      this.taskService.createNewTask(this.task).subscribe((res) => {
        this.tasks.push(res['data']);
        this.task.title = '';
      }, (err) => {
        this.tasks = [{ 'task': err.message }];
      });
    }
  }

}
