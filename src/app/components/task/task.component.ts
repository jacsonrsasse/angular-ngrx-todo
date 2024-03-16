import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { Task } from '../../ngrx/states/task.state';
import { ButtonComponent } from '../button/button.component';
import { ModalService } from '../../services/modal.service';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ButtonComponent, OverlayModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  animations: [
    trigger('hover', [
      state(
        'inactive',
        style({
          opacity: 0,
          transform: 'scale(0.8)',
        })
      ),
      state(
        'active',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out')),
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
