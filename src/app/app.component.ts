import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { Task } from './ngrx/states/task.state';
import { ModalService } from './services/modal.service';
import { Observable } from 'rxjs';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskListComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly appService: AppService,
    private readonly modalService: ModalService
  ) {}

  ngOnInit() {
    this.appService.loadTasks();
  }

  get tasks$(): Observable<Task[]> {
    return this.appService.tasks$;
  }

  get isLoading$(): Observable<boolean> {
    return this.appService.isLoading$;
  }

  onClickAdd() {
    this.modalService.openModal();
  }
}
