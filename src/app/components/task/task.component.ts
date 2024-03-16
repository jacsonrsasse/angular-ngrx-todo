import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { Task } from '../../ngrx/states/task.state';
import { ButtonComponent } from '../button/button.component';
import { ModalService } from '../../services/modal.service';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ButtonComponent, OverlayModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('200ms 1s ease-in', style({ opacity: '1' })),
      ]),
      transition(':leave', [animate(200, style({ opacity: '0' }))]),
    ]),
  ],
})
export class TaskComponent {
  @Input() task!: Task;

  protected hovered = false;

  constructor(
    private readonly modalService: ModalService,
    private appService: AppService
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.hovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hovered = false;
  }

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
