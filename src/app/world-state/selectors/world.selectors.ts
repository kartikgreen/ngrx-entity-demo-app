import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromWorld from '../reducers/world.reducer';


const worldState = createFeatureSelector<fromWorld.Worldstate>('world');

export const selectRegionState = createSelector(
  worldState,
  (state: fromWorld.Worldstate) => state.regions
);
export const selectRegions = createSelector(
  selectRegionState, fromWorld.selectAllregions
);
export const selectIsRegionChanged = createSelector(
  selectRegionState, (state: fromWorld.RegionState) => state.isRegionChanged
);
export const selectSelectedRegion = createSelector(
  selectRegionState, (state: fromWorld.RegionState) => state.selectedRegion
);
export const selectAsianCountriesState = createSelector(
  worldState, (state: fromWorld.Worldstate) => state.asianCountries
);
export const selectAsianCountries = createSelector(
  selectAsianCountriesState, fromWorld.selectAllAsianCountries
);
export const selectEuropeanCountriesState = createSelector(
  worldState, (state: fromWorld.Worldstate) => state.europeanCountries
);
export const selectEuropeanCountries = createSelector(
  selectEuropeanCountriesState, fromWorld.selectAllEuropeanCountries
);
export const selectedCountry = createSelector(
  worldState,
  (state: fromWorld.Worldstate) => state.selectedCountry
);
export const areAsianCountriesLoaded = createSelector(
  selectAsianCountriesState,
  (state: fromWorld.AsianCountryState): boolean => state.areAsianCountriesLoaded
)
export const areEuropeanCountriesLoaded = createSelector(
  selectEuropeanCountriesState,
  (state: fromWorld.EuropeanCountryState): boolean => state.areEuropeanCountriesLoaded
)