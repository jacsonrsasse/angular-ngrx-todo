import { createAction, props } from '@ngrx/store';
import { Task } from '../states/task.state';

export const loadTaskList = createAction('[Task] Load Task List');
export const loadTaskListSuccess = createAction(
  '[Task] Load Task List Sucess',
  props<{ tasks: Task[] }>()
);
export const loadTaskListError = createAction('[Task] Load Task List Error');

export const appendTask = createAction(
  '[Task] Append Task',
  props<{ task: Task }>()
);

export const complete = createAction('[Task] Complete');
