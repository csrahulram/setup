import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'setup';
  expressMessage = 'Loading...';
  tasks = [];
  constructor(private taskService: TaskService) {

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
      this.tasks = [{'task' : err.message}];
    });
  }

}
