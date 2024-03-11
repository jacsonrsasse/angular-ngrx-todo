import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { LocalStorageService } from './services/local-storage.service';
import { Store, select } from '@ngrx/store';
import {
  loadTaskList,
  loadTaskListSuccess,
} from './ngrx/actions/task-list.actions';
import { getTaskList } from './ngrx/selectors/task-list.selectors';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { Task } from './ngrx/states/task-list.state';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TaskListComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly localStorageService: LocalStorageService,
    private readonly modalService: ModalService
  ) {}

  tasks$ = this.store.pipe(select(getTaskList));

  ngOnInit(): void {
    this.store.dispatch(loadTaskList());
    this.setUpObservers();
  }

  private setUpObservers() {
    this.localStorageService.listAll$().subscribe((tasks) => {
      this.store.dispatch(loadTaskListSuccess({ entities: tasks }));
    });
    this.modalService.task$.subscribe((task) => {
      console.log(task);
    });
  }

  saveTask(task: Pick<Task, 'title' | 'description'>) {}

  onClickAdd() {
    this.modalService.openModalNewTask();
  }
}
