import { Component, Input } from '@angular/core';
import { Task } from '../../ngrx/states/task.state';
import { ButtonComponent } from '../button/button.component';
import { ModalService } from '../../services/modal.service';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task!: Task;

  constructor(
    private readonly modalService: ModalService,
    private appService: AppService
  ) {}

  markTask() {
    this.appService.markTask(this.task, !this.task.completed);
  }

  onClickEdit() {
    this.modalService.openModal(this.task);
  }

  onClickDelete() {
    this.appService.deleteTask(this.task);
  }
}
