import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskListActions from '../actions/task.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService
  ) {}

  loadTaskList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskListActions.loadTaskList),
      mergeMap(() =>
        this.localStorageService.listAll$().pipe(
          map((tasks) => TaskListActions.loadTaskListSuccess({ tasks })),
          catchError(() => of(TaskListActions.loadTaskListError()))
        )
      )
    )
  );

  appendTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskListActions.appendTask),
      mergeMap(({ task }) =>
        of(this.localStorageService.appendTask(task)).pipe(
          map(() => TaskListActions.complete())
        )
      )
    )
  );

  editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskListActions.editTask),
      mergeMap(({ task }) =>
        of(this.localStorageService.editTask(task)).pipe(
          map(() => TaskListActions.complete())
        )
      )
    )
  );

  removeTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskListActions.removeTask),
      mergeMap(({ id }) =>
        of(this.localStorageService.removeTask(id)).pipe(
          map(() => TaskListActions.complete())
        )
      )
    )
  );
}
