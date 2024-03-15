import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TaskActions from '../ngrx/actions/task.actions';
import { Observable, Subject } from 'rxjs';
import { Task } from '../ngrx/states/task.state';
import * as TaskSelectors from '../ngrx/selectors/task.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _tasks$: Observable<Task[]>;
  private _isLoading$: Observable<boolean>;

  constructor(private store: Store) {
    this._tasks$ = this.store.select(TaskSelectors.taskListSelector);
    this._isLoading$ = this.store.select(TaskSelectors.isLoadingSelector);
  }

  get tasks$() {
    return this._tasks$;
  }

  get isLoading$() {
    return this._isLoading$;
  }

  loadTasks() {
    this.store.dispatch(TaskActions.loadTaskList());
  }

  saveTask(task: Task) {
    this.store.dispatch(TaskActions.appendTask({ task }));
  }

  editTask(task: Task) {
    this.store.dispatch(TaskActions.editTask({ task }));
  }

  markTask(task: Task, completed: boolean) {
    this.store.dispatch(TaskActions.markTask({ id: task.id, completed }));
  }

  deleteTask(task: Task) {
    this.store.dispatch(TaskActions.removeTask({ id: task.id }));
  }
}
