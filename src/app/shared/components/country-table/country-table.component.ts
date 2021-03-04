import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Country } from 'src/app/world-state/models/world.model';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryTableComponent {
  @Input() country: Country;
  constructor() { }
}
