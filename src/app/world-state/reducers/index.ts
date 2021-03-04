import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import * as worldReducer from './world.reducer';

export interface AppState {
  world: worldReducer.Worldstate;
}

export const reducers: ActionReducerMap<AppState> = {  
  world: worldReducer.worldReducer,
};