import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../ngrx/states/task-list.state';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  private getItemTasks(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  listAll$(): Observable<Task[]> {
    return of(this.getItemTasks());
  }

  appendTask(task: Task) {
    const tasks = this.getItemTasks();
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
