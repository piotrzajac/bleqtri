import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ThermostatComponent } from './thermostat/thermostat.component';
import { ThermostatsComponent } from './thermostats/thermostats.component';
import thermostatsReducer from './store/thermostats.reducers';
import { ThermostatsEffects } from './store/thermostats.effects';
import { ThermostatDiscoveryService } from './thermostatDiscoveryService/thermostat-discovery.service';

@NgModule({
  declarations: [
    AppComponent,
    ThermostatComponent,
    ThermostatsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({'thermostats': thermostatsReducer}),
    EffectsModule.forRoot([ThermostatsEffects]),
    WebBluetoothModule.forRoot({enableTracing: !environment.production}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [ThermostatDiscoveryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
