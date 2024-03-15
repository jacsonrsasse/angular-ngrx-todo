import { createReducer, on } from '@ngrx/store';
import { TaskState } from '../states/task.state';
import * as taskActions from '../actions/task.actions';

export const initialState: TaskState = {
  tasks: [],
  isLoading: false,
};

export const taskReducer = createReducer(
  initialState,
  on(taskActions.loadTaskList, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(taskActions.loadTaskListSuccess, (state, { tasks }) => {
    return {
      ...state,
      tasks,
      isLoading: false,
    };
  }),
  on(taskActions.loadTaskListError, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(taskActions.appendTask, (state, { task }) => {
    return {
      ...state,
      tasks: [...state.tasks, task],
    };
  }),
  on(taskActions.editTask, (state, { task }) => {
    const tasks = state.tasks.map((t) => (t.id === task.id ? task : t));
    return {
      ...state,
      tasks,
    };
  }),
  on(taskActions.markTask, (state, { id, completed }) => {
    const tasks = state.tasks.map((task) =>
      task.id === id ? { ...task, completed } : task
    );
    return {
      ...state,
      tasks,
    };
  }),
  on(taskActions.removeTask, (state, { id }) => {
    const tasks = state.tasks.filter((task) => task.id !== id);
    return {
      ...state,
      tasks,
    };
  })
);
