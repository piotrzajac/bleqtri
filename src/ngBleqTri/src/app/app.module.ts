import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    BrowserAnimationsModule,
    WebBluetoothModule.forRoot({
      enableTracing: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
