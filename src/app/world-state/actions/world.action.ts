import { createAction, props } from '@ngrx/store';
import { Country, Region } from '../models/world.model';

export const regionSelected = createAction(
  '[Region Dropdown] Region Changed',
  props<{ selectedRegion: Region }>()
);

export const countrySelected = createAction(
  '[Country Dropdown] Country Changed',
  props<{ selectedCountry: Country }>()
);

export const loadAsianCountries = createAction(
  '[Region Dropdown changed to Asia] Load Asian countries',
  props<{ selectedRegion: Region }>()
);

export const loadEuropeanCountries = createAction(
  '[Region Dropdown changed to Europe] Load Eurpean countries',
  props<{ selectedRegion: Region }>()
);

export const allAsianCountriesLoaded = createAction(
  '[Load Asian countries effect] All Asian Countries Loaded',
  props<{ countries: Country[] }>()
);

export const allEuropeanCountriesLoaded = createAction(
  '[Load European countries effect] All European Countries Loaded',
  props<{ countries: Country[] }>()
);

export const loadAsianCountriesFailed = createAction(
  '[Load Asian countries effect] Load Asian Countries Failed',
  props<{ error: string }>()
);

export const loadEuropeanCountriesFailed = createAction(
  '[Load European countries effect] Load European Countries Failed',
  props<{ error: string }>()
);