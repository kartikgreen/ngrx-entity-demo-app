import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import { CountryTableComponent } from './components/country-table/country-table.component';


@NgModule({
  declarations: [
    CustomDropdownComponent,
    CountryTableComponent
  ],
  exports: [
    CustomDropdownComponent,
    CountryTableComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule, 
    ReactiveFormsModule 
  ]
})
export class SharedModule { }
