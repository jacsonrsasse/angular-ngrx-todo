import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskListActions from '../actions/task-list.actions';
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
          map((tasks) =>
            TaskListActions.loadTaskListSuccess({ entities: tasks })
          ),
          catchError(() => of(TaskListActions.loadTaskListError()))
        )
      )
    )
  );

  appendTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskListActions.appendTask),
      mergeMap(({ entity }) =>
        of(this.localStorageService.appendTask(entity)).pipe(
          map(() => TaskListActions.complete())
        )
      )
    )
  );
}
