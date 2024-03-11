import { Component, Input } from '@angular/core';
import { Task } from '../ngrx/states/task-list.state';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../components/task/task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input() tasks?: Task[];

  trackByTaskId(index: number, task: Task) {
    return index + task.id;
  }
}
