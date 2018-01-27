import { Component, OnInit, NgZone } from '@angular/core';
import { ThermostatDiscoveryService } from '../thermostatDiscoveryService/thermostat-discovery.service';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

@Component({
  selector: 'app-thermostat',
  templateUrl: './thermostat.component.html',
  styleUrls: ['./thermostat.component.sass'],
  providers: [ ThermostatDiscoveryService ]
})
export class ThermostatComponent implements OnInit {

  thermostatName = '--';
  device: any = {};

  constructor(
    private zone: NgZone,
    private thermostatDiscoveryService: ThermostatDiscoveryService
  ) { }

  ngOnInit() {
    this.getDeviceStatus();
    this.streamValues();
  }

  streamValues() {
    this.thermostatDiscoveryService.streamValues().subscribe(this.showThermostatName.bind(this));
  }

  getDeviceStatus() {
    this.thermostatDiscoveryService.getDevice().subscribe(
      (device) => {

        if (device) {
          this.device = device;
        } else {
          // device not connected or disconnected
          this.device = null;
          this.thermostatName = '--';
        }
      }
    );
  }

  getFakeValue() {
    this.thermostatDiscoveryService.getFakeValue();
  }

  getThermostatName() {
    return this.thermostatDiscoveryService.getThermostatName().subscribe(this.showThermostatName.bind(this));
  }

  showThermostatName(value: number) {
    // force change detection
    this.zone.run( () =>  {
      console.log('Reading thermostat name %s', value);
      this.thermostatName = '' + value;
    });
  }
}
