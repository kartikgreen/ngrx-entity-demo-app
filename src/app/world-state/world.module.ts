import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { WorldInfoComponent } from './components/world-info/world-info.component';
import { WorldEffects } from './effects/world.effects';
import { reducers } from './reducers';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forFeature([
      WorldEffects
    ])
  ],
  declarations: [WorldInfoComponent],
  exports: [WorldInfoComponent]
})
export class WorldModule {
  constructor(@Optional() @SkipSelf() parentModule: WorldModule) {
    if (parentModule) {
      throw new Error('WorldModule is already loaded. Import it in the AppModule only');
    }
  }
  public static forRoot(): ModuleWithProviders<WorldModule> {
    return {
      ngModule: WorldModule,
      providers: []
    };
  }
}
