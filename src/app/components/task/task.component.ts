import { Component, Input } from '@angular/core';
import { Task } from '../../ngrx/states/task.state';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task!: Task;

  onClickEdit() {}

  onClickDelete() {}
}
