import { createReducer, on } from '@ngrx/store';
import { TaskState } from '../states/task.state';
import {
  appendTask,
  loadTaskList,
  loadTaskListError,
  loadTaskListSuccess,
} from '../actions/task.actions';

export const initialState: TaskState = {
  tasks: [],
  isLoading: false,
};

export const taskReducer = createReducer(
  initialState,
  on(loadTaskList, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadTaskListSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    isLoading: false,
  })),
  on(loadTaskListError, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(appendTask, (state, { task }) => ({
    ...state,
    entities: [...state.tasks, task],
  }))
);
