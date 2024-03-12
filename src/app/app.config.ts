import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { taskListReducer } from './ngrx/reducer/task-list.reducer';
import { provideEffects } from '@ngrx/effects';
import { TaskEffects } from './ngrx/effects/task.effects';

console.log('1');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      taskList: taskListReducer,
    }),
    provideEffects([TaskEffects]),
  ],
};
