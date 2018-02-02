import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Store } from '@ngrx/store';

import { Thermostat } from '../thermostat';
import { RemoveThermostat } from '../store/thermostats.actions';

@Component({
  selector: 'app-thermostat',
  templateUrl: './thermostat.component.html',
  styleUrls: ['./thermostat.component.sass'],
  animations: [
    trigger('visualState', [
      state('new', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          opacity: 0,
          transform: 'translateY(100px)'
        }))
      ])
    ])
  ]
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
