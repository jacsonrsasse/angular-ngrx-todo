import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadTaskList } from '../actions/task-list.actions';
import { Observable, of } from 'rxjs';
import { Task } from '../states/task-list.state';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private readonly store: Store) {}

  listAll$(): Observable<Task[]> {
    this.store.dispatch(loadTaskList());

    const tasks = localStorage.getItem('tasks');

    return of(
      tasks
        ? JSON.parse(tasks)
        : [
            {
              id: 1,
              title: 'teste',
            },
          ]
    );
  }
}
