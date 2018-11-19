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
    this.taskService.handshake().subscribe((data) => {
      this.expressMessage = data['data'];
    });

    this.taskService.dataSource.subscribe((data) => {
      this.tasks = data;
    });
  }

  update(event) {
    if (event.code === 'Enter') {
      this.task.status = false;
      this.taskService.createNewTask(this.task);
      this.task.title = '';
    }
  }

}
