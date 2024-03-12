import { createAction, props } from '@ngrx/store';
import { Task } from '../states/task-list.state';

export const loadTaskList = createAction('[Task List] Load Task List');
export const loadTaskListSuccess = createAction(
  '[Task List] Load Task List Sucess',
  props<{ entities: Task[] }>()
);
export const loadTaskListError = createAction(
  '[Task List] Load Task List Error'
);

export const appendTask = createAction(
  '[Task List] Append Task',
  props<{ entity: Task }>()
);

export const complete = createAction('[Task List] Complete');
