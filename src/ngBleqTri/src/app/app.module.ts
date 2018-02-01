import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';

import { AppComponent } from './app.component';
import { ThermostatComponent } from './thermostat/thermostat.component';
import { ThermostatsComponent } from './thermostats/thermostats.component';


@NgModule({
  declarations: [
    AppComponent,
    ThermostatComponent,
    ThermostatsComponent
  ],
  imports: [
    BrowserModule,
    WebBluetoothModule.forRoot({
      enableTracing: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
