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
  on(loadTaskList, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(loadTaskListSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    isLoading: false,
  })),
  on(loadTaskListError, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(appendTask, (state, { task }) => {
    return {
      ...state,
      tasks: [...state.tasks, task],
    };
  })
);
