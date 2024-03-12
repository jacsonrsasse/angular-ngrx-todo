import { createReducer, on } from '@ngrx/store';
import { TaskListState } from '../states/task-list.state';
import {
  appendTask,
  loadTaskList,
  loadTaskListError,
  loadTaskListSuccess,
} from '../actions/task-list.actions';

export const initialState: TaskListState = {
  entities: [],
  isLoading: false,
};

export const taskListReducer = createReducer(
  initialState,
  on(loadTaskList, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(loadTaskListSuccess, (state, { entities }) => ({
    ...state,
    entities,
    isLoading: false,
  })),
  on(loadTaskListError, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(appendTask, (state, { entity }) => ({
    ...state,
    entities: [...state.entities, entity],
  }))
);
