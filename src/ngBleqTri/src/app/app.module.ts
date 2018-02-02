import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ThermostatComponent } from './thermostat/thermostat.component';
import { ThermostatsComponent } from './thermostats/thermostats.component';
import thermostatsReducer from './store/thermostats.reducers';


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
    WebBluetoothModule.forRoot({enableTracing: !environment.production}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
