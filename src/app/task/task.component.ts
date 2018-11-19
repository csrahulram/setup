import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})


export class TaskComponent implements OnInit {

  @Input() task: Task;
  @HostListener('click') onclick() {
    this.deleteTask();
  }

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  deleteTask() {
    this.taskService.deleteTask(this.task).subscribe((res) => {
      console.log(res);
    });
  }

}
