import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Thermostat } from '../thermostat';
import { ThermostatDiscoveryService } from '../thermostatDiscoveryService/thermostat-discovery.service';
import { AddThermostat } from '../store/thermostats.actions';

@Component({
  selector: 'app-thermostats',
  templateUrl: './thermostats.component.html',
  styleUrls: ['./thermostats.component.sass'],
  providers: [ ThermostatDiscoveryService ],
  animations: [
    trigger('visualState', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100px)'
        }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({
          opacity: 0,
          transform: 'translateY(100px)'
        }))
      ])
    ])]
})
export class ThermostatsComponent implements OnInit {
  state: Observable<{thermostats: Thermostat[]}>;
  constructor(
    private thermostatDiscoveryService: ThermostatDiscoveryService,
    private store: Store<{thermostats: {thermostats: Thermostat[]}}>
  ) { }

  ngOnInit() {
    this.state = this.store.select('thermostats');
  }

  addThermostat() {
    this.thermostatDiscoveryService
      .getThermostat()
      .subscribe(thermostat => this.store.dispatch(new AddThermostat(thermostat)));
  }
}
