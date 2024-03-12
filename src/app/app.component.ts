import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { Store } from '@ngrx/store';
import {
  appendTask,
  loadTaskList,
  loadTaskListSuccess,
} from './ngrx/actions/task-list.actions';
import {
  isLoadingSelector,
  taskListSelector,
} from './ngrx/selectors/task-list.selectors';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { Task } from './ngrx/states/task-list.state';
import { ModalService } from './services/modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskListComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  tasks$!: Observable<Task[]>;
  isLoading$!: Observable<boolean>;

  constructor(
    private readonly store: Store,
    private readonly modalService: ModalService
  ) {
    console.log('Aqui');
    this.tasks$ = this.store.select(taskListSelector);
    this.isLoading$ = this.store.select(isLoadingSelector);

    this.modalService.task$.subscribe((task) => {
      this.store.dispatch(appendTask({ entity: task }));
    });

    this.loadTasks();
  }

  private loadTasks() {
    this.store.dispatch(loadTaskList());
  }

  onClickAdd() {
    this.modalService.openModalNewTask();
  }
}
