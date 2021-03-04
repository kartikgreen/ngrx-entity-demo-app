import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { WorldActions } from '../actions/world-action-types';
import { WorldRepositoryService } from '../services/world-repository.service';




@Injectable()
export class WorldEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly worldRepositoryService: WorldRepositoryService
  ) { }

  loadAsianCountries$ = createEffect(
    () => {
      return this.actions$
        .pipe(
          ofType(WorldActions.loadAsianCountries),
          concatMap((action) => this.worldRepositoryService.getAsianCountries()
            .pipe(
              map(countries => WorldActions.allAsianCountriesLoaded({ countries })),
              catchError(error => of(WorldActions.loadAsianCountriesFailed({ error })))
            )
          )
        )
    }
  );
  loadEuropeanCountries$ = createEffect(
    () => {
      return this.actions$
        .pipe(
          ofType(WorldActions.loadEuropeanCountries),
          concatMap((action) => this.worldRepositoryService.getEuropeanCountries()
            .pipe(
              map(countries => WorldActions.allEuropeanCountriesLoaded({ countries })),
              catchError(error => of(WorldActions.loadEuropeanCountriesFailed({ error })))
            )
          )
        )
    }
  );
}
