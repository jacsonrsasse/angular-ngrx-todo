import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from '../states/task.state';

// O nome dado aqui precisa ser o mesmo que está no app.config
const taskState = createFeatureSelector<TaskState>('tasks');

export const taskListSelector = createSelector(
  taskState,
  (state: TaskState) => state.tasks
);

export const isLoadingSelector = createSelector(
  taskState,
  (state: TaskState) => state.isLoading
);
