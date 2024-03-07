import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskListState } from '../states/task-list.state';

const taskListState = createFeatureSelector<TaskListState>('taskList');

export const getTaskList = createSelector(
  taskListState,
  (state: TaskListState) => state.entities
);

export const getIsLoading = createSelector(
  taskListState,
  (state: TaskListState) => state.isLoading
);
