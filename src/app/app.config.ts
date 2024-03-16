import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { taskReducer } from './ngrx/reducer/task.reducer';
import { provideEffects } from '@ngrx/effects';
import { TaskEffects } from './ngrx/effects/task.effects';

import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
      tasks: taskReducer,
    }),
    provideEffects([TaskEffects]),
    provideAnimations(),
  ],
};
