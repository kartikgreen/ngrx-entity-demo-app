import { createReducer, on } from "@ngrx/store";;
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { Region, Country } from "../models/world.model";
import { WorldActions } from "../actions/world-action-types"


export interface RegionState extends EntityState<Region> {
  selectedRegion: Region,
  isRegionChanged: boolean
}
export interface AsianCountryState extends EntityState<Country> {
  areAsianCountriesLoaded: boolean
}
export interface EuropeanCountryState extends EntityState<Country> {
  areEuropeanCountriesLoaded: boolean
}
export interface Worldstate {
  regions: RegionState,
  asianCountries: AsianCountryState,
  europeanCountries: EuropeanCountryState,
  selectedCountry: Country
}

const regionAdapter = createEntityAdapter<Region>();
const asianCountryAdapter = createEntityAdapter<Country>({
  selectId: (model: Country) => model.alpha2Code,
});
const europeanCountryAdapter = createEntityAdapter<Country>({
  selectId: (model: Country) => model.alpha2Code,
});
const regionInitialState: RegionState = regionAdapter.getInitialState({
  selectedRegion: null,
  isRegionChanged: false,
});
const asianCountryInitialState: AsianCountryState = asianCountryAdapter.getInitialState({
  areAsianCountriesLoaded: false
});
const europeanCountryInitialState: EuropeanCountryState = europeanCountryAdapter.getInitialState({
  areEuropeanCountriesLoaded: false
});
const initialState = {
  regions: regionAdapter.setAll( 
    [ 
      { id: 0, name: "Asia" }, 
      { id: 1, name: "Europe" } 
    ], 
    regionInitialState
  ),
  asianCountries: asianCountryInitialState,
  europeanCountries: europeanCountryInitialState,
  selectedCountry: null
}

export const worldReducer = createReducer<Worldstate> (
  initialState,
  on(
    WorldActions.regionSelected,
    (state, action): Worldstate => {
      return {
        ...state,
        regions: {
          ...state.regions,
          selectedRegion: action.selectedRegion,
          isRegionChanged: true
        }
      };
    }
  ),
  on(
    WorldActions.allAsianCountriesLoaded,
    (state, action): Worldstate => {
      return {
        ...state,
        asianCountries: asianCountryAdapter.setAll(action.countries, { 
          ...state.asianCountries,
          areAsianCountriesLoaded: true
        })
      };
    }
  ),
  on(
    WorldActions.allEuropeanCountriesLoaded,
    (state, action): Worldstate => {
      return {
        ...state,
        europeanCountries: europeanCountryAdapter.setAll(action.countries, { 
          ...state.europeanCountries,
          areEuropeanCountriesLoaded: true
        })
      };
    }
  ),
  on(
    WorldActions.countrySelected,
    (state, action): Worldstate => {
      return {
        ...state,
        selectedCountry: action.selectedCountry
      };
    }
  ),
);

export const { selectAll: selectAllregions } = regionAdapter.getSelectors();
export const { selectAll: selectAllAsianCountries } = asianCountryAdapter.getSelectors();
export const { selectAll: selectAllEuropeanCountries } = europeanCountryAdapter.getSelectors();