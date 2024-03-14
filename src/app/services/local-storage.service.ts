import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Task } from '../ngrx/states/task.state';

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
    return of(this.getItemTasks()).pipe(delay(1000));
  }

  appendTask(task: Task) {
    const tasks = this.getItemTasks();
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
