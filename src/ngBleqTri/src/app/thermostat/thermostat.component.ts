import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Thermostat } from '../thermostat';
import { RemoveThermostat } from '../store/thermostats.actions';

@Component({
  selector: 'app-thermostat',
  templateUrl: './thermostat.component.html',
  styleUrls: ['./thermostat.component.sass'],
})
export class ThermostatComponent implements OnInit {
  @Input() public thermostat: Thermostat;

  constructor(private store: Store<{thermostats: {thermostats: Thermostat[]}}>) { }

  ngOnInit() {
  }

  removeThermostat() {
    this.store.dispatch(new RemoveThermostat(this.thermostat));
  }
}
