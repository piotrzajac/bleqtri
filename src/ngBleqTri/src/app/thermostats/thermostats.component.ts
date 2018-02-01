import { Component, OnInit, NgZone } from '@angular/core';
import { Thermostat } from '../thermostat';
import { ThermostatDiscoveryService } from '../thermostatDiscoveryService/thermostat-discovery.service';

@Component({
  selector: 'app-thermostats',
  templateUrl: './thermostats.component.html',
  styleUrls: ['./thermostats.component.sass'],
  providers: [ ThermostatDiscoveryService ]
})
export class ThermostatsComponent implements OnInit {
  thermostats: Thermostat[] = [];
  constructor(
    private zone: NgZone,
    private thermostatDiscoveryService: ThermostatDiscoveryService
  ) { }

  ngOnInit() {
  }

  addThermostat() {
    this.thermostatDiscoveryService.getThermostat().subscribe(this.showThermostat.bind(this));
  }

  showThermostat(value: Thermostat) {
    // force change detection
    this.zone.run( () =>  {
      if (!this.thermostats.find(t => t.id === value.id)) {
        this.thermostats.push(value);
      }
    });
  }
}
