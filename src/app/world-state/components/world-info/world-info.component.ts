import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { WorldActions } from "../../actions/world-action-types";
import { Country, Region } from "../../models/world.model";
import { AppState } from '../../reducers';
import {
  areAsianCountriesLoaded,
  areEuropeanCountriesLoaded, selectAsianCountries,
  selectedCountry, selectEuropeanCountries, selectIsRegionChanged, selectRegions,
  selectSelectedRegion
} from "../../selectors/world.selectors";

@Component({
  selector: 'app-world-info',
  templateUrl: './world-info.component.html',
  styleUrls: ['./world-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorldInfoComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  regions$: Observable<Region[]> = this.store.pipe(select(selectRegions));
  countries$: Observable<Array<Country>>;
  selectedCountry$: Observable<Country> = this.store.pipe(select(selectedCountry));
  isRegionChanged$: Observable<boolean> = this.store.pipe(select(selectIsRegionChanged));
  constructor(
    private readonly store: Store<AppState>
  ) { }
  ngOnInit() {
    this.getCountries();
  }
  getCountries() {
    this.store.pipe(select(selectSelectedRegion), takeUntil(this.destroy$)).subscribe(region => {
      if (region?.name === 'Asia') {
        this.countries$ = this.store.pipe(select(selectAsianCountries));
        return;
      }
      this.countries$ = this.store.pipe(select(selectEuropeanCountries));
    });
  }
  onRegionChange(event: Region): void {
    this.dispatchRegionSelectedAction(event);
    this.dispatchLoadCountriesAction(event);
  }
  dispatchLoadCountriesAction(region: Region): void {
    this.store.pipe(select(areAsianCountriesLoaded), takeUntil(this.destroy$)).subscribe(isLoaded => {
      if (!isLoaded && region.name === 'Asia') {
        this.store.dispatch(WorldActions.loadAsianCountries({ selectedRegion: region }));
        return;
      }
    });
    this.store.pipe(select(areEuropeanCountriesLoaded), takeUntil(this.destroy$)).subscribe(isLoaded => {
      if (!isLoaded && region.name === 'Europe') {
        this.store.dispatch(WorldActions.loadEuropeanCountries({ selectedRegion: region }));
        return;
      }
    });
  }
  dispatchRegionSelectedAction(region: Region): void {
    this.store.dispatch(WorldActions.regionSelected({ selectedRegion: region }));
  }
  onCountryChange(event: Country): void {
    this.store.dispatch(WorldActions.countrySelected({ selectedCountry: event }));
  }
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
