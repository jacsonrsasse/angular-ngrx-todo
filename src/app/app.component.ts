import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { LocalStorageService } from './services/local-storage.service';
import { Store, select } from '@ngrx/store';
import {
  loadTaskList,
  loadTaskListSuccess,
} from './ngrx/actions/task-list.actions';
import { getTaskList } from './ngrx/selectors/task-list.selectors';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';

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
    private readonly localStorageService: LocalStorageService
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
  }

  onClickAdd() {}
}
